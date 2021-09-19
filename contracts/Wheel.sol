// SPDX-License-Identifier: MIT
pragma solidity ^0.6.12;

import "./Token.sol";

contract Wheel {
    Token private token;
    uint public prizePool = 0;
    address payable _owner;

    event TokenSale (
        address buyer,
        uint amount
    );

    event WonWheel (
        address buyer,
        uint amount
    );

    constructor(Token _token) public {
        _owner = msg.sender;
        token = _token;
    }

    // Send ticket token
    function buyTicketTokens() payable public  {
        prizePool += msg.value;
        token.mint(msg.sender, msg.value);

        emit TokenSale(msg.sender, msg.value);
    }

    // Pay 1 Ticket token to spin the wheel and earn 50% of the prize pool
    function useTicketToken() public {
        token.burn(msg.sender, 10 ** 18);
        
        uint amount = prizePool / 2;
        msg.sender.transfer(amount);
        prizePool -= amount;

        emit WonWheel(msg.sender, amount);
    }

    // Get the prize pool
    function getPrizePool() public view returns (uint) {
        return address(this).balance;
    }

    // NOTE: For testing only, withdraw all the funds from the contract
    function withdraw() public {
        msg.sender.transfer(address(this).balance);
    }
}