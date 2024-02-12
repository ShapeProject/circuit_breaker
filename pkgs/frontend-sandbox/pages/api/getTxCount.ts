// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import 'dotenv/config';
import type { NextApiRequest, NextApiResponse } from 'next';

const { 
  SCROLLSCAN_API_KEY
 } = process.env

/**
 * getTxCount API
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

  const apiUrl = 'https://api-sepolia.scrollscan.com/api';
  const point = 'account';
  const action = 'txlist';
  const action2 = 'txlistinternal';
  const address = body.address;
  const startblock = 0;
  const endblock = 99999999;
  const page = 1;
  const offset = 10000;
  const sort = 'asc';

  const url = `${apiUrl}?module=${point}&action=${action}&address=${address}&startblock=${startblock}&endblock=${endblock}&page=${page}&offset=${offset}&sort=${sort}&apikey=${SCROLLSCAN_API_KEY}`;
  const url2 = `${apiUrl}?module=${point}&action=${action2}&address=${address}&startblock=${startblock}&endblock=${endblock}&page=${page}&offset=${offset}&sort=${sort}&apikey=${SCROLLSCAN_API_KEY}`;

  try {
    // call API
    const response = await fetch(url);
    const response2 = await fetch(url2);

    if (response.ok && response2.ok) {
      const data: any = await response.json();
      const filteredData: any = data.result.filter((item: any) => item.to === address);
      console.log('Normal Transaction data:', filteredData);
      console.log('Normal Transaction count:', filteredData.length);

      const data2: any = await response2.json();
      const filteredData2: any = data2.result.filter((item: any) => item.to === address);
      console.log('Internal Transaction data:', filteredData2);
      console.log('Internal Transaction count:', filteredData2.length);

      console.log(`Total Transaction count:${filteredData.length + filteredData2.length}`);

      res.setHeader("Content-Type", "text/json");
      res.status(200).json({
        txCount: filteredData.length + filteredData2.length
      })
    } else {
      console.error('Failed getTxCount Status:', response.status);
      res.setHeader("Content-Type", "text/json");
      res.status(501).json({
        txCount: 0
      })
    }
  } catch (error) {
    console.error('Error getTxCount :', error);
    res.setHeader("Content-Type", "text/json");
    res.status(501).json({
      txCount: 0
    })
  }
}
