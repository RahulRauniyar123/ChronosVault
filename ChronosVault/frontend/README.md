# 🔐 ChronosVault

> A decentralized, non-custodial time-capsule protocol built on Base

ChronosVault allows users to lock crypto assets and digital
inheritances on-chain — releasing them automatically only after
a specified future timestamp. Zero intermediaries. Zero custody
risk. Pure mathematics.

## 🌐 Live Deployment

- **Network:** Base Sepolia Testnet
- **Contract:** `0xYOUR_CONTRACT_ADDRESS_HERE`
- **Explorer:** https://sepolia.basescan.org/address/0xYOUR_ADDRESS

## 🎯 What Problem It Solves

Traditional trust funds and inheritance escrows rely on lawyers,
banks, and centralized services — costing thousands in fees and
taking months to execute. ChronosVault replaces all of that with
a single, immutable smart contract.

## ✨ Key Features

- 🔒 **Trustless Time-Lock** — enforced by EVM block.timestamp
- 👤 **Non-Custodial** — creator cannot retrieve funds early
- 📨 **Encrypted Messages** — lock notes for the recipient
- ⚡ **One-Click Claim** — recipient claims with one transaction
- 🌐 **Built on Base** — fast, cheap, Coinbase-backed L2

## 🏗 Tech Stack

| Layer          | Technology                |
| -------------- | ------------------------- |
| Smart Contract | Solidity 0.8.19           |
| Framework      | Hardhat 3 + Ignition      |
| Frontend       | React + TypeScript + Vite |
| Wallet         | wagmi v2 + MetaMask       |
| Network        | Base Sepolia Testnet      |

## 📋 Contract Functions

- `constructor()` — Deploy a new vault with recipient, unlock time, ETH
- `claim()` — Recipient claims vault after unlock time passes
- `getVaultInfo()` — Read all vault parameters (view function)
- `timeUntilUnlock()` — Seconds remaining until unlock

## 🚀 How to Run Locally

```bash
# Clone the repo
git clone https://github.com/RahulRauniyar123/ChronosVault

# Install contract dependencies
npm install

# Create .env file
echo "PRIVATE_KEY=your_key_here" > .env

# Deploy to Base Sepolia
npx hardhat ignition deploy ignition/modules/ChronosVault.ts --network baseSepolia

# Run frontend
cd frontend && npm install && npm run dev
```

## 🔐 Security Design

- No admin keys — creator cannot bypass the time-lock
- Zero external dependencies — smaller attack surface
- All validations enforced at contract level
- Explicit confirmation flow in frontend prevents accidents

## 👤 Built By

Rahul Rauniyar — Crypto World's Fair Hackathon 2026
