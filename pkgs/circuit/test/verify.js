const snarkjs = require("snarkjs");
const fs = require("fs");

/**
 * verify test code
 */
async function main() {
 
  const WASM_PATH = "./ComputeRating_js/ComputeRating.wasm";
  const ZKEY_PATH = "./zkey/ComputeRating_final.zkey";
  const VKEY_PATH = "./zkey/verification_key.json"
  // input data
  const inputData = JSON.parse(fs.readFileSync("./data/input.json"));
  
  // generate proof
  const { 
    proof, 
    publicSignals 
  } = await snarkjs.groth16.fullProve(
    inputData, 
    WASM_PATH, 
    ZKEY_PATH
  );

  console.log("Proof: ");
  console.log(JSON.stringify(proof, null, 1));

  const vKey = JSON.parse(fs.readFileSync(VKEY_PATH));
  // verify
  const res = await snarkjs.groth16.verify(vKey, publicSignals, proof);

  if (res === true) {
    console.log("Verification OK");
  } else {
    console.log("Invalid proof");
  }
}

main().then(() => {
  process.exit(0);
});