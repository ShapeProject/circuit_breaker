import SEAL from 'node-seal';
import { saveKeys, loadKeys } from './sealFunctions';

export async function initializeSeal() {
    if (!process.env.POLY_MODULUS_DEGREE || !process.env.COEFF_MODULUS_SIZES || !process.env.PLAIN_MODULUS_SIZE) {
        throw new Error('Environment variables for SEAL configuration are not set properly.');
      }
  // node-seal ライブラリのインスタンスを非同期で初期化
  const seal = await SEAL();

  // 暗号スキームのタイプを BFV に設定
  const schemeType = seal.SchemeType.bfv;

  // セキュリティレベルを 128 ビットに設定
  const securityLevel = seal.SecurityLevel.tc128;

  // ポリモジュラス次数を設定
  const polyModulusDegree = parseInt(process.env.POLY_MODULUS_DEGREE, 10);
  // 係数モジュラスのビットサイズを設定
  const bitSizes = process.env.COEFF_MODULUS_SIZES.split(',').map(Number);
  // 平文モジュラスのビットサイズを設定
  const bitSize = parseInt(process.env.PLAIN_MODULUS_SIZE, 10);

  // 暗号化パラメータの設定
  const encParms = seal.EncryptionParameters(schemeType);
  encParms.setPolyModulusDegree(polyModulusDegree);
  encParms.setCoeffModulus(seal.CoeffModulus.Create(polyModulusDegree, Int32Array.from(bitSizes)));
  encParms.setPlainModulus(seal.PlainModulus.Batching(polyModulusDegree, bitSize));

  // 暗号化パラメータを使用して暗号化コンテキストを生成
  const context = seal.Context(encParms, true, securityLevel);

  // コンテキストのパラメータが正しく設定されたかを確認
  if (!context.parametersSet()) {
    throw new Error('Could not set the parameters in the given context. Please try different encryption parameters.');
  }

  // 鍵生成器を生成
//   const keyGenerator = seal.KeyGenerator(context);
  
  // 公開鍵と秘密鍵を生成
//   const publicKey = keyGenerator.createPublicKey();
//   const secretKey = keyGenerator.secretKey();
//   console.log('publicKey:', publicKey);
  // 既存の鍵を読み込む試み
// 既存の鍵を試しに読み込む

let keys = await loadKeys(seal, context);
if (!keys) {
  const keyGenerator = seal.KeyGenerator(context);
  let publicKey = keyGenerator.createPublicKey();
  let secretKey = keyGenerator.secretKey();

  await saveKeys(publicKey, secretKey);

  // 保存した鍵を再読み込み
  keys = await loadKeys(seal, context);
  if (!keys) {
    throw new Error('鍵の保存後の読み込みに失敗しました。');
  }
}

// この時点で keys は null ではないことが保証されています
// TypeScriptの非nullアサーション演算子(!)を使用して、nullではないことを明示
const publicKey = keys.publicKey;
const secretKey = keys.secretKey;

const encryptor = seal.Encryptor(context, publicKey);
const decryptor = seal.Decryptor(context, secretKey);

  // 評価器（暗号文同士の演算を行うためのオブジェクト）を生成
  const evaluator = seal.Evaluator(context);

  // バッチエンコーダー（複数の数値を一つの暗号文にエンコード・デコードするためのオブジェクト）を生成
  const batchEncoder = seal.BatchEncoder(context);

  // 必要なインスタンスを返す
  return { seal, encryptor, decryptor, evaluator, batchEncoder, publicKey, secretKey, context };
}
