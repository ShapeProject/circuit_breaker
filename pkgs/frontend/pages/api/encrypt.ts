// pages/api/encrypt.js
import type { NextApiRequest, NextApiResponse } from 'next'
import * as paillierBigint from 'paillier-bigint';
import { readFile } from 'fs/promises';
import path from 'path';

export default async function encrypt(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
        const { num, name } = req.body;
        const m = BigInt(num);
  
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
  
        // 数値を暗号化
        const encrypted = publicKey.encrypt(m);
      res.status(200).json({
        encrypted: encrypted.toString(),
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
