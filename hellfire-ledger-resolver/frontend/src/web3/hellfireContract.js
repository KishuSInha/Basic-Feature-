const DEFAULT_DEPLOYMENT = {
  contractAddress: "0x3b984c8e4105b4499d8312512ba0596aa22c2d7a",
  ownerAddress: "0xc0b1fec5b15d6f6b2681983655643ca23179ba29",
  chainId: 11155111,
  tokenName: "Hellfire Gold",
  tokenSymbol: "HFG",
  tokenDecimals: 18,
};

const env = import.meta.env || {};

const parsedChainId = Number(env.VITE_CHAIN_ID);
const parsedDecimals = Number(env.VITE_TOKEN_DECIMALS);

function envOrFallback(key, fallback) {
  const raw = env[key];
  return typeof raw === "string" && raw.trim().length > 0 ? raw.trim() : fallback;
}

export const TARGET_CHAIN_ID =
  Number.isInteger(parsedChainId) && parsedChainId > 0
    ? parsedChainId
    : DEFAULT_DEPLOYMENT.chainId;

export const TARGET_NETWORK_NAME = envOrFallback(
  "VITE_NETWORK_NAME",
  TARGET_CHAIN_ID === 11155111 ? "Sepolia" : "Target Network"
);

export const HELLFIRE_DEPLOYMENT = {
  contractAddress: envOrFallback("VITE_CONTRACT_ADDRESS", DEFAULT_DEPLOYMENT.contractAddress),
  ownerAddress: envOrFallback("VITE_OWNER_ADDRESS", DEFAULT_DEPLOYMENT.ownerAddress),
  chainId: TARGET_CHAIN_ID,
  tokenName: envOrFallback("VITE_TOKEN_NAME", DEFAULT_DEPLOYMENT.tokenName),
  tokenSymbol: envOrFallback("VITE_TOKEN_SYMBOL", DEFAULT_DEPLOYMENT.tokenSymbol),
  tokenDecimals:
    Number.isInteger(parsedDecimals) && parsedDecimals >= 0
      ? parsedDecimals
      : DEFAULT_DEPLOYMENT.tokenDecimals,
};

export const HELLFIRE_ABI = [
  "function balanceOf(address account) view returns (uint256)",
  "function decimals() view returns (uint8)",
  "function symbol() view returns (string)",
  "function owner() view returns (address)",
  "function mint(address to, uint256 amount)",
  "function transfer(address to, uint256 amount) returns (bool)",
];
