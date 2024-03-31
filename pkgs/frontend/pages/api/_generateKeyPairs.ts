// pages/api/encrypt.js
import { writeFile } from 'fs/promises';
import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
import * as paillierBigint from 'paillier-bigint';
import path from 'path';

// Helper function to convert BigInt properties in objects to JSON-compatible strings.
function bigintToJson(key: any) {
    return JSON.stringify(key, (key, value) =>
        typeof value === 'bigint' ? value.toString() : value
    );
}

// API endpoint to generate Paillier public and private key pairs and save them to files.
export default async function generateKeyPairs(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        try {
            const { name } = req.body;
            const keyLength = Number(process.env.KEY_LENGTH) || 1024;
            console.log('Key Length:', keyLength); 

            // Validate if the name is provided in the request body.
            if (!name) {
                return res.status(400).json({ error: 'Bad Request. Please provide your name!' });
            }

            // Generate Paillier key pairs with 128-bit security level. Note: For production environments, 
            // it's recommended to handle key generation and storage in a separate, secure process.
            const { publicKey, privateKey } = await paillierBigint.generateRandomKeys(keyLength);

            // 鍵のローカル保存
            // Define file paths for saving the public and private keys.
            const pubKeyPath = path.join(process.cwd(), 'data', `${name}-publicKey.json`);
            const priKeyPath = path.join(process.cwd(), 'data', `${name}-privateKey.json`);
            // Asynchronously write the keys to their respective files in JSON format.
            await writeFile(pubKeyPath, bigintToJson(publicKey), 'utf8');
            await writeFile(priKeyPath, bigintToJson(privateKey), 'utf8');

            // 鍵のAWS保存
            const keyRes = await axios.post(`${process.env.NEXT_BACKEND_API_URL}/saveKey`, {
                name,
                key: bigintToJson(privateKey),
              });
              console.log("keyRes", keyRes)

            // Respond with a success message once keys are generated and saved.
            res.status(200).json({
                message: "Keys were generated and saved successfully.",
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    } else {
        // If the request method is not POST, inform the client that only POST is allowed.
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
