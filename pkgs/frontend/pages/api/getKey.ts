// pages/api/get-keys.js
const AWS = require('aws-sdk');
// import jwt from 'jsonwebtoken'; // JWTを使用する場合

AWS.config.update({
  accessKeyId: process.env.ACCESS_ID,
  secretAccessKey: process.env.SECRET_ID,
  region: process.env.REGION_ID,
});

const dynamoDb = new AWS.DynamoDB.DocumentClient();
const kms = new AWS.KMS();

export default async function getKey(req: any, res: any) {
  console.log('getKey', req.body);
  if (req.method === 'POST') {
    const { name } = req.body;
    //   // トークン認証（仮の実装）
    //   const token = req.headers.authorization?.split(' ')[1]; // Bearer トークン
    //   if (!token) {
    //     return res.status(401).json({ error: 'Unauthorized' });
    //   }

    try {
      // // トークンの検証
      // jwt.verify(token, process.env.JWT_SECRET);

      // KMSから鍵のリストを取得
      const params = {
        TableName: 'alpha-scoreDB',
        Key: { name: name },
      };
      console.log('params', params);
      const { Item } = await dynamoDb.get(params).promise();
      console.log('Item', Item.encryptedData);
      if (!Item) throw new Error('Item not found');

      // KMSを使用してデータを復号化
      const decrypted = await kms
        .decrypt({ CiphertextBlob: Buffer.from(Item.encryptedData, 'base64') })
        .promise();
      const decryptedString = decrypted.Plaintext.toString('utf-8');
      console.log(JSON.parse(decryptedString));
      console.log('decrypted', decrypted);
      // const decryptedString = decrypted.Plaintext.toString('utf-8');
      // console.log(JSON.parse(decryptedString))

      res.status(200).json(JSON.parse(decryptedString));
    } catch (error: any) {
      res.status(403).json({ error: 'Forbidden', details: error.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
