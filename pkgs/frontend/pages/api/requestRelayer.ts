import ScoreValutForwarderJson from "@/contracts/mock/ScoreValutForwarder.sol/ScoreVaultForwarder.json";
import { ScoreVaultForwarder } from "@/contracts/typechain-types";
import { FORWARDER_CONTRACT_ADDRESS } from "@/utils/contants";
import {
  DefenderRelayProvider,
  DefenderRelaySigner,
} from "@openzeppelin/defender-relay-client/lib/ethers";
import { Contract } from "ethers";
import type { NextApiRequest, NextApiResponse } from 'next';

/**
 * get Relayer method
 */
const getRelayer = async() => {
  const credentials: any = {
    apiKey: process.env.DEFENDER_API_KEY,
    apiSecret: process.env.DEFENDER_SECRET_KEY
  };

  const ozProvider = new DefenderRelayProvider(credentials);
  const ozSigner = new DefenderRelaySigner(credentials, ozProvider, {
    speed: "fast",
  });

  return ozSigner;
}

/**
 * getTxCount API
 * @param req 
 * @param res 
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log(" ========================================= [RequestRaler: START] ==============================================");

  const body = req?.body;
  if (body === undefined) {
    return res.status(403).json({error: "Request has no body"});
  }

  console.log("body:", body);

  // get data from request body 
  const request = body.requestData;
  // get relayer
  const relayer: any = await getRelayer();
  // create forwarder contract instance
  const forwarder: ScoreVaultForwarder = (new Contract(FORWARDER_CONTRACT_ADDRESS, ScoreValutForwarderJson.abi, relayer)) as any;
 
  try {
    // call verify method
    const result = await forwarder.verify(request);
    if(!result) throw "invalid request data!";

    // call execute method from relayer
    await forwarder.execute(request);

    console.log(" ========================================= [RequestRaler: END] ==============================================");
    res.setHeader("Content-Type", "text/json");
    res.status(200).json({
      result: "ok"
    })
  } catch (error) {
    console.error('Error getTxCount :', error);
    console.log(" ========================================= [RequestRaler: END] ==============================================");
    res.setHeader("Content-Type", "text/json");
    res.status(501).json({
      result: "failed"
    })
  }
}