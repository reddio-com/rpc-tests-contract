const fs = require('fs').promises;
const path = require('path');

function getErc20AssetInfo(tokenAddress) {
  const ERC20_SELECTOR = '0xf47261b0'; // keccak256("ERC20Token(tokenAddress)")
  const asset_info = ERC20_SELECTOR + tokenAddress.toLowerCase().slice(2).padStart(64, '0');
  return asset_info;
}

const findJsonFilePath = async (dir, contractName) => {
  const files = await fs.readdir(dir, { withFileTypes: true });
  for (const file of files) {
    if (file.isDirectory()) {
      const result = await findJsonFilePath(path.join(dir, file.name), contractName);
      if (result) return result;
    } else if (file.isFile() && file.name === `${contractName}.json`) {
      return path.join(dir, file.name);
    }
  }
  return null; // Return null if no matching file is found
};

const readArtifactAbi = async (contractName) => {
  // Adjust the directory path to consider script location relative to the project root
  const dirPath = path.resolve(__dirname, '../../artifacts/contracts');
  const filePath = await findJsonFilePath(dirPath, contractName);
  if (!filePath) {
    console.error('Artifact file not found for contract:', contractName);
    return null;
  }

  try {
    const data = await fs.readFile(filePath, 'utf8');
    const artifact = JSON.parse(data);
    return artifact.abi;
  } catch (error) {
    console.error('Error reading or parsing the artifact file:', error);
    return null;
  }
};

module.exports = { getErc20AssetInfo, readArtifactAbi };
