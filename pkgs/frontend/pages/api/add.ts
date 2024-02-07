// pages/api/add.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { initializeSeal } from '../../utils/sealInitialize';
import { readFile } from 'fs/promises';
import path from 'path'
import { writeFile } from 'fs/promises'; // Node.js 14以降で利用可

type AddResponseData = {
  cipherText?: string; // 加算結果の暗号文を文字列として返す
  error?: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<AddResponseData>) {
  if (req.method === 'POST') {
    try {
      const { evaluator, encryptor, decryptor, batchEncoder, seal, context } = await initializeSeal();
    //   const { cipherTextBase64Array } = req.body; // 加算する暗号文の配列
    const filePath1 = path.join(process.cwd(), 'data', 'cipherText1.txt');
    const cipherTextBase64_1 = await readFile(filePath1, 'utf8')
    const filePath2 = path.join(process.cwd(), 'data', 'cipherText1.txt');
    const cipherTextBase64_2 = await readFile(filePath2, 'utf8')

    //   // 暗号文をロードし、加算
    //   const cipherTexts = cipherTextBase64Array.map(ctBase64 => {
    //     const cipherText = seal.CipherText();
    //     cipherText.load(decryptor.context, ctBase64);
    //     return cipherText;
    //   });
    const cipherTextLoad_1 = seal.CipherText(); // 修正点: sealオブジェクトを使用してCipherTextインスタンスを生成
    const cipherTextLoad_2 = seal.CipherText(); // 修正点: sealオブジェクトを使用してCipherTextインスタンスを生成
    cipherTextLoad_1.load(context, cipherTextBase64_1); // 修正点: コメントアウトを解除し、正しいコンテキストと暗号文をloadメソッドに渡す
    cipherTextLoad_2.load(context, cipherTextBase64_2); // 修正点: コメントアウトを解除し、正しいコンテキストと暗号文をloadメソッドに渡す
    

      // 最初の暗号文を基準に加算を行う
    //   let accumulatedCipherText = cipherTexts[0];
    //   for (let i = 1; i < cipherTexts.length; i++) {
    //     accumulatedCipherText = evaluator.add(accumulatedCipherText, cipherTexts[i]);
    //   }
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
