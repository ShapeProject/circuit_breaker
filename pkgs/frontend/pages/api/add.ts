// pages/api/add.js
import type { NextApiRequest, NextApiResponse } from 'next';
import * as paillierBigint from 'paillier-bigint';
import { readFile } from 'fs/promises';
import path from 'path';

// API endpoint to add two encrypted numbers using the Paillier cryptosystem.
export default async function add(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        try {
            // Extract the encrypted numbers and the user's name from the request body.
            const { encNum1, encNum2, name } = req.body;
            const c1 = BigInt(encNum1); // Convert the first encrypted number to BigInt.
            const c2 = BigInt(encNum2); // Convert the second encrypted number to BigInt.
            
            // Construct the file path for the public key based on the user's name.
            const pubKeyPath = path.join(process.cwd(), 'data', `${name}-publicKey.json`);
  
            // Read and parse the public key from its file.
            const publicKeyJson = await readFile(pubKeyPath, 'utf8');
            const publicKeyObj = JSON.parse(publicKeyJson);

            // Deserialize the public key from its JSON object.
            const publicKey = new paillierBigint.PublicKey(
                BigInt(publicKeyObj.n),
                BigInt(publicKeyObj.g)
            );

            // Use the public key to add the two encrypted numbers.
            const encryptedSum = publicKey.addition(c1, c2);

            // Respond with the result of the addition as an encrypted sum.
            res.status(200).json({
                encryptedSum: encryptedSum.toString(),
            });
        } catch (error) {
            // Log the error and respond with a 500 Internal Server Error status code if an exception occurs.
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    } else {
        // If the request method is not POST, set the Allow header to POST and respond with a 405 Method Not Allowed status code.
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
