// ChronosVault Deployment Script
// Deploys the vault to any network configured in hardhat.config.ts

import hre from "hardhat";
import { parseEther } from "viem";

async function main() {

  // ── Get wallet accounts ──
  const [deployer, recipient] = await hre.viem.getWalletClients();

  // ── Print deployment info ──
  console.log("╔══════════════════════════════════════╗");
  console.log("║   ChronosVault Deployment Script     ║");
  console.log("╚══════════════════════════════════════╝");
  console.log("");
  console.log("Deployer :", deployer.account.address);
  console.log("Recipient:", recipient.account.address);

  // ── Set vault parameters ──
  const thirtyDays = 30 * 24 * 60 * 60;
  const unlockTime = BigInt(
    Math.floor(Date.now() / 1000) + thirtyDays
  );
  const unlockDate = new Date(Number(unlockTime) * 1000);
  const message = "Hello from the past! This is the genesis ChronosVault.";
  const amount = "0.01";

  console.log("Unlock  :", unlockDate.toDateString());
  console.log("Amount  :", amount, "ETH");
  console.log("Message :", message);
  console.log("");
  console.log("Deploying...");

  // ── Deploy the contract ──
  const vault = await hre.viem.deployContract("ChronosVault", [
    recipient.account.address,
    unlockTime,
    message
  ], {
    value: parseEther(amount)
  });

  // ── Print results ──
  console.log("");
  console.log("✅ SUCCESS! ChronosVault is live!");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("Contract Address:", vault.address);
  console.log("Network         :", hre.network.name);
  console.log("Unlock Date     :", unlockDate.toDateString());
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("");
  console.log("⚠️  SAVE THIS ADDRESS — you need it for the frontend!");
}

// Run the script
main().catch((error) => {
  console.error("Deployment failed:", error);
  process.exit(1);
});