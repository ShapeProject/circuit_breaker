// pages/api/add.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import SEAL from 'node-seal';

type ResponseData = {
  result?: number[];
  error?: string;
}

const initializeSeal = async () => {
  const seal = await SEAL();
  const schemeType = seal.SchemeType.bfv;
  const securityLevel = seal.SecurityLevel.tc128;
  const polyModulusDegree = 4096;
  const bitSizes = [36, 36, 37];
  const bitSize = 20;

  const encParms = seal.EncryptionParameters(schemeType);
  encParms.setPolyModulusDegree(polyModulusDegree);
  encParms.setCoeffModulus(seal.CoeffModulus.Create(polyModulusDegree, Int32Array.from(bitSizes)));
  encParms.setPlainModulus(seal.PlainModulus.Batching(polyModulusDegree, bitSize));

  const context = seal.Context(encParms, true, securityLevel);
  if (!context.parametersSet()) {
    throw new Error('Could not set the parameters in the given context. Please try different encryption parameters.');
  }

  const keyGenerator = seal.KeyGenerator(context);
  const publicKey = keyGenerator.createPublicKey();
  const secretKey = keyGenerator.secretKey();
  const encryptor = seal.Encryptor(context, publicKey);
  const decryptor = seal.Decryptor(context, secretKey);
  const evaluator = seal.Evaluator(context);
  const batchEncoder = seal.BatchEncoder(context);

  return { seal, encryptor, decryptor, evaluator, batchEncoder };
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
  if (req.method === 'POST') {
    try {
      const { seal, encryptor, decryptor, evaluator, batchEncoder } = await initializeSeal();
      const { number1, number2 } = req.body;

      // 2つの数値を暗号化
      const encodedNumber1 = batchEncoder.encode(Int32Array.from([number1]));
      const cipherText1 = encryptor.encrypt(encodedNumber1);

      const encodedNumber2 = batchEncoder.encode(Int32Array.from([number2]));
      const cipherText2 = encryptor.encrypt(encodedNumber2);

      // 加算
      const cipherResult = seal.CipherText();
      evaluator.add(cipherText1, cipherText2, cipherResult);
      
      console.log('cipherText1:', cipherText1);
      console.log('cipherResult:', cipherResult);

      // 復号
      const decodedResult = decryptor.decrypt(cipherResult);
      console.log('decodedResult:', decodedResult);
      const result = batchEncoder.decode(decodedResult);
      console.log('result:', result);

      res.status(200).json({ result: Array.from(result) });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
