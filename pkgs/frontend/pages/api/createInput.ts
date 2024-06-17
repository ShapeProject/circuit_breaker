import axios from 'axios'

export default async function handler(req: any, res: any) {
  if (req.method === 'POST') {
    const { totalScore, totalEvaluater, lineNumber, name } = req.body;

    // aws取得
    const getKeyRes = await axios.post(`${process.env.BACKEND_API_URL}/getKey`, {
      name
    });
    const privateKeyData = JSON.parse(getKeyRes.data);
    const { lambda: decriptionKeyLambda, mu: decriptionKeyMu, publicKey:publicKey } = privateKeyData;
    const { n: encryptionKeyN } = publicKey;

    const responseObject = {
      totalScore,
      totalEvaluater,
      lineNumber,
      encryptionKeyN,
      decriptionKeyLambda,
      decriptionKeyMu
    };

    res.status(200).json(responseObject);
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
