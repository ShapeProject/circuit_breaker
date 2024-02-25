const AWS = require('aws-sdk');

// AWSの認証情報を設定
AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
});

const dynamoDb = new AWS.DynamoDB.DocumentClient();
const kms = new AWS.KMS();

export default async function saveKey(req: any, res: any) {
    if (req.method === 'POST') {
        try {
            const { key, name } = req.body;
            const keyBuffer = Buffer.from(JSON.stringify(key));
            const encryptedKey = await kms.encrypt({
                KeyId: 'alias/alpha-score-key', // KMSキーのエイリアス、ARN、またはIDを指定
                Plaintext: keyBuffer,
            }).promise();

            const params = {
                TableName: 'alpha-scoreDB',
                Item: {
                name: name,
                encryptedData: encryptedKey.CiphertextBlob.toString('base64'),
                },
            };

            await dynamoDb.put(params).promise();
            console.log('Data saved successfully.');
            res.status(200).json({data: "ok"})
        } catch (error: any) {
            res.status(403).json({ error: 'Forbidden', details: error.message });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}

