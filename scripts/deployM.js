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
    const UniswapV2Factory = await ethers.getContractFactory("Multicall");
    const uniswapV2Factory = await UniswapV2Factory.deploy();
    await uniswapV2Factory.waitForDeployment();

    console.log("Multicall address:", uniswapV2Factory.target);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });