// pages/api/submitProofInput.js
import axios from 'axios';
import qs from 'qs';
import { readFile } from 'fs/promises'
import path from 'path';

export default async function handler(req: any, res: any) {
  if (req.method === 'POST') {

    const circuit_id = process.env.CIRCUIT_ID;

    // input.jsonの動的な取得
    const { totalScore, totalEvaluater, lineNumber, name} = req.body;
    const createInputResponse = await axios.post(`${process.env.NEXT_BACKEND_API_URL}/createInput`, {
      name,
      totalScore,
      totalEvaluater,
      lineNumber,
    });
    const proofInputJson = createInputResponse.data;
    const proofInput = JSON.stringify(proofInputJson);

    // input.jsonの静的な取得
    // const { name } = req.body;
    // const inputPath = path.join(process.cwd(), 'data', `${name}-input.json`);
    // const proofInput = await readFile(inputPath, 'utf8');

    // qsを使用してproof_inputを文字列に変換
    const data = qs.stringify({
      'proof_input': proofInput
    });

    const config = {
      method: 'post',
      url: `https://sindri.app/api/v1/circuit/${circuit_id}/prove`,
      headers: { 
        'Content-Type': 'application/x-www-form-urlencoded', 
        'Accept': 'application/json', 
        'Authorization': `Bearer ${process.env.BEARER_TOKEN}`
      },
      data: data
    };

    // 外部APIにリクエストを送信
    try {
      const response = await axios(config);
      res.status(200).json(response.data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'An error occurred while submitting the proof input.' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end('Method Not Allowed');
  }
}
