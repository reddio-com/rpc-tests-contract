const {ethers} = require("hardhat");

const ALCHEMY_MAINNET_URL = process.env.ALCHEMY_MAINNET_URL;
const provider = new ethers.JsonRpcProvider(ALCHEMY_MAINNET_URL);


const abiERC20 = [
    "function name() view returns (string)",
    "function symbol() view returns (string)",
    "function totalSupply() view returns (uint256)",
    "function balanceOf(address) view returns (uint)",
    "function mint(uint) public"
];

const privateKey = process.env.PRIVATE_KEY;
const wallet = new ethers.Wallet(privateKey, provider)


const address = '0x310B8685e3E69Cb05b251A12f5FFAb23001CdA42' // contract address
const contract = new ethers.Contract(address, abiERC20, wallet);


const main = async () => {
    // 1. 读取WETH合约的链上信息（WETH abi）
    const name = await contract.name()
    const symbol = await contract.symbol()
    const totalSupply = await contract.totalSupply()
    console.log(`contract address: ${contract.address}`)
    console.log(`name: ${name}`)
    console.log(`symbol: ${symbol}`)
    
    const balanceWETH = await contract.balanceOf(address)

    const tx = await contract.mint(1000n);
    // 等待交易上链
    await tx.wait()
    console.log(tx)
}

main()