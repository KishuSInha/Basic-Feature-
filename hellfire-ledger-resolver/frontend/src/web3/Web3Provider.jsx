import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { BrowserProvider, Contract, formatEther, formatUnits, isAddress, parseUnits } from 'ethers';
import { HELLFIRE_ABI, HELLFIRE_DEPLOYMENT, TARGET_CHAIN_ID, TARGET_NETWORK_NAME } from './hellfireContract';
import { ARE_MEMBER_WALLETS_UNIQUE, findMemberByAddress, MEMBER_PROFILES, MEMBER_WALLET_ISSUES } from './members';

const Web3Context = createContext(null);

function shortMessage(error) {
  if (!error) return 'Unknown error';
  if (typeof error === 'string') return error;
  return error.reason || error.shortMessage || error.message || 'Unknown error';
}

function toDisplayNumber(value, fractionDigits = 4) {
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) return '0';
  return parsed.toLocaleString(undefined, { maximumFractionDigits: fractionDigits });
}

export function Web3Provider({ children }) {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [address, setAddress] = useState('');
  const [chainId, setChainId] = useState(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState('');
  const [ethBalance, setEthBalance] = useState('0');
  const [hfgBalance, setHfgBalance] = useState('0');
  const [tokenDecimals, setTokenDecimals] = useState(HELLFIRE_DEPLOYMENT.tokenDecimals);
  const [tokenSymbol, setTokenSymbol] = useState(HELLFIRE_DEPLOYMENT.tokenSymbol);
  const [isOwner, setIsOwner] = useState(false);
  const [lastTxHash, setLastTxHash] = useState('');

  const hasProvider = typeof window !== 'undefined' && typeof window.ethereum !== 'undefined';
  const isConnected = !!address;
  const isSepolia = chainId === TARGET_CHAIN_ID;

  const getReadContract = useCallback(
    (activeProvider) => new Contract(HELLFIRE_DEPLOYMENT.contractAddress, HELLFIRE_ABI, activeProvider),
    []
  );

  const getWriteContract = useCallback(() => {
    if (!signer) {
      throw new Error('Wallet is not connected.');
    }
    return new Contract(HELLFIRE_DEPLOYMENT.contractAddress, HELLFIRE_ABI, signer);
  }, [signer]);

  const refreshWalletState = useCallback(
    async (activeProvider, activeAddress) => {
      if (!activeProvider || !activeAddress) return;

      const [network, walletEth, readContract] = await Promise.all([
        activeProvider.getNetwork(),
        activeProvider.getBalance(activeAddress),
        Promise.resolve(getReadContract(activeProvider)),
      ]);

      const chainAsNumber = Number(network.chainId);
      setChainId(chainAsNumber);

      const [decimals, symbol, ownerAddress, tokenRawBalance] = await Promise.all([
        readContract.decimals(),
        readContract.symbol(),
        readContract.owner(),
        readContract.balanceOf(activeAddress),
      ]);

      const decimalsNumber = Number(decimals);
      setTokenDecimals(decimalsNumber);
      setTokenSymbol(symbol);
      setEthBalance(toDisplayNumber(formatEther(walletEth), 5));
      setHfgBalance(toDisplayNumber(formatUnits(tokenRawBalance, decimalsNumber), 4));
      setIsOwner(ownerAddress.toLowerCase() === activeAddress.toLowerCase());

      if (chainAsNumber !== TARGET_CHAIN_ID) {
        setError(`Wrong network selected. Switch your wallet to ${TARGET_NETWORK_NAME}.`);
      } else {
        setError('');
      }
    },
    [getReadContract]
  );

  const connectWallet = useCallback(async () => {
    if (!hasProvider) {
      setError('No wallet found. Install MetaMask or another EIP-1193 wallet.');
      return;
    }

    setIsConnecting(true);
    setError('');

    try {
      const nextProvider = new BrowserProvider(window.ethereum, 'any');
      await nextProvider.send('eth_requestAccounts', []);
      const nextSigner = await nextProvider.getSigner();
      const nextAddress = await nextSigner.getAddress();

      setProvider(nextProvider);
      setSigner(nextSigner);
      setAddress(nextAddress);
      await refreshWalletState(nextProvider, nextAddress);
    } catch (err) {
      setError(shortMessage(err));
    } finally {
      setIsConnecting(false);
    }
  }, [hasProvider, refreshWalletState]);

  const refresh = useCallback(async () => {
    if (!provider || !address) return;
    try {
      await refreshWalletState(provider, address);
    } catch (err) {
      setError(shortMessage(err));
    }
  }, [provider, address, refreshWalletState]);

  const mintTokens = useCallback(
    async (to, amount) => {
      if (!isAddress(to)) throw new Error('Recipient address is invalid.');
      if (!amount || Number(amount) <= 0) throw new Error('Amount must be greater than zero.');
      if (!isSepolia) throw new Error(`Switch to ${TARGET_NETWORK_NAME} before minting.`);

      const contract = getWriteContract();
      const parsedAmount = parseUnits(String(amount), tokenDecimals);
      const tx = await contract.mint(to, parsedAmount);
      await tx.wait();
      setLastTxHash(tx.hash);
      await refresh();
      return tx.hash;
    },
    [getWriteContract, tokenDecimals, refresh, isSepolia]
  );

  const transferTokens = useCallback(
    async (to, amount) => {
      if (!isAddress(to)) throw new Error('Recipient address is invalid.');
      if (!amount || Number(amount) <= 0) throw new Error('Amount must be greater than zero.');
      if (!isSepolia) throw new Error(`Switch to ${TARGET_NETWORK_NAME} before sending tokens.`);

      const contract = getWriteContract();
      const parsedAmount = parseUnits(String(amount), tokenDecimals);
      const tx = await contract.transfer(to, parsedAmount);
      await tx.wait();
      setLastTxHash(tx.hash);
      await refresh();
      return tx.hash;
    },
    [getWriteContract, tokenDecimals, refresh, isSepolia]
  );

  useEffect(() => {
    if (!hasProvider) return;

    const wallet = window.ethereum;
    const handleAccountsChanged = async (accounts) => {
      if (!accounts || accounts.length === 0) {
        setAddress('');
        setSigner(null);
        setEthBalance('0');
        setHfgBalance('0');
        setIsOwner(false);
        return;
      }

      if (!provider) return;
      const nextSigner = await provider.getSigner();
      setSigner(nextSigner);
      setAddress(accounts[0]);
      await refreshWalletState(provider, accounts[0]);
    };

    const handleChainChanged = async () => {
      if (!provider || !address) return;
      await refreshWalletState(provider, address);
    };

    wallet.on('accountsChanged', handleAccountsChanged);
    wallet.on('chainChanged', handleChainChanged);

    return () => {
      wallet.removeListener('accountsChanged', handleAccountsChanged);
      wallet.removeListener('chainChanged', handleChainChanged);
    };
  }, [hasProvider, provider, address, refreshWalletState]);

  useEffect(() => {
    if (!hasProvider) return;

    const bootstrap = async () => {
      try {
        const nextProvider = new BrowserProvider(window.ethereum, 'any');
        const accounts = await nextProvider.send('eth_accounts', []);
        if (!accounts || accounts.length === 0) return;

        const nextSigner = await nextProvider.getSigner();
        setProvider(nextProvider);
        setSigner(nextSigner);
        setAddress(accounts[0]);
        await refreshWalletState(nextProvider, accounts[0]);
      } catch (err) {
        setError(shortMessage(err));
      }
    };

    bootstrap();
  }, [hasProvider, refreshWalletState]);

  const value = useMemo(
    () => ({
      hasProvider,
      connectWallet,
      refresh,
      isConnecting,
      isConnected,
      address,
      chainId,
      isSepolia,
      networkName: TARGET_NETWORK_NAME,
      targetChainId: TARGET_CHAIN_ID,
      members: MEMBER_PROFILES,
      memberWalletIssues: MEMBER_WALLET_ISSUES,
      areMemberWalletsUnique: ARE_MEMBER_WALLETS_UNIQUE,
      activeMember: findMemberByAddress(address),
      ethBalance,
      hfgBalance,
      tokenSymbol,
      tokenDecimals,
      isOwner,
      mintTokens,
      transferTokens,
      error,
      lastTxHash,
      contractAddress: HELLFIRE_DEPLOYMENT.contractAddress,
    }),
    [
      hasProvider,
      connectWallet,
      refresh,
      isConnecting,
      isConnected,
      address,
      chainId,
      isSepolia,
      ethBalance,
      hfgBalance,
      tokenSymbol,
      tokenDecimals,
      isOwner,
      mintTokens,
      transferTokens,
      error,
      lastTxHash,
    ]
  );

  return <Web3Context.Provider value={value}>{children}</Web3Context.Provider>;
}

export function useWeb3() {
  const ctx = useContext(Web3Context);
  if (!ctx) {
    throw new Error('useWeb3 must be used inside Web3Provider.');
  }
  return ctx;
}
