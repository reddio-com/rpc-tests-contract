//import { ethers } from "hardhat";
const {ethers} = require("hardhat");


async function main() {
  const ERC20 = await ethers.getContractFactory("ERC20T");
  
  const erc20 = await ERC20.deploy("meme", "me");
  try {
    await erc20.waitForDeployment();
  } catch (err) {
    console.log("err", err)
  }


  console.log(`ERC20 meme deployed to ${erc20.target}`);
  console.log(`Block explorer URL: https://blockscout.scroll.io/address/${erc20.target}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});