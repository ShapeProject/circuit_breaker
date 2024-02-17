import Input from "@/components/input/input";
import Loading from "@/components/loading";
import { NavigationSidebar } from "@/components/navigation/navigationSidebar";
import ScoreValutForwarderJson from "@/contracts/mock/ScoreValutForwarder.sol/ScoreVaultForwarder.json";
import ScoreValutJson from "@/contracts/mock/ScoreVault.sol/ScoreVault.json";
import { useEthersSigner } from "@/hooks/useEthersProvider";
import { FORWARDER_CONTRACT_ADDRESS, SCOREVAULT_CONTRACT_ADDRESS } from "@/utils/contants";
import { getUint48 } from "@/utils/getUint48";
import { ForwardRequest } from "@/utils/types";
import { Contract } from "ethers";
import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAccount, useSignTypedData } from "wagmi";

export default function Verify() {
  const [isLoading, setIsLoading] = useState(false);

  const account = useAccount();
  const { signTypedDataAsync } = useSignTypedData();
  // get Signer Instance
  const signer: any = useEthersSigner();
  const [score, setScore] = useState('');

  /**
   * verify method
   */
  const verify = async() => {
    setIsLoading(true);
    try {
       
      const sampleValue = {
        name: "mame3",
        totalScore: "6372169231563658595",
        totalEvaluater: "121016624988591087",
        lineNumber: "10",
      };
      const response = await fetch('/api/isAbove', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: sampleValue.name,
          totalScore: sampleValue.totalScore,
          totalEvaluater: sampleValue.totalEvaluater,
          lineNumber: sampleValue.lineNumber,
        }),
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const result = await response.json();
      console.log(result); // ここで取得した結果を使用する
      // 例: 結果に応じてUIを更新
      if (result.isAbove) {
        console.log("結果は上です。");
        toast.success('🦄 Above the Score!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      } else {
        console.log("結果は下または同等です。");
        toast.success('🦄 Under the score...', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
      toast.error('Failed...', {
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

  return (
    <div className="h-screen w-screen flex flex-row bg-white">
      <NavigationSidebar />
      <div className="h-full w-full px-10 py-20 bg-white ">
        {isLoading ? (
          <div className="flex items-center justify-center h-screen">
            <Loading/>
          </div>
        ) : (
          <div className="h-full w-full rounded-2xl flex flex-col justify-between py-20 text-center shadow-lg">
            <h1 className="text-Primary10 text-Title">Verification</h1>

            <div className="w-fit m-auto space-y-24">
              <Input
                labelText="Address"
                id="Address"
                type="text"
                autoCorrect="off"
                autoCapitalize="off"
                autoComplete="off"
                icon="AddressIcon"
              />
              <Input
                labelText="Score"
                id="Score"
                type="text"
                autoCorrect="off"
                autoCapitalize="off"
                autoComplete="off"
                icon="ScoreIcon"
                value={score}
                onChange={(e) => setScore(e.target.value)}
              />
            </div>
            <div>
              <button 
                className="group rounded-lg bg-Primary10 border-2 border-transparent hover:bg-Primary20 active:bg-Primary30 focus-visible:border-black disabled:bg-Primary50"
                onClick={async() => { await verify()}}
              >
                <div className="rounded-lg px-18 py-4 border border-transparent group-focus-visible:border-white">
                  <span className="text-Button text-white">Verify</span>
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
