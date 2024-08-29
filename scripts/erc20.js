const {ethers} = require("hardhat");

const ALCHEMY_MAINNET_URL = process.env.ALCHEMY_MAINNET_URL;
const provider = new ethers.JsonRpcProvider(ALCHEMY_MAINNET_URL);


const abiERC20 = [
    "function name() view returns (string)",
    "function symbol() view returns (string)",
    "function totalSupply() view returns (uint256)",
    "function blockNumberT() view returns (uint256)",
    "function balanceOf(address) view returns (uint256)",
    "function mint(uint) public"
];

//const uniAbi = [{"inputs":[{"internalType":"address","name":"_feeToSetter","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"token0","type":"address"},{"indexed":true,"internalType":"address","name":"token1","type":"address"},{"indexed":false,"internalType":"address","name":"pair","type":"address"},{"indexed":false,"internalType":"uint256","name":"","type":"uint256"}],"name":"PairCreated","type":"event"},{"constant":true,"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"allPairs","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"allPairsLength","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"tokenA","type":"address"},{"internalType":"address","name":"tokenB","type":"address"}],"name":"createPair","outputs":[{"internalType":"address","name":"pair","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"feeTo","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"feeToSetter","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"getPair","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_feeTo","type":"address"}],"name":"setFeeTo","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_feeToSetter","type":"address"}],"name":"setFeeToSetter","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}]
const uniAbi = [
   "function INIT_CODE_PAIR_HASH() view returns (bytes32)"
]

const privateKey = process.env.PRIVATE_KEY;
// user address
const userAddr = "0x7Bd36074b61Cfe75a53e1B9DF7678C96E6463b02";
const wallet = new ethers.Wallet(privateKey, provider)

//const address = '0x310B8685e3E69Cb05b251A12f5FFAb23001CdA42' // contract address
const address = "0xbf637219dd8C2c124d1FBde71cD5eb7faCDABa8F"
const contract = new ethers.Contract(address, abiERC20, wallet);

const uniswapV2Factory = "0x949F543aE523D7Ab89A70A397bD7DFfBf514C9f4" //"0xEd97DDbed4616A8B08E834d8CD9DEb06117E8a7b"

const contractUni = new ethers.Contract(uniswapV2Factory, uniAbi, wallet);

const main = async () => {
    const INIT_CODE_PAIR_HASH = await contractUni.INIT_CODE_PAIR_HASH();
    console.log(`contract INIT_CODE_PAIR_HASH: ${INIT_CODE_PAIR_HASH}`)
    const name = await contract.name()
    const symbol = await contract.symbol()
    const totalSupply = await contract.totalSupply()
    const blockNumberT = await contract.blockNumberT()
    console.log(`contract address: ${contract.address}`)
    console.log(`name: ${blockNumberT}`)
    console.log(`symbol: ${symbol}`)
    
    // const balanceTokenBefore = await contract.balanceOf(userAddr)
    // console.log(`balance before: ${balanceTokenBefore}, ${totalSupply}`)

    //const tx = await contract.mint(10000000000000000000000n);
    //await tx.wait()
    //const blockNumberT2 = await contract.blockNumberT()
    //console.log(`blockNumber: ${blockNumberT2}`)
    // const balanceTokenAfter = await contract.balanceOf(userAddr)
    // const totalSupplyAfter = await contract.totalSupply()

    // console.log(`balance after: ${balanceTokenAfter}, ${totalSupplyAfter}`)
}

main()