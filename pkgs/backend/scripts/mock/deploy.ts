import { ethers } from 'hardhat';

/**
 * deploy MockVerifier contract script
 */
async function main() {
  console.log(` ============================================== [start] ================================================ `)

  // verifier deploy
  const verifier = await ethers.deployContract('MockVerifier');
  await verifier.waitForDeployment();
  console.log(` MockVerifier deployed to ${verifier.target}`);

  console.log(` =============================================== [end]  =============================================== `)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})