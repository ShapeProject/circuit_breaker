import Input from "@/components/input/input";
import Loading from "@/components/loading";
import { NavigationSidebar } from "@/components/navigation/navigationSidebar";
import ScoreValutJson from "@/contracts/mock/ScoreVault.sol/ScoreVault.json";
import { SCOREVAULT_CONTRACT_ADDRESS } from "@/utils/contants";
import { readContract } from "@wagmi/core";
import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Verify() {
  const [isLoading, setIsLoading] = useState(false);

  const [score, setScore] = useState('');
  const [to, setTo] = useState('');

  /**
   * verify method
   */
  const verify = async() => {
    setIsLoading(true);
    try {

      const resRead = await readContract({
        address: SCOREVAULT_CONTRACT_ADDRESS,
        abi: ScoreValutJson.abi,
        functionName: "getScore",
        args: [to]
      }) as any;
      console.log("result:", resRead);
      const encryptedTotalScore = resRead[0];
      const encryptedCount = resRead[1];
      console.log("encryptedTotalScore:", encryptedTotalScore);
       
      const sampleValue = {
        name: "mame3",
        totalScore: "6372169231563658595",
        totalEvaluater: "121016624988591087",
        lineNumber: "10",
      };
      console.log("score:", score);
      const response = await fetch('/api/isAbove', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: sampleValue.name,
          totalScore: encryptedTotalScore,
          // totalEvaluater: "4982023261627043412",
          totalEvaluater: encryptedCount,
          lineNumber: score,
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
    <div className="h-screen w-screen flex flex-row bg-white md:flex-col-reverse">
      <NavigationSidebar />
      <div className="h-full w-full p-20 bg-white md:p-10">
        {isLoading ? (
          <div className="flex items-center justify-center h-screen">
            <Loading />
          </div>
        ) : (
          <div className="h-full w-full rounded-2xl flex flex-col justify-between place-items-center py-20 px-10 text-center shadow-lg sm:py-7 xs:px-4">
            <h1 className="text-Primary10 text-Title">Verification</h1>

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
                value={score}
                onChange={setScore}
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
