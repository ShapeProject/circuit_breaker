// pages/api/add.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { initializeSeal } from '../../utils/sealInitialize';
import { readFile } from 'fs/promises';
import path from 'path'
import { writeFile } from 'fs/promises';

type AddResponseData = {
  cipherText?: string;
  error?: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<AddResponseData>) {
  if (req.method === 'POST') {
    try {
      const { evaluator, encryptor, decryptor, batchEncoder, seal, context } = await initializeSeal();

    // ファイルから暗号文を読み込む
    const filePath1 = path.join(process.cwd(), 'data', 'cipherText1.txt');
    const cipherTextBase64_1 = await readFile(filePath1, 'utf8')
    const filePath2 = path.join(process.cwd(), 'data', 'cipherText1.txt');
    const cipherTextBase64_2 = await readFile(filePath2, 'utf8')

    // 暗号文をロード
    const cipherTextLoad_1 = seal.CipherText();
    const cipherTextLoad_2 = seal.CipherText();
    cipherTextLoad_1.load(context, cipherTextBase64_1);
    cipherTextLoad_2.load(context, cipherTextBase64_2);
    
    // 加算
    const accumulatedCipherText = seal.CipherText();
    evaluator.add(cipherTextLoad_1, cipherTextLoad_2, accumulatedCipherText);

      // 加算結果の暗号文をBase64文字列として保存
      const cipherTextBase64 = accumulatedCipherText.save();
      const filePath = path.join(process.cwd(), 'data', 'accumulatedCipherText.txt');

      // ファイルに暗号文を非同期で書き込む
      await writeFile(filePath, cipherTextBase64, 'utf8')

      res.status(200).json({ cipherText: cipherTextBase64 });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
