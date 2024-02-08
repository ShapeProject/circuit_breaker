// pages/api/paillier.js
import type { NextApiRequest, NextApiResponse } from 'next'
import * as paillierBigint from 'paillier-bigint';
import * as bcu from 'bigint-crypto-utils';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      // リクエストボディから数値を取得
      const { number1, number2 } = req.body;
      const m1 = BigInt(number1);
      const m2 = BigInt(number2);

      // Paillier鍵ペアの生成
      // const { publicKey, privateKey } = await paillierBigint.generateRandomKeys(2048);
      const { publicKey, privateKey } = await paillierBigint.generateRandomKeys(128);
      function bigintReplacer(key: any, value: any) {
        if (typeof value === 'bigint') {
          return value.toString();
        } else {
          return value;
        }
      }
      
      console.log('# private_key  ');
      console.log(JSON.stringify(privateKey, bigintReplacer, 2));
      console.log('\n');

      console.log('#  public_key  ');
      console.log(JSON.stringify(publicKey, bigintReplacer, 2));
      console.log('\n')
      
      // 数値の暗号化
      const c1 = publicKey.encrypt(m1);
      const c2 = publicKey.encrypt(m2);

      // 暗号化された数値の準同型加算
      const encryptedSum = publicKey.addition(c1, c2);
      console.log(encryptedSum.toString());
      console.log('\n')

      // 復号化
      console.log('# decrypted m1+m2  ')
      const lambda = privateKey.lambda;
      const n = publicKey.n;
      const nn = publicKey._n2;
      const mu = privateKey.mu;
      const denom = (bcu.modPow(encryptedSum, lambda, nn) - 1n) / n;
      const m = denom * mu % n;
      console.log(m.toString())

      // 結果をJSONとして返す
      res.status(200).json({
        sum: m.toString(),
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    // POSTメソッド以外は許可しない
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
