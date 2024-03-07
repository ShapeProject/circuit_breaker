// pages/api/get-keys.js
const AWS = require('aws-sdk');
// import jwt from 'jsonwebtoken'; // JWTを使用する場合

AWS.config.update({
    accessKeyId: process.env.NEXT_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.NEXT_AWS_SECRET_ACCESS_KEY,
    region: process.env.NEXT_AWS_REGION,
});

const dynamoDb = new AWS.DynamoDB.DocumentClient();
const kms = new AWS.KMS();

export default async function getKey(req: any, res: any) {
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
      const { Item } = await dynamoDb.get(params).promise();
      if (!Item) throw new Error('Item not found');

      // KMSを使用してデータを復号化
      const decrypted = await kms
        .decrypt({ CiphertextBlob: Buffer.from(Item.encryptedData, 'base64') })
        .promise();
      const decryptedString = decrypted.Plaintext.toString('utf-8');
      console.log(JSON.parse(decryptedString));

      res.status(200).json(JSON.parse(decryptedString));
    } catch (error: any) {
      res.status(403).json({ error: 'Forbidden', details: error.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
