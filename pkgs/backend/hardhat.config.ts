import "@nomicfoundation/hardhat-toolbox";
import 'dotenv/config';
import { HardhatUserConfig } from "hardhat/config";

const {
  PRIVATE_KEY,
  SCROLLSCAN_API_KEY,
  GAS_REPORT,
  COINMARKETCAP_API_KEY
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
  gasReporter: {
    enabled: GAS_REPORT ? true : false,
    currency: 'JPY',
    gasPrice: 20,
    token: 'ETH',
    coinmarketcap: COINMARKETCAP_API_KEY,
    gasPriceApi: 'https://api.etherscan.io/api?module=proxy&action=eth_gasPrice',
  },
};

export default config;
