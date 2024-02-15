import { ethers } from 'hardhat';

/**
 * deploy MockVerifier contract script
 */
async function main() {
  console.log(` ============================================== [start] ================================================ `)

  // verifier deploy
  /*
  const verifier = await ethers.deployContract('MockVerifier');
  await verifier.waitForDeployment();
  console.log(` MockVerifier deployed to ${verifier.target}`);

  // forwarder deploy
  const Forwarder = await ethers.getContractFactory("ScoreVaultForwarder");
  const forwarder = await Forwarder.deploy();

  console.log(` ScoreVaultForwarder deployed to ${forwarder.target}`);
  */

  // ScoreValut deploy
  const ScoreVault = await ethers.getContractFactory("ScoreVault");
  const scoreVault = await ScoreVault.deploy("0x819cb57caeee4d4d10dd583ffae5df4094ebb069", "0x3140a4156db3a4077c41c2bcb22cc02ba407f0b5");
  console.log(` ScoreValut deployed to ${scoreVault.target}`);

  console.log(` =============================================== [end]  =============================================== `)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})