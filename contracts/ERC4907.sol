// SPDX-License-Identifier: CC0-1.0
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "./IERC4907.sol";

contract ERC4907 is ERC721, IERC4907 {
    struct UserInfo {
        address user;
        uint64 expires;
    }

    mapping(uint256 => UserInfo) private _userInfos;

    constructor(string memory name, string memory symbol) ERC721(name, symbol) {}

    function setUser(uint256 tokenId, address user, uint64 expires) external override {
        require(_isApprovedOrOwner(_msgSender(), tokenId), "ERC4907: caller is not owner nor approved");
        _userInfos[tokenId] = UserInfo(user, expires);
        emit UpdateUser(tokenId, user, expires);
    }

    function userOf(uint256 tokenId) external view override returns (address) {
        UserInfo storage info = _userInfos[tokenId];
        return (info.expires > block.timestamp) ? info.user : address(0);
    }

    function userExpires(uint256 tokenId) external view override returns (uint256) {
        return _userInfos[tokenId].expires;
    }

    function safeMint(address to, uint256 tokenId) public {
        _safeMint(to, tokenId);
    }
}
