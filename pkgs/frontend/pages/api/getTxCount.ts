import type { NextApiRequest, NextApiResponse } from 'next';

export type TxInfo = {
  blockNumber: string;
  timeStamp: string;
  hash:  string;
  nonce: string;
  blockHash:  string;
  transactionIndex:  string;
  from:  string;
  to:  string;
  value:  string;
  gas:  string;
  gasPrice:  string;
  isError:  string;
  txreceipt_status:  string;
  input:  string;
  contractAddress: string;
  cumulativeGasUsed:  string;
  gasUsed:  string;
  confirmations:  string;
  methodId:  string;
  functionName:  string;
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
  console.log("start");

  const body = req?.body;
  if (body === undefined) {
    return res.status(403).json({error: "Request has no body"});
  }

  console.log("body:", body);

  const SCROLLSCAN_API_KEY = process.env.SCROLLSCAN_API_KEY;
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

  console.log("request URL:", url);

  try {
    // call API
    const response = await fetch(url);
    const response2 = await fetch(url2);

    if (response.ok && response2.ok) {
      const data: any = await response.json();
      const result: TxInfo[] = data.result;

      const normalTxs: TxInfo[] = result;
      // get normal tx
      const filteredNormalTxs: any[] = normalTxs.filter((item:TxInfo) => item.to.toLocaleLowerCase() == address.toLocaleLowerCase())

      const data2: any = await response2.json();
      const result2: TxInfo[] = data2.result;
      const internalTxs: TxInfo[] = result2;
      // get internal tx
      const filteredInternalTxs: any[] = internalTxs.filter((item:TxInfo) => item.to.toLocaleLowerCase() == address.toLocaleLowerCase())

      res.setHeader("Content-Type", "text/json");
      res.status(200).json({
        txCount: filteredNormalTxs.length + filteredInternalTxs.length,
        txs: result,
        internalTxs: filteredInternalTxs
      })
    } else {
      console.error('Failed getTxCount Status:', response.status);
      res.setHeader("Content-Type", "text/json");
      res.status(501).json({
        txCount: 0,
        txs: [],
        internalTxs: []
      })
    }
  } catch (error) {
    console.error('Error getTxCount :', error);
    res.setHeader("Content-Type", "text/json");
    res.status(501).json({
      txCount: 0,
      txs: [],
      internalTxs: []
    })
  }
}