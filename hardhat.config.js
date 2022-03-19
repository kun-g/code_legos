require("@nomiclabs/hardhat-waffle");
require("dotenv").config();

const { utils: { formatEther, parseEther, parseUnits, } } = require('ethers')
const { writeFileSync, existsSync, readdirSync } = require('fs')

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});


async function deploy(name, network, args=[]) {
  let key = `${network.toUpperCase()}_${name.toUpperCase()}`

  console.log("Key", key)

  if (process.env[key]) {
    console.log(`${name} on ${network} is at ${process.env[key]}`);
    return await ethers.getContractAt(name, process.env[key]); 
  }

  console.log("Deploy", args)
  let factory = await ethers.getContractFactory(name);
  let contract = await factory.deploy(...args);
  await contract.deployed();
  console.log('Deploy', key, contract.address);

  return contract;
}

function updateABI() {
  let base = './artifacts/contracts/'
  let targets = ['BatchTransfer.json']

  for (let sol of readdirSync(base)) {
    let p = base + sol + '/'
    for (let f of readdirSync(p)) {
      console.log(f)
      if (targets.indexOf(f) == -1) {
        continue
      }
      console.log(p+f)
      let d = require(p+f);
      writeFileSync('./abis/'+f, JSON.stringify(d.abi))
    }
  }
}

task("deploy", "部署合约", async (taskArgs, hre) => {
  let bt    = await deploy("BatchTransfer", hre.network.name, [])

  updateABI();
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: {
    version: "0.8.7",
    settings: {
      optimizer: {
        enabled: true,
        runs: 1
      }
    }
  },
  networks: {
    goerli: {
      url: process.env.GOERLI_URL || "",
      accounts: process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    mumbai: {
      url: process.env.MUMBAI_URL || "",
      accounts: process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    polygon: {
      url: process.env.POLYGON_URL || "",
      accounts: process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
//     ropsten: {
//       url: process.env.ROPSTEN_URL || "",
//       accounts:
//         process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
//     },
//     bsc_dev: {
//       url: "https://data-seed-prebsc-1-s1.binance.org:8545",
//       chainId: 97,
//       accounts: [pk]
//     },
//     // bsc: {
//     //   url: "https://data-seed-prebsc-1-s1.binance.org:8545",
//     //   chainId: 56,
//     //   accounts: [pk_bsc]
//     // }
  },
//   gasReporter: {
//     enabled: process.env.REPORT_GAS !== undefined,
//     currency: "USD",
//   },
//   etherscan: {
//     apiKey: process.env.ETHERSCAN_API_KEY,
//   },
};
