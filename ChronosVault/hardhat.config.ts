import toolboxViem from "@nomicfoundation/hardhat-toolbox-viem";
import "dotenv/config";

export default {
  solidity: "0.8.19",
  plugins: [toolboxViem],
  networks: {
    baseSepolia: {
      type: "http",
      url: "https://sepolia.base.org",
      accounts: process.env.PRIVATE_KEY
        ? [process.env.PRIVATE_KEY]
        : [],
      chainId: 84532
    }
  }
};