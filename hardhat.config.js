const { HardhatUserConfig } = require("hardhat/config");
require("@nomicfoundation/hardhat-toolbox");
const dotenv = require("dotenv");

dotenv.config();

const config = {
  solidity: "0.8.20",
  networks: {
    sepolia: {
      url: process.env.HTTP_PROVIDER_URL,
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
    },
  },
  gasReporter: { enabled: true },
};

module.exports = config;
