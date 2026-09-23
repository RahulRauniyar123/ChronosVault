// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract ChronosVault {

    address payable public recipient;
    address public creator;
    uint256 public unlockTime;
    bool public claimed;
    string public encryptedMessage;

    event VaultCreated(
        address indexed creator,
        address indexed recipient,
        uint256 unlockTime,
        uint256 amount
    );

    event VaultClaimed(
        address indexed recipient,
        uint256 amount,
        uint256 claimedAt
    );

    constructor(
        address payable _recipient,
        uint256 _unlockTime,
        string memory _encryptedMessage
    ) payable {
        require(_recipient != address(0), "Invalid recipient");
        require(_unlockTime > block.timestamp, "Must be future time");
        require(msg.value > 0, "Must deposit ETH");

        creator = msg.sender;
        recipient = _recipient;
        unlockTime = _unlockTime;
        encryptedMessage = _encryptedMessage;
        claimed = false;

        emit VaultCreated(msg.sender, _recipient, _unlockTime, msg.value);
    }

    function claim() external {
        require(!claimed, "Already claimed");
        require(block.timestamp >= unlockTime, "Still locked");
        require(msg.sender == recipient, "Not recipient");

        claimed = true;
        uint256 balance = address(this).balance;
        recipient.transfer(balance);

        emit VaultClaimed(recipient, balance, block.timestamp);
    }

    function getVaultInfo() external view returns (
        address, address, uint256, uint256, bool, bool
    ) {
        return (
            creator,
            recipient,
            unlockTime,
            address(this).balance,
            claimed,
            block.timestamp >= unlockTime
        );
    }

    function timeUntilUnlock() external view returns (uint256) {
        if (block.timestamp >= unlockTime) return 0;
        return unlockTime - block.timestamp;
    }

    receive() external payable {
        revert("Use constructor only");
    }
}