// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "./libraries/AccountProxy.sol";

contract BatchTransfer is AccountProxy {

    function transferETH (address payable[] memory to, uint amount) payable public {
        require(to.length > 0, 'NO ADDRESS');
        require(msg.value >= amount * to.length, 'NOT ENOUGH');
        for (uint i; i < to.length; i++) {
            to[i].transfer(amount);
        }
    }

    function transferToken(IERC20 token, uint amount, address[] memory to) payable public {
        require(to.length > 0, 'NO ADDRESS');
        require(token.balanceOf(msg.sender) >= amount*to.length, 'NO BALANCE');
        require(token.allowance(msg.sender, address(this)) >= amount*to.length, 'NO ALLOWANCE');
        for (uint i; i < to.length; i++) {
            token.transferFrom(msg.sender, to[i], amount);
        }
    }

    function transferNFT(IERC721 token, uint256[] memory ids, address to) payable public {
        for (uint i; i < ids.length; i++) {
            token.transferFrom(msg.sender, to, ids[i]);
        }
    }

    function transferNFT(IERC721 token, uint256[] memory ids, address[] memory to) payable public {
        require(to.length == ids.length, 'Length Not Match');
        for (uint i; i < ids.length; i++) {
            token.transferFrom(msg.sender, to[i], ids[i]);
        }
    }

    function queryToken (IERC20 token, address[] memory from) public view returns(uint256[] memory) {
        uint256[] memory res = new uint256[](from.length);
        for (uint i; i < from.length; i++) {
            res[i] = token.balanceOf(from[i]);
        }
        return res;
    }

    function queryETH (address[] memory from) public view returns(uint256[] memory) {
        uint256[] memory res = new uint256[](from.length);
        for (uint i; i < from.length; i++) {
            res[i] = from[i].balance;
        }
        return res;
    }

}
