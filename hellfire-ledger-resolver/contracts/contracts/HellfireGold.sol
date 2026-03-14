// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract HellfireGold is ERC20, Ownable {

    event TokensMinted(address indexed to, uint256 amount);
    event DebtSettled(address indexed from, address indexed to, uint256 amount);

    constructor(address initialOwner)
        ERC20("Hellfire Gold", "HFG")
        Ownable(initialOwner)
    {
        // Mint 5,000 HFG to deployer on launch
        _mint(initialOwner, 5000 * 10 ** decimals());
    }

    /**
     * @dev Owner can mint tokens to any player address
     */
    function mint(address to, uint256 amount) external onlyOwner {
        _mint(to, amount);
        emit TokensMinted(to, amount);
    }

    /**
     * @dev Settle a debt — transfers HFG from caller to creditor
     */
    function settleDebt(address creditor, uint256 amount) external returns (bool) {
        emit DebtSettled(msg.sender, creditor, amount);
        return transfer(creditor, amount);
    }

    /**
     * @dev Check HFG balance of any player
     */
    function getBalance(address player) external view returns (uint256) {
        return balanceOf(player);
    }
}