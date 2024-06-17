import axios, { AxiosError } from 'axios';

export default async function handler(req: any, res: any) {
  if (req.method === 'POST') {
    const { proof_id } = req.body;
    const config = {
      method: 'get',
      url: `${process.env.SINDRI_API_ENDPOINT}/proof/${proof_id}/detail`,
      headers: { 
        'Accept': 'application/json',
        'Authorization': `Bearer ${process.env.BEARER_TOKEN}`
      }
    };

    try {
      await axios(config);
      let statusCheckResponse;
      let attempts = 0;
      const maxAttempts = 20; // 最大試行回数
      do {
        await new Promise(resolve => setTimeout(resolve, 5000)); // 5秒待機
        console.log('Checking proof status...')
        statusCheckResponse = await axios.get(`${process.env.SINDRI_API_ENDPOINT}/proof/${proof_id}/detail`, {
          headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${process.env.BEARER_TOKEN}`
          }
        });
        attempts++;
      } while (statusCheckResponse.data.status !== 'Ready' && attempts < maxAttempts);

      if (statusCheckResponse.data.status === 'Ready') {
        res.status(200).json(statusCheckResponse.data);
      } else {
        res.status(408).json({ message: 'Proof processing timed out or failed.' });
      }
    } catch (error) {
      const axiosError = error as AxiosError;
      res.status(500).json({ message: `An error occurred while getting the proof detail. ${axiosError}` });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
