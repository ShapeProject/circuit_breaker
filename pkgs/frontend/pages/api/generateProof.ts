import { generateProof } from '@/lib/geneateProof';
import type { NextApiRequest, NextApiResponse } from 'next';

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

  try {
    const body = req?.body;
  if (body === undefined) {
    return res.status(403).json({error: "Request has no body"});
  }
  console.log("body:", body);

  const totalScore = body.totalScore;
  const totalEvaluater = body.totalEvaluater;
  
  // convert
  const solidityCallData = await generateProof(350, 6);

  res.setHeader("Content-Type", "text/json");
  res.status(200).json({
    a: solidityCallData[0],
    b: solidityCallData[1],
    c: solidityCallData[2],
    input: solidityCallData[3]
  })
  
  } catch (error) {
    console.error('Error generateProof :', error);
    res.setHeader("Content-Type", "text/json");
    res.status(501).json({
      a: [],
      b: [],
      c: [],
      input: []
    })
  }
}
