import path from "path";
const snarkjs = require('snarkjs');

/**
 * generateProof method
 * @param input0 
 * @param input1 
 * @returns 
 */
export const generateProof = async (
  input0: any,
  input1: any
): Promise<any> => {
  // file paths
  const WASM_FILE_PATH = path.join(process.cwd(),'zk/mock/circuit.wasm');
  const ZKEY_FILE_PATH = path.join(process.cwd(),'zk/mock/zkey.zkey');

  const inputData = {
    "totalScore": input0,
    "totalEvaluater": input1
  }
  
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
  console.log("solidityCallData:", solidityCallData)
  return solidityCallData;
}