require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    compilers: [
      {version: "0.8.24", settings: {
        optimizer: {enabled: true, runs: 200}
      }
    },
      {version: "0.8.4", settings: {
          optimizer: {enabled: true, runs: 200}
        }
      },
      {version: "0.8.0", settings: {
          optimizer: {enabled: true, runs: 200}
        }},
      {version: "0.6.13", settings: {
          optimizer: {enabled: true, runs: 200}
        }},
      {version: "0.6.6", settings: {
          optimizer: {enabled: true, runs: 200}
        }},
      {version: "0.5.16", settings: {
          optimizer: {enabled: true, runs: 200}
        }},
      {version: "0.4.18", settings: {
          optimizer: {enabled: true, runs: 200}
        }}
    ]
  },
  networks: {
    verseTestnet: {
      url: 'https://rpc-alpha.versechain.xyz/',
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
  },
};
