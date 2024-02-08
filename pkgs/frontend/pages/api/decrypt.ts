// pages/api/decrypt.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { initializeSeal } from '../../utils/sealInitialize';
import { readFile } from 'fs/promises';
import path from 'path';

type DecryptResponseData = {
  number?: number;
  error?: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<DecryptResponseData>) {
  if (req.method === 'POST') {
    try {
      const { decryptor, batchEncoder, seal, context} = await initializeSeal();

    // ファイルから暗号文を読み込む
    const filePath = path.join(process.cwd(), 'data', 'accumulatedCipherText.txt');
    const cipherTextBase64 = await readFile(filePath, 'utf8');

      // 暗号文をロード
      const cipherTextLoad = seal.CipherText();
      cipherTextLoad.load(context, cipherTextBase64);
      
      // 復号化
      const decodedResult = decryptor.decrypt(cipherTextLoad);
      // decodedResultがvoidでないことを確認
      if (!decodedResult) {
          throw new Error('Decryption failed');
      }
      const resultArray = batchEncoder.decode(decodedResult);
      const number = resultArray[0];

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
