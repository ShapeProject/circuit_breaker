// pages/api/encrypt.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { writeFile } from 'fs/promises'; // Node.js 14以降で利用可能
import path from 'path';
import { initializeSeal } from '../../utils/sealInitialize'; // SEALの初期化関数を別ファイルに分離

type EncryptResponseData = {
  cipherText1?: string; // 暗号文を文字列として返す
  cipherText2?: string; // 暗号文を文字列として返す
  error?: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<EncryptResponseData>) {
  if (req.method === 'POST') {
    try {
      const { encryptor, batchEncoder, decryptor } = await initializeSeal();
      const { number1, number2 } = req.body;
      console.log('number1:', number1);
      console.log('number2:', number2);

      // 数値を暗号化
      const encodedNumber1 = batchEncoder.encode(Int32Array.from([number1]));
      const encodedNumber2 = batchEncoder.encode(Int32Array.from([number2]));

      const cipherText1 = encryptor.encrypt(encodedNumber1);
      const cipherText2 = encryptor.encrypt(encodedNumber2);
      const cipherTextBase64_1 = cipherText1.save(); // 暗号文をBase64文字列として保存
      const cipherTextBase64_2 = cipherText2.save(); // 暗号文をBase64文字列として保存


      // // テスト的に暗号文を復号化して数値を取得
      // const decodedResult1 = decryptor.decrypt(cipherTextBase64_1);
      // const decodedResult2 = decryptor.decrypt(cipherTextBase64_2);
      // // console.log('decodedResult1:', decodedResult1);
      // // console.log('decodedResult2:', decodedResult2);
      // const result1 = batchEncoder.decode(decodedResult1);
      // const result2 = batchEncoder.decode(decodedResult2);
      // console.log('result1:', result1)
      // console.log('result2:', result2)

      // ファイルに保存するパスを定義
      const filePath1 = path.join(process.cwd(), 'data', 'cipherText1.txt');
      const filePath2 = path.join(process.cwd(), 'data', 'cipherText2.txt');

      // ファイルに暗号文を非同期で書き込む
      await writeFile(filePath1, cipherTextBase64_1, 'utf8');
      await writeFile(filePath2, cipherTextBase64_2, 'utf8');

      res.status(200).json({ cipherText1: cipherTextBase64_1, cipherText2: cipherTextBase64_2 });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
