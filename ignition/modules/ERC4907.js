const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");
const dotenv = require("dotenv");

const ERC4907Module = buildModule("ERC4907Module", (m) => {
  //   const deployer = process.env.DEPLOYER_ADDRESS;
  const erc4907 = m.contract("ERC4907", ["MyNFT", "MNFT"]);

  return { erc4907 };
});
module.exports = ERC4907Module;
