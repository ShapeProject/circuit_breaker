// pages/api/decrypt.js
import type { NextApiRequest, NextApiResponse } from 'next'
import * as paillierBigint from 'paillier-bigint';
import * as bcu from 'bigint-crypto-utils';
import { readFile } from 'fs/promises';
import path from 'path';

export default async function decrypt(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
        const { encNum, name } = req.body;
        const encrypted = BigInt(encNum);
  
        // 秘密キーのファイルパスを取得
        const priKeyPath = path.join(process.cwd(), 'data', `${name}-privateKey.json`);
        const pubKeyPath = path.join(process.cwd(), 'data', `${name}-publicKey.json`);
  
        // 公開キーをファイルから読み込む
        const privateKeyJson = await readFile(priKeyPath, 'utf8');
        const privateKeyObj = JSON.parse(privateKeyJson);

              // 公開キーをファイルから読み込む（復号化には公開キーのnが必要です）
      const publicKeyJson = await readFile(pubKeyPath, 'utf8');
      const publicKeyObj = JSON.parse(publicKeyJson);

            // 秘密キーと公開キーをデシリアライズする
            const publicKey = new paillierBigint.PublicKey(
                BigInt(publicKeyObj.n),
                BigInt(publicKeyObj.g)
              );
              const privateKey = new paillierBigint.PrivateKey(
                BigInt(privateKeyObj.lambda),
                BigInt(privateKeyObj.mu),
                publicKey
              );
  
    const decrypted = privateKey.decrypt(encrypted);
      
    res.status(200).json({
        decrypted: decrypted.toString(),
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
