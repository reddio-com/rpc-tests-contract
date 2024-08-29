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

    //solidity version：0.6.6
    const address =  await uniswapV2Router02();
    console.log("address_____11", address);
    return address;
}

// newList = {
//     name: "Test Tokens List",
//     version: {
//       major: 1,
//       minor: 0,
//       patch: 0
//     },
//     logoURI: "https://www.bitxx.top/images/my_head-touch-icon-next.png",
//     timestamp: "2022-11-24 00:00:00.000+00:00",
//     tokens: [
//       {
//         chainId: 50342,
//         address: "0x310B8685e3E69Cb05b251A12f5FFAb23001CdA42",
//         name: "AAA Token",
//         symbol: "AAA",
//         decimals: 18,
        
//         logoURI: "https://www.bitxx.top/images/aaa.png"
//       },
//       {
//         chainId: 50342,
//         address: "0xeC054c6ee2DbbeBC9EbCA50CdBF94A94B02B2E40",
//         name: "BBB Token",
//         symbol: "BBB",
//         decimals: 18,
//         logoURI: "https://www.bitxx.top/images/bbb.png"
//       }
//     ]
//   }

//weth9
//0xf881Bdc361532BdB11acA0F5D75702BbABB5B179
//factor
// 0x949F543aE523D7Ab89A70A397bD7DFfBf514C9f4
// router
// 0x94F22823BEE1dB03a775d6cB5B6c0448c12704D4
// token bbb
//0xeC054c6ee2DbbeBC9EbCA50CdBF94A94B02B2E40
// token aaaa
/// 0x310B8685e3E69Cb05b251A12f5FFAb23001CdA42

//solidity version：0.6.6
async function uniswapV2Router02(){
    const UniswapV2Router02 = await ethers.getContractFactory("UniswapV2Router01");
    const uniswapV2Router02 = await UniswapV2Router02.deploy('0x949F543aE523D7Ab89A70A397bD7DFfBf514C9f4', "0xf881Bdc361532BdB11acA0F5D75702BbABB5B179");
    await uniswapV2Router02.waitForDeployment();

    console.log("UniswapV2Router02 address:", uniswapV2Router02.target);
    return uniswapV2Router02.target;
}

if (require.main === module) {
    main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
}



exports.deployRouter = main;