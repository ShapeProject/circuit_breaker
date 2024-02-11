import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import fs from "fs";
import { ethers } from "hardhat";
import * as snarkjs from "snarkjs";
import {
  MockVerifier,
  MockVerifier__factory,
  ScoreVault,
  ScoreVault__factory
} from "../../typechain-types";

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

    // deploy verifier & ScoreValut contract
    const Verifier: MockVerifier__factory = await ethers.getContractFactory("MockVerifier");
    const verifier: MockVerifier = await Verifier.deploy();
    const ScoreVault: ScoreVault__factory = await ethers.getContractFactory("ScoreVault");
    const scoreVault: ScoreVault = await ScoreVault.deploy(verifier.target);
  
    return {
      owner,
      otherAccount,
      verifier,
      scoreVault
    };
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
      await scoreVault.setScore(sampleCount, sampleData);
      // get score data 
      const result = await scoreVault.getScore(owner.address);
      // check
      expect(parseInt(result[0].toString(), 16)).to.equal(sampleCount);
      expect(result[1]).to.equal(sampleData);
    });

    it("verify proof", async function () {
      // deploy contract
      const { scoreVault } = await loadFixture(deployContract);

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
});