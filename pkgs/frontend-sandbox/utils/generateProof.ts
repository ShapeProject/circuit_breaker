import axios, { AxiosRequestConfig } from 'axios';

export const generateProof = async(): Promise<any> => {
  
  const config: AxiosRequestConfig = {
    headers: {
      "Content-Type": "application/json",
    }
  }

  const data = {
    "totalScore": 350, 
      "totalEvaluater": 6
  }
  const res = await axios.post("/api/generateProof", data, config);

  const proofs = await res.data.json()
  return proofs
}