import { buildModule } from
  "@nomicfoundation/hardhat-ignition/modules";

const THIRTY_DAYS = 30n * 24n * 60n * 60n;
const UNLOCK_TIME =
  BigInt(Math.floor(Date.now() / 1000)) + THIRTY_DAYS;

const RECIPIENT =
  "0x70997970C51812dc3A010C7d01b50e0d17dc79C8";

const ChronosVaultModule = buildModule(
  "ChronosVaultModule", (m) => {
    const vault = m.contract("ChronosVault", [
      RECIPIENT,
      UNLOCK_TIME,
      "Hello from the past! Genesis ChronosVault."
    ], {
      value: 10_000_000_000_000_000n
    });
    return { vault };
  }
);

export default ChronosVaultModule;