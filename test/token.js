const { expect } = require("chai");
const { ethers } = require("hardhat");
const { EVMToken } = require('../common/token');

async function deploy(name) {
    let factory = await ethers.getContractFactory(name);
    let contract = await factory.deploy();
    await contract.deployed();
    return contract;
}

describe("Token", function () {
  let accounts = null;
  let token = null;
  let mainAccount = null;

  before(async function () {
    accounts = (await hre.ethers.getSigners()).map(e => e.address);
    mainAccount = accounts[0];
    let _token = await deploy("BlockToken");

    token = new EVMToken({
      address: _token.address,
      name: await _token.name()
    })
  })

  it("Should return the new greeting once it's changed", async function () {

    console.log(token)

    // await token.mint(mainAccount, 1);

    // expect(await greeter.greet()).to.equal("Hello, world!");

    // const setGreetingTx = await greeter.setGreeting("Hola, mundo!");

    // wait until the transaction is mined
    // await setGreetingTx.wait();

    // expect(await greeter.greet()).to.equal("Hola, mundo!");
  });
});
