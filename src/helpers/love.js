import { createTenzId, initSdk, shareLove} from 'tenzorum';
import {getLocal} from "./localstorage";
import {provider} from "./wallet";

export const initLove = async () => await initSdk(getLocal("account").privateKey, "0xf8894138aa4d7b54b7d49afa9d5600cdb5178721", provider, "ropsten");

// export const checkEnsAvail = async name => {
//   console.log('ENS INPUT: ', name);
//   const address = await checkEns(name);
//   return address === "0x0000000000000000000000000000000000000000";
// };

export const createEns = async username => {
  const ensName = await createTenzId(username, getLocal("account").publicAddress, getLocal("account").publicAddress);
  console.log("ENS NAME: ", ensName);
  return ensName;
};

export const loveTx = async publicAddress => {
  const txHash = await shareLove(publicAddress, 1);
  console.log('SHARE LOVE: ', txHash);
  return txHash;
};