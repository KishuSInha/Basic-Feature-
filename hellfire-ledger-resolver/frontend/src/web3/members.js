import { getAddress, isAddress } from 'ethers';

const env = import.meta.env || {};

function getEnvValue(key, fallback = '') {
  const raw = env[key];
  return typeof raw === 'string' && raw.trim().length > 0 ? raw.trim() : fallback;
}

function normalizeAddress(address) {
  if (!address || !isAddress(address)) return '';
  return getAddress(address);
}

const adminWallet = normalizeAddress(
  getEnvValue('VITE_WALLET_ADMIN', getEnvValue('VITE_OWNER_ADDRESS', ''))
);
const agentWallet = normalizeAddress(getEnvValue('VITE_WALLET_AGENT', ''));

export const MEMBER_PROFILES = [
  {
    id: 'admin',
    title: 'Administrator',
    name: 'Agent Munson',
    clearance: 'Level 9 — Overwatch',
    walletAddress: adminWallet,
  },
  {
    id: 'agent',
    title: 'Standard Agent',
    name: 'Agent Wheeler',
    clearance: 'Level 5 — Operations',
    walletAddress: agentWallet,
  },
];

export const MEMBER_WALLET_ISSUES = (() => {
  const issues = [];
  const mapped = MEMBER_PROFILES.filter((m) => m.walletAddress);

  if (mapped.length < MEMBER_PROFILES.length) {
    const missingNames = MEMBER_PROFILES.filter((m) => !m.walletAddress).map((m) => m.name);
    issues.push(`Missing wallet address for: ${missingNames.join(', ')}`);
  }

  const walletCounts = mapped.reduce((acc, member) => {
    acc[member.walletAddress] = (acc[member.walletAddress] || 0) + 1;
    return acc;
  }, {});

  const duplicateWallets = Object.entries(walletCounts)
    .filter(([, count]) => count > 1)
    .map(([address]) => address);

  if (duplicateWallets.length > 0) {
    issues.push('Some members share the same wallet. Assign unique wallets in root .env.');
  }

  return issues;
})();

export const ARE_MEMBER_WALLETS_UNIQUE = MEMBER_WALLET_ISSUES.length === 0;

export function findMemberById(id) {
  return MEMBER_PROFILES.find((m) => m.id === id) || null;
}

export function findMemberByAddress(address) {
  const normalized = normalizeAddress(address);
  if (!normalized) return null;
  return MEMBER_PROFILES.find((m) => m.walletAddress && m.walletAddress === normalized) || null;
}
