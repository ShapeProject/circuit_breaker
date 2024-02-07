import { writeFile, readFile } from 'fs/promises';
import path from 'path';

// 鍵を保存する関数
export async function saveKeys(publicKey: any, secretKey: any) {
  const keys = {
    publicKey: publicKey.save(),
    secretKey: secretKey.save()
  };
  const filePath = path.join(process.cwd(), 'data', 'keys.json');
  await writeFile(filePath, JSON.stringify(keys), 'utf8');
}

// 鍵を読み込む関数
 export async function loadKeys(seal: any, context: any) {
  const filePath = path.join(process.cwd(), 'data', 'keys.json');
  try {
    const data = await readFile(filePath, 'utf8');
    const keys = JSON.parse(data);
    const publicKey = seal.PublicKey();
    const secretKey = seal.SecretKey();
    publicKey.load(context, keys.publicKey);
    secretKey.load(context, keys.secretKey);
    return { publicKey, secretKey };
  } catch (error) {
    console.error('Error loading keys:', error);
    return null;
  }
}
