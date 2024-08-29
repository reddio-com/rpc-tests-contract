//const {ethers} = require("hardhat");
const { toBigInt } = ethers;
// Recreate assetInfo in JavaScript
const { assert, expect } = require('chai');
const { readArtifactAbi } = require('../scripts/libraries/utils.js');
const { deployRouter } = require("../scripts/deployRouter.js");
const erc20TokenAbi = require('../abis/erc20TokenAbi.js');
// prod
const uniswapRouterAddress = '0xa30913538d13e989CCc3468B0FE5b67BF49dEfE0';
const userAddr = "0x7Bd36074b61Cfe75a53e1B9DF7678C96E6463b02";
const tokenAAA = "0x310B8685e3E69Cb05b251A12f5FFAb23001CdA42";
const tokenBBB = "0xeC054c6ee2DbbeBC9EbCA50CdBF94A94B02B2E40";

const provider = new ethers.JsonRpcProvider("http://107.23.201.55:9092");

provider.resolveName = async (name) => {
  return "0x0000000000000000000000000000000000000000"; // default
};

const admin = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

describe('StateForkedTest', async function () {
  //let operator;
  let routerWithAdmin;  
  let investmentManagerFacet;  
  let routerContract

  before(async function () {
    routerAddress = await deployRouter();
    routerFact = await ethers.getContractAt('UniswapV2Router01', routerAddress);
    routerContract = routerFact.connect(admin);

    const amount = toBigInt(1000000) * 10n ** toBigInt(18);

    const erc20Token = new ethers.Contract(tokenAAA, erc20TokenAbi, admin);
    const erc20TokenWithWallet = erc20Token.connect(admin);

    const approveTx = await erc20TokenWithWallet.approve(routerAddress, amount);
    await approveTx.wait();

    const erc20TokenBBB = new ethers.Contract(tokenBBB, erc20TokenAbi, admin);
    const erc20TokenWithWalletBBB = erc20TokenBBB.connect(admin);

    const approveTxBBB = await erc20TokenWithWalletBBB.approve(routerAddress, amount);
    await approveTxBBB.wait();


    const approveTxReceipt = await ethers.provider.getTransactionReceipt(approveTx.hash);


    console.log("routerAddress___", routerAddress);

    //const investmentManagerFacetAbi = await readArtifactAbi('UniswapV2Router01');
    //investmentManagerFacet = new ethers.Contract(uniswapRouterAddress, investmentManagerFacetAbi);
    //routerWithAdmin = investmentManagerFacet.connect(admin);
    //const signers = await ethers.getSigners();
    console.log('============UniswapRouter Test============');
  });

  it('test addliq', async () => {
    const amount = toBigInt(100) * 10n ** toBigInt(18);
    const amountMin = toBigInt(10) * 10n ** toBigInt(18);
    console.log("111111");

    //1: "0x310B8685e3E69Cb05b251A12f5FFAb23001CdA42"
    
    //2: "0xeC054c6ee2DbbeBC9EbCA50CdBF94A94B02B2E40"

    //3: "200000000000000000000"

    //4: "10000000000000000000"

    //5: "200000000000000000000"

    //6: "10000000000000000000"

    //7: "0x7Bd36074b61Cfe75a53e1B9DF7678C96E6463b02"

    //8: "0x68155a43676e00000"

    // reservea: 2680000000000000000000n
    // reserveb: 1440000000000000000000n

    try {
      const setSwapPriceCheckAmountTx = await routerContract.addLiquidity(
        tokenAAA,
        tokenBBB,
        "200000000000000000000",
        "100000000000000000000",
        "200000000000000000000",
        "100000000000000000000",
        userAddr,
        "0x68155a43676e00000",
      );
      await setSwapPriceCheckAmountTx.wait()
      const receipt = await ethers.provider.getTransactionReceipt(setSwapPriceCheckAmountTx.hash);

      console.log("success__________", receipt.status)
    } catch(err) {
      console.log("err_____", err);
    }

    try {
      const amountAPub = await routerContract.amountAPub();
      //await amountAPub.wait()
      //const receiptA = await ethers.provider.getTransactionReceipt(amountAPub.hash);

      //console.log("success__________", receiptA, amountAPub);
      console.log("amountAPub__________", amountAPub);
    } catch(err) {
      console.log("err_____", err);
    }

    try {
      const testPair = await routerContract.testPair();

      console.log("amountAPub__________", testPair);
    } catch(err) {
      console.log("err_____", err);
    }
    
    
    assert(false, "error")
  });
});
