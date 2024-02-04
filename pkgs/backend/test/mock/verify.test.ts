import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";
import {
  MockVerifier,
  MockVerifier__factory,
} from "../../typechain-types";


describe("MockVerifier", function () {
 
  /**
   *  Verifier deploy function
   * @returns
   */
  async function deployContract() {
    const [owner, otherAccount] = await ethers.getSigners();

    // deploy verifier contract
    const Verifier: MockVerifier__factory = await ethers.getContractFactory("MockVerifier");
    const verifier: MockVerifier = await Verifier.deploy();
  
    return {
      owner,
      otherAccount,
      verifier
    };
  }
  
  describe("Mock Verifier", function () {
    it("verify proof", async function () {
      // deploy contract
      const { verifier } = await loadFixture(deployContract);
      // verify & Mint NFT
      const result = await verifier.verifyProof(
        [
          "0x21dd170b9f3f6e07ac843245ad126df0e5d483a11189634af9c3f6332c20c718", 
          "0x0c694227b621c1b231548795dd119dc4ad63e6a361c1075d81e7630da13fc96d"
        ],[
          [
            "0x3007930b71aa37567e88d9dc84d2b324cc09bbb8d203fefe37a04ca83e78b2bb", 
            "0x09305ded2c52c61d91dae25f3d35d9f1e749e3214760dd72e6196fd08c01a0da"
          ],[
            "0x28dbf94ade7a100d948c54b856e13a26862a1824725ee9fc1d3f2f7106000643", 
            "0x095677b2c0688931ec1fd37f9f9ca8d76cbaeedd28209203e79323ee4c8db30f"
          ]
        ],
        [
          "0x2f9dce209936fffdf4a8e3d5fdccaafaf148054525b48c90f0e8279008369ab1", 
          "0x19c36c806927a7706612319b54137e7072601281a140897ee58f3902017d78f7"
        ],[
          "0x000000000000000000000000000000000000000000000000000000000000003a",
          "0x0000000000000000000000000000000000000000000000000000000000000003"
        ]
      );
      // check initial data
      expect(true).to.eql(result);
    });
  });
});