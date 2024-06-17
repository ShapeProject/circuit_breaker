import type { NextApiRequest, NextApiResponse } from 'next';
import * as paillierBigint from 'paillier-bigint';
import axios from 'axios';

export default async function decrypt(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        try {
            const { encNum, name } = req.body;
            const encrypted = BigInt(encNum);

            // aws取得
            const getKeyRes = await axios.post(`${process.env.BACKEND_API_URL}/getKey`, {
                name
            });
            const privateKeyData = JSON.parse(getKeyRes.data);
        
            const { lambda: decriptionKeyLambda, mu: decriptionKeyMu, publicKey:pubKey } = privateKeyData;

            const publicKey = new paillierBigint.PublicKey(
                    BigInt(pubKey.n),
                    BigInt(pubKey.g)
                );

            const privateKey = new paillierBigint.PrivateKey(
                    BigInt(privateKeyData.lambda),
                    BigInt(privateKeyData.mu),
                    publicKey
                );
            const decrypted = privateKey.decrypt(encrypted);
            res.status(200).json({
                decrypted: decrypted.toString(),
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
