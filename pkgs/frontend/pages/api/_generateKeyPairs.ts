import { writeFile } from 'fs/promises';
import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
import * as paillierBigint from 'paillier-bigint';
import path from 'path';

function bigintToJson(key: any) {
    return JSON.stringify(key, (key, value) =>
        typeof value === 'bigint' ? value.toString() : value
    );
}

export default async function generateKeyPairs(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        try {
            const { name } = req.body;
            const keyLength = Number(process.env.KEY_LENGTH) || 1024;
            console.log('Key Length:', keyLength); 

            if (!name) {
                return res.status(400).json({ error: 'Bad Request. Please provide your name!' });
            }
            const { publicKey, privateKey } = await paillierBigint.generateRandomKeys(keyLength);

            // 鍵のローカル保存
            const pubKeyPath = path.join(process.cwd(), 'data', `${name}-publicKey.json`);
            const priKeyPath = path.join(process.cwd(), 'data', `${name}-privateKey.json`);
            await writeFile(pubKeyPath, bigintToJson(publicKey), 'utf8');
            await writeFile(priKeyPath, bigintToJson(privateKey), 'utf8');

            // 鍵のAWS保存
            const keyRes = await axios.post(`${process.env.BACKEND_API_URL}/saveKey`, {
                name,
                key: bigintToJson(privateKey),
              });
              console.log("keyRes", keyRes)
            res.status(200).json({
                message: "Keys were generated and saved successfully.",
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
