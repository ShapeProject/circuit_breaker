import { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";
import {
  DefenderRelayProvider,
  DefenderRelaySigner,
} from "@openzeppelin/defender-relay-client/lib/ethers";
import 'dotenv/config';
import { ethers } from 'hardhat';
import { ForwardRequest } from "../../../test/helper/types";
import { ScoreVaultForwarder } from "../../../typechain-types";

const {
  DEFENDER_API_KEY,
  DEFENDER_SECRET_KEY
} = process.env;

/**
 * get Relayer method
 */
const getRelayer = async() => {
  const credentials: any = {
    apiKey: DEFENDER_API_KEY,
    apiSecret: DEFENDER_SECRET_KEY
  };

  const ozProvider = new DefenderRelayProvider(credentials);
  const ozSigner = new DefenderRelaySigner(credentials, ozProvider, {
    speed: "fast",
  });

  return ozSigner;
}

/**
 * create Request data
 */
async function createRequestData(
  forwarder: ScoreVaultForwarder,
  domain: any,
  signer: HardhatEthersSigner,
  to: string,
  data: any,
) {
  // get deadline
  const currentTime = Math.floor(Date.now() / 1000); // Unixエポックからの経過秒数
  const futureTime = currentTime + 60;
  const uint48Time = BigInt(futureTime) % (2n ** 48n);
  // create signature
  const signature = await signer.signTypedData(
    {
      name: domain.name,
      version: domain.version,
      chainId: domain.chainId,
      verifyingContract: domain.verifyingContract
    } ,
    { 
      'ForwardRequest': ForwardRequest 
    },
    {
      from: signer.address,
      to: to,
      value: 0,
      gas: 360000,
      nonce: await forwarder.nonces(signer.address),
      deadline: uint48Time,
      data: data
    }
  );
  // create request data
  const request = {
    from: signer.address,
    to: to,
    value: 0,
    gas: 360000,
    nonce: await forwarder.nonces(signer.address),
    deadline: uint48Time,
    data: data,
    signature: signature
  }
  return request;
}

/**
 * GaslessSetScore test script
 */
async function main() {
  console.log(` ============================================== [GaslessSetScore:start] ================================================ `)
  // get signer 
  const [ owner ] = await ethers.getSigners();
  // get Forwarder contract address
  const FORWARDER_CONTRACT_ADDRESS = "0x3140a4156db3A4077c41C2Bcb22cC02Ba407f0B5";
  // get ScoreValut Contract address
  const SCOREVAULT_CONTRACT_ADDRESS = "0xF09d5a398239b32071c33945bFcdA29BCb0B842A";

  const ozSigner: any = await getRelayer();
  const forwarder = await ethers.getContractAt('ScoreVaultForwarder', FORWARDER_CONTRACT_ADDRESS, ozSigner);
  const scoreVault = await ethers.getContractAt('ScoreVault', SCOREVAULT_CONTRACT_ADDRESS);

  // create encode function data
  const data = scoreVault.interface.encodeFunctionData("setScore", [
    "0xtesgstet",
    "0xtesgstet"
  ]);
  // get domain
  const domain = await forwarder.eip712Domain();
  // creat request data
  const request = await createRequestData(
    forwarder,
    domain,
    owner,
    await scoreVault.getAddress(),
    data
  );

  const valid = await forwarder.verify(request);

  if (!valid) throw new Error("invalid signature");

  const tx = await forwarder.execute(request);

  console.log("tx Hash:", tx.hash);

  console.log(` =============================================== [GaslessSetScore:end]  =============================================== `)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})