import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import fs from "fs";
import { ethers } from "hardhat";
import * as snarkjs from "snarkjs";

describe("ComputeRatingVerifier.test", function () {
  // file paths
  const INPUT_FILE_PATH = "./zk/mock/ComputeRatingVerifier/input.json";
  const WASM_FILE_PATH = "./zk/mock/ComputeRatingVerifier/circuit.wasm";
  const ZKEY_FILE_PATH = "./zk/mock/ComputeRatingVerifier/zkey.zkey";

  /**
   *  Verifier deploy function
   * @returns
   */
  async function deployContract() {
    const [owner, otherAccount] = await ethers.getSigners();

    // deploy verifier contract
    //const Verifier: ComputeRatingVerifier__factory = await ethers.getContractFactory("ComputeRatingVerifier");
    //const verifier: ComputeRatingVerifier = await Verifier.deploy();
  
    return {
      owner,
      otherAccount,
      // verifier
    };
  }
  
  describe("Mock ComputeRatingVerifier", function () {
    it("verify proof", async function () {
      // deploy contract
      const {  } = await loadFixture(deployContract);

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
      /*
      // verify & Mint NFT
      const result = await verifier.verifyProof(
        solidityCallData[0],
        solidityCallData[1],
        solidityCallData[2],
        solidityCallData[3]
      );
      // check initial data
      expect(true).to.eql(result);
      */
    });
  });
});