// pages/api/encrypt.js
import type { NextApiRequest, NextApiResponse } from 'next'
import * as paillierBigint from 'paillier-bigint';
import { writeFile } from 'fs/promises';
import path from 'path';

function bigintToJson(key: any) {
    return JSON.stringify(key, (key, value) =>
        typeof value === 'bigint' ? value.toString() : value
    );
}
  
export default async function generateKeyPairs(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { name } = req.body

      if (!name) {
        return res.status(400).json({ error: 'Bad Request put your name!' });
      }

      const { publicKey, privateKey } = await paillierBigint.generateRandomKeys(128); // 本番環境では、キーの生成と保存を別のプロセスで行うべきです
      // ファイルに保存するパスを定義
      const pubKeyPath = path.join(process.cwd(), 'data', `${name}-publicKey.json`);
      const priKeyPath = path.join(process.cwd(), 'data', `${name}-privateKey.json`);

      // ファイルに暗号文を非同期で書き込む
      await writeFile(pubKeyPath, bigintToJson(publicKey), 'utf8');
      await writeFile(priKeyPath, bigintToJson(privateKey), 'utf8');

      res.status(200).json({
        message: "Keys were generated and saved successfully.",
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
