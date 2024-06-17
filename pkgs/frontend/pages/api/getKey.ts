const AWS = require('aws-sdk');

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
    try {
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
      res.status(200).json(JSON.parse(decryptedString));
    } catch (error: any) {
      res.status(403).json({ error: 'Forbidden', details: error.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
