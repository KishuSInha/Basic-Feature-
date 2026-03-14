import { network } from "hardhat";
import { writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function main() {
  console.log("==========================================");
  console.log("  HELLFIRE CLUB DEPLOYMENT SEQUENCE");
  console.log("==========================================");

  // Connect to the selected network and use viem helpers from the connection.
  const { viem } = await network.connect();

  // Get wallet client for deployment
  const [deployer] = await viem.getWalletClients();
  const deployerAddress = deployer.account.address;

  console.log("Deploying from wallet:", deployerAddress);

  // Check balance
  const publicClient = await viem.getPublicClient();
  const balance = await publicClient.getBalance({
    address: deployerAddress,
  });

  console.log("Wallet balance:", balance.toString(), "wei");

  if (balance === 0n) {
    console.error("ERROR: No ETH in wallet. Get Sepolia ETH from faucet!");
    process.exit(1);
  }

  console.log("\nDeploying HellfireGold contract...");

  // Deploy contract
  const hellfireGold = await viem.deployContract("HellfireGold", [
    deployerAddress,
  ]);

  console.log("\n==========================================");
  console.log("  DEPLOYMENT SUCCESSFUL!");
  console.log("==========================================");
  console.log("Contract address:", hellfireGold.address);
  console.log("Owner address:   ", deployerAddress);
  console.log(
    "Etherscan:       ",
    `https://sepolia.etherscan.io/address/${hellfireGold.address}`
  );
  console.log("==========================================\n");

  // Save deployment info for frontend
  const deploymentInfo = {
    contractAddress: hellfireGold.address,
    ownerAddress: deployerAddress,
    network: "sepolia",
    chainId: 11155111,
    deployedAt: new Date().toISOString(),
    tokenName: "Hellfire Gold",
    tokenSymbol: "HFG",
    tokenDecimals: 18,
  };

  writeFileSync(
    join(__dirname, "../deployment.json"),
    JSON.stringify(deploymentInfo, null, 2)
  );

  console.log("Deployment info saved to deployment.json");
}

main().catch((error) => {
  console.error("Deployment failed:", error);
  process.exit(1);
});