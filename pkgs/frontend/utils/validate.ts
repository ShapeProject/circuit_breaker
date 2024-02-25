import { ethers } from "ethers";

/**
 * 渡された値が数字でありかつ0~99の値であることをチェックするロジック
 * 0なら問題なし
 * 1なら数字以外が入力されている
 * 2なら範囲外の数字が入力されている
 */
export const validateInputNumber = (
  inputdata: any
) => {
  
  const result1 = /^[0-9]+$/.test(inputdata);
  if (!result1) return 1;

  const result2 = (Number(inputdata) >= 0 && Number(inputdata) <= 99);
  if (!result2) return 2;

  return 0;
}

/**
 * 入力された値が数字かどうか判定する
 * 0なら問題なし
 * 1なら数字以外が入力されている
 */
export const validateVerifyInputNubmer = (
  inputdata: any
) => {
  const result1 = /^[0-9]+$/.test(inputdata);
  if (!result1) return 1;

  return 0;
}

/**
 * 入力された値がウォレットアドレスか判定する。
 * trueなら問題なし
 */
export const validateVerifyInputAddress = (
  inputdata: any
) => {
  return ethers.isAddress(inputdata)
}