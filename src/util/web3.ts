import Web3 from 'web3';
import contractAbi from '../../contract-abi.json';

let web3: Web3;

if (typeof (window as any).ethereum !== 'undefined') {
  // Use MetaMask provider
  web3 = new Web3((window as any).ethereum);
  (window as any).ethereum.enable(); // Request user permission
} else {
  // Fallback to a different provider or Infura
  const provider = new Web3.providers.HttpProvider('https://rpc-mumbai.maticvigil.com/'); // Use the appropriate RPC endpoint
  web3 = new Web3(provider);
}

const contractAddress = '0x4f1bf6617395F7d63E5815A8fBC2fa004C097F95';
const contract = new web3.eth.Contract(contractAbi, contractAddress);

export { web3, contract };
