const {ethers} = require("hardhat");

async function main() {
    // This is just a convenience check
    if (network.name === "hardhat") {
        console.warn(
            "You are trying to deploy a contract to the Hardhat Network, which" +
            "gets automatically created and destroyed every time. Use the Hardhat" +
            " option '--network localhost'"
        );
    }

    // ethers is available in the global scope
    const [deployer] = await ethers.getSigners();
    console.log(
        "Deploying the contracts with the account:",
        await deployer.getAddress()
    );

    console.log("Account balance:", (await deployer.provider.getBalance(deployer.address)).toString());

    //solidity version：0.5.16
    await factory();
}

//solidity version：0.5.16
async function factory(){
    const UniswapV2Factory = await ethers.getContractFactory("UniswapV2Factory");
    const uniswapV2Factory = await UniswapV2Factory.deploy('0x7Bd36074b61Cfe75a53e1B9DF7678C96E6463b02');
    await uniswapV2Factory.waitForDeployment();

    console.log("UniswapV2Factory address:", uniswapV2Factory.target);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });