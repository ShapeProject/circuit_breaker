// pages/api/encrypt.js
import { readFile } from 'fs/promises';
import type { NextApiRequest, NextApiResponse } from 'next';
import * as paillierBigint from 'paillier-bigint';
import path from 'path';

// API endpoint for encrypting a given number using the Paillier cryptosystem.
export default async function encrypt(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        try {
            // Extract the number to be encrypted and the user's name from the request body.
            const { num, name } = req.body;
            console.log("encrypt body", req.body)
            const m = BigInt(num);
  
            // Construct the file path for the public key based on the user's name.
            const pubKeyPath = path.join(process.cwd(), 'data', `${name}-publicKey.json`);
  
            // Read the public key from the file.
            const publicKeyJson = await readFile(pubKeyPath, 'utf8');
            const publicKeyObj = JSON.parse(publicKeyJson);
  
            // Deserialize the public key from the JSON object.
            const publicKey = new paillierBigint.PublicKey(
                BigInt(publicKeyObj.n),
                BigInt(publicKeyObj.g)
            );
  
            // Encrypt the provided number using the public key.
            const encrypted = publicKey.encrypt(m);

            // Respond with the encrypted number.
            res.status(200).json({
                encrypted: encrypted.toString(),
            });
        } catch (error) {
            // Log the error and respond with a 500 Internal Server Error status code.
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    } else {
        // If the request method is not POST, set the Allow header to POST and
        // respond with a 405 Method Not Allowed status code.
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
