import { describe, it } from "node:test";
import assert from "node:assert/strict";
import hre from "hardhat";
import { createWalletClient, createPublicClient,
         custom, parseEther } from "viem";
import { hardhat as hardhatChain } from "viem/chains";

describe("ChronosVault Test Suite", async () => {

  async function deployFreshVault() {
    const transport = custom(hre.network.provider);
    const publicClient = createPublicClient({
      chain: hardhatChain, transport
    });
    const accounts = await publicClient.getAddresses();
    const ownerAddress = accounts[0];
    const recipientAddress = accounts[1];
    const ownerWallet = createWalletClient({
      account: ownerAddress, chain: hardhatChain, transport
    });
    const artifact = await hre.artifacts.readArtifact("ChronosVault");
    const abi = artifact.abi;
    const bytecode = artifact.bytecode as `0x${string}`;
    const unlockTime = BigInt(Math.floor(Date.now() / 1000) + 3600);
    const hash = await ownerWallet.deployContract({
      abi, bytecode,
      args: [recipientAddress, unlockTime, "Hello from the past!"],
      value: parseEther("0.01")
    });
    const receipt = await publicClient.waitForTransactionReceipt({ hash });
    const contractAddress = receipt.contractAddress!;
    return { contractAddress, abi, ownerAddress,
             recipientAddress, unlockTime, publicClient, ownerWallet };
  }

  it("Test 1: Correct recipient stored", async () => {
    const { contractAddress, abi, recipientAddress, publicClient } =
      await deployFreshVault();
    const stored = await publicClient.readContract({
      address: contractAddress, abi, functionName: "recipient"
    }) as string;
    assert.equal(stored.toLowerCase(), recipientAddress.toLowerCase());
  });

  it("Test 2: Correct unlock time stored", async () => {
    const { contractAddress, abi, unlockTime, publicClient } =
      await deployFreshVault();
    const stored = await publicClient.readContract({
      address: contractAddress, abi, functionName: "unlockTime"
    });
    assert.equal(stored, unlockTime);
  });

  it("Test 3: Holds ETH after deploy", async () => {
    const { contractAddress, publicClient } = await deployFreshVault();
    const balance = await publicClient.getBalance({ address: contractAddress });
    assert.equal(balance, parseEther("0.01"));
  });

  it("Test 4: Starts as unclaimed", async () => {
    const { contractAddress, abi, publicClient } = await deployFreshVault();
    const claimed = await publicClient.readContract({
      address: contractAddress, abi, functionName: "claimed"
    });
    assert.equal(claimed, false);
  });

  it("Test 5: Blocks early claiming", async () => {
    const { contractAddress, abi, recipientAddress, publicClient } =
      await deployFreshVault();
    const recipientWallet = createWalletClient({
      account: recipientAddress, chain: hardhatChain,
      transport: custom(hre.network.provider)
    });
    try {
      const hash = await recipientWallet.writeContract({
        address: contractAddress, abi, functionName: "claim"
      });
      await publicClient.waitForTransactionReceipt({ hash });
      assert.fail("Should have reverted");
    } catch { assert.ok(true); }
  });

  it("Test 6: Blocks wrong claimer", async () => {
    const { contractAddress, abi, publicClient, ownerWallet } =
      await deployFreshVault();
    try {
      const hash = await ownerWallet.writeContract({
        address: contractAddress, abi, functionName: "claim"
      });
      await publicClient.waitForTransactionReceipt({ hash });
      assert.fail("Should have reverted");
    } catch { assert.ok(true); }
  });
});