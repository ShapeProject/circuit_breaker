import axios from 'axios';
import qs from 'qs';

export default async function handler(req: any, res: any) {
  if (req.method === 'POST') {
    const circuit_id = process.env.CIRCUIT_ID;
    const { totalScore, totalEvaluater, lineNumber, name} = req.body;
    const createInputResponse = await axios.post(`${process.env.BACKEND_API_URL}/createInput`, {
      name,
      totalScore,
      totalEvaluater,
      lineNumber,
    });
    const proofInputJson = createInputResponse.data;
    const proofInput = JSON.stringify(proofInputJson);
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
      const proofId = response.data.proof_id;
      const proofDetailResponse = await axios.post(`${process.env.BACKEND_API_URL}/getProofDetail`, { proof_id: proofId });
      const output = proofDetailResponse.data.public ? proofDetailResponse.data.public[0] : null;
      const isAbove = (output == "1") ? true : false;
      res.status(200).json({"isAbove": isAbove});
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'An error occurred while submitting the proof input.' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end('Method Not Allowed');
  }
}
