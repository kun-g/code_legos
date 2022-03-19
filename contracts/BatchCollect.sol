// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts/utils/math/Math.sol";
import "./libraries/AccountProxy.sol";

// 批量归集，需要事先授权
contract BatchCollect is AccountProxy {
    function collectToken (IERC20 token, uint amount, address[] memory from) payable onlyOwner public {
        require(from.length > 0, 'NO ADDRESS');
        for (uint i = 0; i < from.length; i++) {
            uint256 n = Math.min(
                token.balanceOf(from[i]), 
                token.allowance(from[i], address(this))
            );
            if (amount != 0) {
                n = Math.min(n, amount);
            }
            if (n == 0) {
                continue;
            }
            token.transferFrom(from[i], msg.sender, n);
        }
    }

    // function collectNFT (IERC721 token, address[] memory from) payable onlyOwner public {
    //     require(from.length > 0, 'NO ADDRESS');
    //     for (uint i = 0; i < from.length; i++) {
    //     }
    // }
}

