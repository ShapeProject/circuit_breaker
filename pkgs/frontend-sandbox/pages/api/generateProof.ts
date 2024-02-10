// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import path from "path";
import snarkjs from 'snarkjs';

/**
 * geneateProof API
 * @param req 
 * @param res 
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log("start");

  const body = req?.body;
  if (body === undefined) {
    return res.status(403).json({error: "Request has no body"});
  }
  console.log("body:", body);

  const totalScore = body.totalScore;
  const totalEvaluater = body.totalEvaluater;

  // file paths
  const INPUT_FILE_PATH = path.join(process.cwd(), '"./zk/mock/input.json"');
  const WASM_FILE_PATH = path.join(process.cwd(), '"./zk/mock/circuit.wasm"');
  const ZKEY_FILE_PATH = path.join(process.cwd(), '"./zk/mock/zkey.zkey"');
  // input data
  // const inputFile: any = fs.readFileSync(INPUT_FILE_PATH)
  // const inputData = JSON.parse(inputFile);
  const inputData = {
    totalScore,
    totalEvaluater
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
  console.log("OK")
  // generate callData for Verifier Contract
  const callData = await snarkjs.groth16.exportSolidityCallData(proof, publicSignals);
  // convert
  const solidityCallData = JSON.parse(`[${callData}]`);

  res.setHeader("Content-Type", "text/json");
  res.status(200).json({
    a: solidityCallData[0],
    b: solidityCallData[1],
    c: solidityCallData[2],
    input: solidityCallData[3]
  })
}
