import { ethers } from 'hardhat';

/**
 * Verify test script
 */
async function main() {
  console.log(` ============================================== [Verify:start] ================================================ `)
  // get Verifier address
  const ADDRESS = "0xfFC2535688c5C053CF6E4C1B9452Fa14c092fe45"; // Scroll Sepolia
  // Get NFT Contract
  const verifier = await ethers.getContractAt('MockVerifier', ADDRESS);
 
  const tx = await verifier.verifyProof(
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
  console.log("result:", tx.valueOf())
  console.log(` =============================================== [Verify:end]  =============================================== `)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})