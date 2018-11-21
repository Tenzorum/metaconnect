import {saveLocal} from './localstorage'
const Web3 = require('web3');
// const Wallet = require('ethereumjs-wallet');
const web3 = new Web3();
// const ethutil = require('ethereumjs-util');
const ethers = require('ethers');

//TODO: switch to mainnet
web3.setProvider(new web3.providers.HttpProvider('https://ropsten.infura.io/'));
export const provider = web3;
let currentProvider = new web3.providers.HttpProvider('https://ropsten.infura.io/');
console.log(currentProvider);

/**
 * @desc create ethereum wallet and save to local storage
 */
export const createWallet = async () => {
  const {privateKey, address} = ethers.Wallet.createRandom();
  await saveLocal("account", { privateKey, publicAddress: address });
  console.log('account: ', {address, privateKey});
  return {address, privateKey}
};

/**
 * @desc signs a message and executes a callback function with the signed message / error
 */
// export const signMsg = async (msg, cb) => {
//   console.log('MESSAGE: ', msg.params[0]);
//   msg = ethutil.sha256(msg.params[0]);
//   let result = {};
//   try {
//     const sig = ethutil.ecsign(msg, new Buffer(JSON.parse(localStorage.account).privateKey, 'hex'));
//     result.result = sig.s;
//   } catch(e) {
//     result.error = e;
//   }
//   return cb(result.error, result);
// };