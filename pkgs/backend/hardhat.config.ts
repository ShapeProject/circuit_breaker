import "@nomicfoundation/hardhat-toolbox";
import 'dotenv/config';
import { HardhatUserConfig } from "hardhat/config";

const {
  PRIVATE_KEY,
  SCROLLSCAN_API_KEY
} = process.env;

const config: HardhatUserConfig = {
  solidity: "0.8.20",
  networks: {
    scrollSepolia: {
      url: 'https://sepolia-rpc.scroll.io/' || '',
      accounts:
        PRIVATE_KEY !== undefined ? [PRIVATE_KEY] : [],
    },
  },
  etherscan: {
    apiKey: {
      scrollSepolia: SCROLLSCAN_API_KEY!,
    },
    customChains: [
      {
        network: 'scrollSepolia',
        chainId: 534351,
        urls: {
          apiURL: 'https://api-sepolia.scrollscan.com/api',
          browserURL: 'https://sepolia.scrollscan.com/',
        },
      },
    ],
  },
};

export default config;
