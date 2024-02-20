import Input from "@/components/input/input";
import Loading from "@/components/loading";
import { NavigationSidebar } from "@/components/navigation/navigationSidebar";
import ScoreValutForwarderJson from "@/contracts/mock/ScoreValutForwarder.sol/ScoreVaultForwarder.json";
import ScoreValutJson from "@/contracts/mock/ScoreVault.sol/ScoreVault.json";
import { useEthersSigner } from "@/hooks/useEthersProvider";
import { FORWARDER_CONTRACT_ADDRESS, SCOREVAULT_CONTRACT_ADDRESS } from "@/utils/contants";
import { getUint48 } from "@/utils/getUint48";
import { ForwardRequest } from "@/utils/types";
import { readContract } from "@wagmi/core";
import { Contract } from "ethers";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAccount, useSignTypedData } from "wagmi";


export default function Evaluate() {
  const [isLoading, setIsLoading] = useState(false);
  const [txCount, setTxCount] = useState(0);
  const [to, setTo] = useState('');
  const [plainScore, setPlainScore] = useState("");
  const [encryptedScore, setEncryptedScore] = useState('');

  const account = useAccount();
  const { signTypedDataAsync } = useSignTypedData();
  // get Signer Instance
  const signer: any = useEthersSigner();
  console.log("to:", to);
  console.log("plainScore:", plainScore);
  const sampleValue = {
    name: "mame3",
    totalScore: "6372169231563658595",
    totalEvaluater: "121016624988591087",
  }

  /**
   * setScore method
   */
  const setScore = async () => {
    setIsLoading(true);
    try {
      // create forwarder contract instance
      const forwarder: any = (new Contract(FORWARDER_CONTRACT_ADDRESS, ScoreValutForwarderJson.abi, signer)) as any;
      // create ScoreValut contract instance
      const scoreVault: any = (new Contract(SCOREVAULT_CONTRACT_ADDRESS, ScoreValutJson.abi, signer)) as any;
      // get domain
      const domain = await forwarder.eip712Domain();
      // console.log("domain:", domain);
      // create encodedFunctionData
      // @ts-ignore
      console.log("暗号化前plainScore:", plainScore);
      console.log("暗号化前plainScore.toString():", typeof(plainScore.toString()));
      const encRes = await fetch('/api/encrypt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: sampleValue.name,
          num: plainScore.toString(), 
        }),
      });
      const encResJson = await encRes.json();
      console.log("sampleValue.name:", sampleValue.name);
      console.log("encRes:", encResJson.encrypted);
      setEncryptedScore(encResJson.encrypted);
  
      const getScoreRes = await readContract({
        address: SCOREVAULT_CONTRACT_ADDRESS,
        abi: ScoreValutJson.abi,
        functionName: "getScore",
        args: [to]
      }) as any;
      console.log("getScoreRes:", getScoreRes[0]);
      const currentScore = getScoreRes[0];
      
      const count = getScoreRes[2] ?? 0;

      const encCountRes = await fetch('/api/encrypt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: sampleValue.name,
          num: count.toString(), 
        }),
      });
      const encCountResJson = await encCountRes.json();
      console.log("encRes:", encCountResJson.encrypted);
      const encryptedCount = encCountResJson.encrypted;



      console.log("currentScore:", currentScore);
      let updateEncryptedScore;

      // currentScoreが空文字か0の場合、別の処理を実行
      if (currentScore === '' || currentScore === '0') {
        console.log("スコアは未設定または0です。別の処理を実行");
        // const encFirstRes = await fetch('/api/encrypt', {
        //   method: 'POST',
        //   headers: {
        //     'Content-Type': 'application/json',
        //   },
        //   body: JSON.stringify({
        //     name: sampleValue.name,
        //     num: encResJson.encrypted.toString(), 
        //   }),
        // });
        // const encFirstResJson = await encFirstRes.json();
        // console.log("encRes:", encFirstResJson.encrypted);
        updateEncryptedScore = encResJson.encrypted;
      } else {
        console.log(`現在のスコアは${currentScore}です。`);
        console.log("currentScore:", currentScore);
        console.log("encryptedScore:", encryptedScore);
        const addRes = await fetch('/api/add', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: sampleValue.name,
            encNum1: encResJson.encrypted.toString(),
            encNum2: currentScore.toString(),
          }),
        });
        const addResJson = await addRes.json();
        console.log("addResJson:", addResJson);
        console.log("addRes:", addResJson.encryptedSum);
        updateEncryptedScore = addResJson.encryptedSum;
    
        // if (!response.ok) {
        //   throw new Error('Network response was not ok');
        // }
      }

      console.log("updateEncryptedScore:", updateEncryptedScore);


      // 1. number of encripted evaluater, 2 encripted evaluater
      const encodedData: any = scoreVault.interface.encodeFunctionData("setScore",[to, updateEncryptedScore, encryptedCount])
      // get unit48
      const uint48Time = getUint48();
      // create request data
      const sig = await signTypedDataAsync({
        domain: {
          name: domain[1],
          version: domain[2],
          chainId: 534351, // scroll sepolia
          verifyingContract: domain[4] as any
        },
        types: {
          'ForwardRequest': ForwardRequest
        },
        primaryType: 'ForwardRequest',
        message: {
          from: account.address,
          to: SCOREVAULT_CONTRACT_ADDRESS,
          value: 0,
          gas: 360000,
          nonce: await forwarder.nonces(account.address!),
          deadline: uint48Time,
          data: encodedData
        },
      });
      // call requestRelayer API 
      const gaslessResult = await fetch('/api/requestRelayer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: account.address,
          to: SCOREVAULT_CONTRACT_ADDRESS,
          value: 0,
          gas: 360000,
          nonce: (await forwarder.nonces(account.address!)).toString(),
          deadline: uint48Time.toString(),
          data: encodedData,
          signature: sig
        }),
      });

      console.log(await gaslessResult.json());
      toast.success('🦄 Success!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } catch (err: any) {
      console.error("err:", err);
      toast.error('Failed....', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    /**
     * init method
     */
    const init = async () => {
      if (account.address != undefined) {
        // get txCount
        const res = await fetch('/api/getTxCount', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            address: account.address
          }),
        });
        const data = await res.json();
        console.log("Tx Count:", data.txCount);
        setTxCount(data.txCount);
      }
    }
    init();
  }, []);

  return (
    <div className="h-screen w-screen flex flex-row bg-white md:flex-col-reverse">
      <NavigationSidebar />
      <div className="h-full w-full p-20 bg-white md:p-10">
        {isLoading ? (
          <div className="flex items-center justify-center h-screen">
            <Loading />
          </div>
        ) : (
          <div className="h-full w-full rounded-2xl flex flex-col justify-between place-items-center py-20 px-10 text-center shadow-lg sm:py-7 xs:px-4">
              <h1 className="text-Primary10 text-Title">Send an evaluate</h1>

              <div className="w-[45%] h-[30%] flex flex-col min-h-40 justify-between sm:w-full">
                <Input
                  labelText="Address"
                  id="Address"
                  type="text"
                  autoCorrect="off"
                  autoCapitalize="off"
                  autoComplete="off"
                  icon="AddressIcon"
                  value={to}
                  onChange={setTo}
                />
                <Input
                  labelText="Score"
                  id="Score"
                  type="text"
                  autoCorrect="off"
                  autoCapitalize="off"
                  autoComplete="off"
                  icon="ScoreIcon"
                  value={plainScore}
                  onChange={setPlainScore}
                />
              </div>
              <div>
                <button
                  className="group rounded-lg bg-Primary10 border-2 border-transparent hover:bg-Primary20 active:bg-Primary30 focus-visible:border-black disabled:bg-Primary50"
                  onClick={async () => { await setScore() }}
                >
                  <div className="rounded-lg px-18 py-4 border border-transparent group-focus-visible:border-white">
                    <span className="text-Button text-white">Send</span>
                  </div>
                </button>
              </div>
          </div>
        )}
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
}