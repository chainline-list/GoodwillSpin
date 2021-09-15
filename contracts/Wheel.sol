// SPDX-License-Identifier: MIT
pragma solidity ^0.6.12;

import "./Token.sol";

contract Wheel {
    Token private token;

    constructor(Token _token) public {
        token = _token;
    }

    function sendToken() public {
        token.mint(msg.sender, 1);
    }
}