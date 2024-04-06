const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("ERC4907", function () {
  let ERC4907;
  let erc4907;
  let owner;
  let addr1;
  let addr2;

  beforeEach(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();
    ERC4907 = await ethers.getContractFactory("ERC4907");
    erc4907 = await ERC4907.deploy("TestToken", "TT");
  });

  describe("Deployment", function () {
    it("Should mint a token successfully", async function () {
      await erc4907.connect(owner).safeMint(owner.address, 1);
      expect(await erc4907.ownerOf(1)).to.equal(owner.address);
    });
  });

  describe("setUser", function () {
    beforeEach(async function () {
      await erc4907.connect(owner).safeMint(owner.address, 1);
    });

    it("Should allow setting a user", async function () {
      const now = Math.floor(Date.now() / 1000);
      await erc4907.connect(owner).setUser(1, addr1.address, now + 1000);

      expect(await erc4907.userOf(1)).to.equal(addr1.address);
      expect(await erc4907.userExpires(1)).to.equal(now + 1000);
    });

    it("Should revert if non-owner tries to set a user", async function () {
      await expect(
        erc4907
          .connect(addr1)
          .setUser(1, addr2.address, Math.floor(Date.now() / 1000) + 1000)
      ).to.be.revertedWith("ERC4907: caller is not owner nor approved");
    });
  });

  describe("userOf", function () {
    beforeEach(async function () {
      await erc4907.connect(owner).safeMint(owner.address, 1);
      const now = Math.floor(Date.now() / 1000);
      await erc4907.connect(owner).setUser(1, addr1.address, now + 1000);
    });

    it("Should return the right user", async function () {
      expect(await erc4907.userOf(1)).to.equal(addr1.address);
    });
  });
});
