// pages/api/decrypt.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { initializeSeal } from '../../utils/sealInitialize'; // 同じくSEALの初期化関数を使用
import { readFile } from 'fs/promises';
import path from 'path';

type DecryptResponseData = {
  number?: number; // 復号化された数値を返す
  error?: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<DecryptResponseData>) {
  if (req.method === 'POST') {
    try {
      const { decryptor, batchEncoder, seal, context} = await initializeSeal();
    //   const { cipherText } = req.body; // 暗号文をBase64文字列として受け取る

    // ファイルから暗号文を読み込む
    const filePath = path.join(process.cwd(), 'data', 'accumulatedCipherText.txt');
    const cipherTextBase64 = await readFile(filePath, 'utf8');
    
    //   console.log('cipherTextBase64:', cipherTextBase64); // cipherText の値を確認

      // 暗号文をロード
      const cipherTextLoad = seal.CipherText(); // 修正点: sealオブジェクトを使用してCipherTextインスタンスを生成
      cipherTextLoad.load(context, cipherTextBase64); // 修正点: コメントアウトを解除し、正しいコンテキストと暗号文をloadメソッドに渡す
      
      // 復号化
      const decodedResult = decryptor.decrypt(cipherTextLoad);
    //   console.log('decodedResult:', decodedResult);
      const resultArray = batchEncoder.decode(decodedResult);
      const number = resultArray[0]; // 復号化された数値を取得

      res.status(200).json({ number });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
