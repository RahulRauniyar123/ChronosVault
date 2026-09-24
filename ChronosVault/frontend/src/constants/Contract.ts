// Your deployed vault address — update after testnet deploy (Day 9)
export const CHRONOSVAULT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3" as `0x${string}`;

export const CHRONOSVAULT_ABI = [
  {
    inputs: [
      { name: "_recipient", type: "address" },
      { name: "_unlockTime", type: "uint256" },
      { name: "_encryptedMessage", type: "string" }
    ],
    stateMutability: "payable", type: "constructor"
  },
  {
    inputs: [], name: "claim", outputs: [],
    stateMutability: "nonpayable", type: "function"
  },
  {
    inputs: [], name: "getVaultInfo",
    outputs: [
      { name: "_creator", type: "address" },
      { name: "_recipient", type: "address" },
      { name: "_unlockTime", type: "uint256" },
      { name: "_balance", type: "uint256" },
      { name: "_claimed", type: "bool" },
      { name: "_unlocked", type: "bool" }
    ],
    stateMutability: "view", type: "function"
  },
  { inputs: [], name: "recipient", outputs: [{ name: "", type: "address" }], stateMutability: "view", type: "function" },
  { inputs: [], name: "creator", outputs: [{ name: "", type: "address" }], stateMutability: "view", type: "function" },
  { inputs: [], name: "unlockTime", outputs: [{ name: "", type: "uint256" }], stateMutability: "view", type: "function" },
  { inputs: [], name: "claimed", outputs: [{ name: "", type: "bool" }], stateMutability: "view", type: "function" },
  { inputs: [], name: "encryptedMessage", outputs: [{ name: "", type: "string" }], stateMutability: "view", type: "function" },
  { inputs: [], name: "timeUntilUnlock", outputs: [{ name: "", type: "uint256" }], stateMutability: "view", type: "function" }
] as const;