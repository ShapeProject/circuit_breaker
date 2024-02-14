// pages/api/add.js
import type { NextApiRequest, NextApiResponse } from 'next'
import * as paillierBigint from 'paillier-bigint';
import { readFile } from 'fs/promises';
import path from 'path'

export default async function add(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { encNum1, encNum2, name } = req.body;
      const c1 = BigInt(encNum1);
      const c2 = BigInt(encNum2);
      // 公開キーのファイルパスを取得
      const pubKeyPath = path.join(process.cwd(), 'data', `${name}-publicKey.json`);
  
      // 公開キーをファイルから読み込む
      const publicKeyJson = await readFile(pubKeyPath, 'utf8');
      const publicKeyObj = JSON.parse(publicKeyJson);

      // 公開キーをデシリアライズする
      const publicKey = new paillierBigint.PublicKey(
        BigInt(publicKeyObj.n),
        BigInt(publicKeyObj.g)
      );

      const encryptedSum = publicKey.addition(c1, c2);

      res.status(200).json({
        encryptedSum: encryptedSum.toString(),
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
