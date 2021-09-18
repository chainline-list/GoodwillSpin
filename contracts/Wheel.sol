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
    function buyTokens() payable public  {
        msg.sender.transfer(msg.value);
        prizePool += msg.value;
        token.mint(msg.sender, msg.value);

        emit TokenSale(msg.sender, msg.value);
    }

    // Pay 1 Ticket token to spin the wheel
    function sendToken() public {
        token.burn(msg.sender, 10 ** 18);
        uint amount = prizePool / 2;
        prizePool -= amount;

        emit WonWheel(msg.sender, amount);
    }
}