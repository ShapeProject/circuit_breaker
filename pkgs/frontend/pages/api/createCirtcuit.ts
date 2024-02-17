import axios from 'axios';
import FormData from 'form-data';
import fs from 'fs';

export default async function handler(req: any, res: any) {
  if (req.method === 'POST') {
    // FormDataオブジェクトの作成
    const formData = new FormData();

    const filePath = 'パス/to/your/file.txt';
    formData.append('files', fs.createReadStream(filePath));

    // タグを追加
    formData.append('tags', 'タグ1');
    formData.append('tags', 'タグ2');

    // axiosのconfigにFormDataを設定
    const config = {
      method: 'post',
      url: 'https://sindri.app/api/v1/circuit/create',
      headers: { 
        ...formData.getHeaders(),
        'Authorization': `Bearer ${process.env.BEARER_TOKEN}`
      },
      data: formData,
      maxBodyLength: Infinity,
    };

    try {
      const response = await axios(config);
      console.log(JSON.stringify(response.data));
      res.status(200).json(response.data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
