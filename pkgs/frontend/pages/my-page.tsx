
import FiveStarRating from "@/components/fiveStarRating/fiveStarRating";
import Loading from "@/components/loading";
import { NavigationSidebar } from "@/components/navigation/navigationSidebar";
import ScoreCircle from "@/components/scoreCircle";
import ScoreValutJson from "@/contracts/mock/ScoreVault.sol/ScoreVault.json";
import { SCOREVAULT_CONTRACT_ADDRESS } from "@/utils/contants";
import { readContract } from "@wagmi/core";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

export default function MyPage() {

  const [txCount, setTxCount] = useState(0);
  const [encrptedScore, setEncyrptedScore] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [totalScore, setToatalScore] = useState(0);
  const [averageScore, setAverageScore] = useState(0);

  const account = useAccount();

  const sampleValue = {
    name: "mame3",
    totalScore: "6372169231563658595",
    totalEvaluater: "121016624988591087",
  }

  useEffect(() => {
    /**
     * init method
     */
    const init = async () => {
      setIsLoading(true);
      if (account.address != undefined) {
        // get encryptedScore
        const result = await readContract({
          address: SCOREVAULT_CONTRACT_ADDRESS,
          abi: ScoreValutJson.abi,
          functionName: "getScore",
          args: [account.address]
        }) as any;
        console.log("result:", result);
        const encryptedScore = result[0];

        const decRes = await fetch('/api/decrypt', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: sampleValue.name,
            encNum: encryptedScore, 
          }),
        });
        const decResJson = await decRes.json();
        console.log("decResJson:", decResJson.decrypted);
        setToatalScore(decResJson.decrypted);
      
        setTxCount(parseInt(result[2], 16));
      }
      setIsLoading(false);
    }
    init();
  }, []);

  return (
    <div className="h-screen w-screen flex flex-row md:flex-col-reverse">
      <NavigationSidebar />
      <div className="h-full w-full flex flex-row px-10 justify-between">
      {isLoading ? (
          <div className="flex items-center justify-center h-screen">
            <Loading/>
          </div>
        ) : (
          <>
            <div className="h-full flex items-end">
              <div className="w-fit h-fit rounded-t-2xl flex flex-col space-y-14 px-10 py-14 bg-white shadow-lg">
                <h1 className="text-Title mx-auto">My Page</h1>
                <div className="px-10 py-6 space-y-10">
                  <div className="space-y-6 flex flex-col">
                    <span className="text-BodyStrong text-Primary40">Total Score</span>
                    <span className="w-full text-BodyMono text-right">{totalScore}</span>
                  </div>
                  <div className="space-y-6 flex flex-col">
                    <span className="text-BodyStrong text-Primary40">Received</span>
                    <span className="w-full text-BodyMono text-right">{txCount}</span>
                  </div>
                </div>
                {txCount == 0 ? (
                  <FiveStarRating
                    maxStars={5}
                    rating={0}
                    size={40}
                  />
                ) : (
                  <FiveStarRating
                    maxStars={5}
                    rating={(totalScore/txCount)/20}
                    size={40}
                  />
                )}
              </div>
            </div>
            <div className="h-screen w-full flex justify-end relative p-10 [&_div]:flex [&_div]:justify-center [&_div]:items-center">
              {txCount == 0 ? (
                <ScoreCircle 
                  score={0}
                  maxScore={0}
                />
              ) : (
                <ScoreCircle 
                  score={(totalScore/txCount)}
                  maxScore={totalScore}
                />
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
