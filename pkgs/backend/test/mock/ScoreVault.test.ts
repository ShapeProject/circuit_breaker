import { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import fs from "fs";
import { ethers } from "hardhat";
import * as snarkjs from "snarkjs";
import {
  MockVerifier,
  MockVerifier__factory,
  ScoreVault,
  ScoreVaultForwarder,
  ScoreVaultForwarder__factory,
  ScoreVault__factory
} from "../../typechain-types";
import { ForwardRequest } from "../helper/types";

describe("ScoreVault", function () {
  // file paths
  const INPUT_FILE_PATH = "./zk/mock/input.json";
  const WASM_FILE_PATH = "./zk/mock/circuit.wasm";
  const ZKEY_FILE_PATH = "./zk/mock/zkey.zkey";

  /**
   *  Verifier deploy function
   * @returns
   */
  async function deployContract() {
    const [owner, otherAccount] = await ethers.getSigners();

    // deploy Forwarder Contract
    const Forwarder: ScoreVaultForwarder__factory = await ethers.getContractFactory("ScoreVaultForwarder");
    const forwarder: ScoreVaultForwarder = await Forwarder.deploy();
    // deploy verifier & ScoreValut contract
    const Verifier: MockVerifier__factory = await ethers.getContractFactory("MockVerifier");
    const verifier: MockVerifier = await Verifier.deploy();
    const ScoreVault: ScoreVault__factory = await ethers.getContractFactory("ScoreVault");
    const scoreVault: ScoreVault = await ScoreVault.deploy(verifier.target, forwarder.target);
  
    return {
      owner,
      otherAccount,
      verifier,
      scoreVault,
      forwarder
    };
  }

  /**
   * createCallData method
   */
  async function createCallData() {
    // input data
    const inputFile: any = fs.readFileSync(INPUT_FILE_PATH)
    const inputData = JSON.parse(inputFile);
    // generate proof & publicSignals
    const { 
      proof, 
      publicSignals 
    } = await snarkjs.groth16.fullProve(
      inputData, 
      WASM_FILE_PATH, 
      ZKEY_FILE_PATH
    );
    // generate callData for Verifier Contract
    const callData = await snarkjs.groth16.exportSolidityCallData(proof, publicSignals);
    return callData;
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
   * call forwarder's verify & execute method
   */
  async function callForwardMethodFromRelayer(
    relayer: HardhatEthersSigner,
    forwarder: ScoreVaultForwarder,
    request: any
  ) {
    // call verify method
    expect(true).to.equal(await forwarder.connect(relayer).verify(request));
    // check nonce
    expect(request.nonce).to.equal(await forwarder.nonces(request.from));
    // call execute method from relayer
    await forwarder.connect(relayer).execute(request);
  }
  
  describe("ScoreVault Test", function () {
    it("check init data", async function () {
      const { verifier, scoreVault } = await loadFixture(deployContract);
      // get verifier address
      const verifierAddress = await scoreVault.verifierContract();
      expect(verifier.target).to.equal(verifierAddress);
    });

    it("set Score & get Score", async function () {
      // deploy contract
      const { owner, scoreVault } = await loadFixture(deployContract);
      // sample data
      const sampleCount = 1;
      const sampleData = "0xsssgsete"

      // call setScoremethod
      await scoreVault.setScore(await owner.getAddress(), sampleCount, sampleData);
      // get score data 
      const result = await scoreVault.getScore(owner.address);
      // check
      expect(parseInt(result[0].toString(), 16)).to.equal(sampleCount);
      expect(result[1]).to.equal(sampleData);
    });

    it("verify proof", async function () {
      // deploy contract
      const { scoreVault } = await loadFixture(deployContract);
      // ceate call data
      const callData = await createCallData();
      // convert
      const solidityCallData = JSON.parse(`[${callData}]`);
      // verify & Mint NFT
      const tx = await scoreVault.verifyProof(
        solidityCallData[0],
        solidityCallData[1],
        solidityCallData[2],
        solidityCallData[3]
      );
      await tx.wait();
      // check verify result
      expect(true).to.emit(scoreVault, "Verify")
    });

    it("【error】invalid proof", async function () {
      // deploy contract
      const { scoreVault } = await loadFixture(deployContract);

      // ceate call data
      const callData = await createCallData();
      // convert
      const solidityCallData = JSON.parse(`[${callData}]`);
      // verify & Mint NFT
      const tx = await scoreVault.verifyProof(
        solidityCallData[0],
        solidityCallData[1],
        solidityCallData[0],
        solidityCallData[3]
      );
      await tx.wait();
      // check verify result
      expect(false).to.emit(scoreVault, "Verify")
    });
  });

  describe("MetaTransaction Test", function () {
    it("check Forwarder Address", async function () {
      const { scoreVault, forwarder } = await loadFixture(deployContract);
      // get forwarder Address 
      expect(forwarder.target).to.equal(await scoreVault.trustedForwarder());
      expect(true).to.equal(await scoreVault.isTrustedForwarder(forwarder.target));
    });

    it("gasless verify proof", async function () {
      const { 
        scoreVault, 
        forwarder, 
        owner, 
        otherAccount 
      } = await loadFixture(deployContract);
      // ceate call data
      const callData = await createCallData();
      // convert
      const solidityCallData = JSON.parse(`[${callData}]`);
      // create encode function data
      const data = scoreVault.interface.encodeFunctionData("verifyProof", [
        solidityCallData[0],
        solidityCallData[1],
        solidityCallData[2],
        solidityCallData[3]
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
      // get balance before call function
      const beforeBalance = await owner.provider.getBalance(owner.address);
      // call forwarderContract's function from Relayer
      await callForwardMethodFromRelayer(otherAccount, forwarder, request);
      // get balance after call function
      const afterBalance = await owner.provider.getBalance(owner.address);
      // check
      expect(beforeBalance).to.equal(afterBalance);
    });
  });
});