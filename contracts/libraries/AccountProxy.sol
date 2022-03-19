// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.0;

import './Ownable.sol';
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

contract AccountProxy is Ownable {
    function updateNFTApprovement (IERC721 nft, address receiver) public onlyOwner {
        if (!nft.isApprovedForAll(address(this), receiver)) {
            nft.setApprovalForAll(receiver, true);
        }
    }

    function updateNFTApprovements (IERC721[] calldata nfts, address receiver) public onlyOwner {
        for (uint i = 0; i < nfts.length; i++) {
            updateNFTApprovement(nfts[i], receiver);
        }
    }

    function approve (IERC20 token, address spender) public onlyOwner {
        token.approve(spender, 2**255);
    }

    function withdraw (IERC20[] calldata tokens, address payable receiver) public onlyOwner {
        if (address(this).balance > 0) {
            receiver.transfer(address(this).balance);
        }

        for (uint i=0; i < tokens.length; i++) {
            uint b = IERC20(tokens[i]).balanceOf(address(this));
            if (b > 0) {
                tokens[i].transfer(receiver, b);
            }
        }
    }
}


