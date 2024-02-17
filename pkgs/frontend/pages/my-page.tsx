import  StarRating  from "@/components/fiveStarRating/fiveStarRating";
import { NavigationSidebar } from "@/components/navigation/navigationSidebar";
import ScoreCircle from "@/components/scoreCircle";
import ScoreValutJson from "@/contracts/mock/ScoreVault.sol/ScoreVault.json";
import { SCOREVAULT_CONTRACT_ADDRESS } from "@/utils/contants";
import { readContract } from "@wagmi/core";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

export default function MyPage() {
<<<<<<< HEAD

=======
  const [txCount, setTxCount] = useState(0);
>>>>>>> main
  const [encrptedScore, setEncyrptedScore] = useState("");

  const account = useAccount();

  useEffect(() => {
    /**
     * init method
     */
    const init = async () => {
      if (account.address != undefined) {
        // get encryptedScore
        const result = await readContract({
          address: SCOREVAULT_CONTRACT_ADDRESS,
          abi: ScoreValutJson.abi,
          functionName: "getScore",
          args: [account.address]
        });
        console.log("result:", result);
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
    <div className="h-screen w-screen flex flex-row">
      <NavigationSidebar />
<<<<<<< HEAD
      <div className="h-full w-full flex flex-row px-10 justify-between">
        <div className="h-full flex items-end">
          <div className="w-fit h-fit rounded-t-2xl flex flex-col space-y-14 px-10 py-14 bg-white shadow-lg">
            <h1 className="text-Title mx-auto">My Page</h1>
            <div className="px-10 py-6 space-y-10">
              <div className="space-y-6 flex flex-col">
                <span className="text-BodyStrong text-Primary40">Total Score</span>
                <span className="w-full text-BodyMono text-right">1,105</span>
              </div>
              <div className="space-y-6 flex flex-col">
                <span className="text-BodyStrong text-Primary40">Received</span>
                <span className="w-full text-BodyMono text-right">13</span>
=======
      <div className="h-full w-full flex flex-row px-10">
        <div className="w-fit rounded-t-2xl flex flex-col space-y-14 px-10 py-14 bg-white shadow-lg">
          <h1 className="text-Title mx-auto">My Page</h1>
          <div className="px-10 py-6 space-y-10">
            <div className="space-y-6 flex flex-col">
              <span className="text-BodyStrong text-Primary40">Total Score</span>
              <span className="w-64 text-BodyMono text-right">1,105</span>
            </div>
            <div className="space-y-6 flex flex-col">
              <span className="text-BodyStrong text-Primary40">Received</span>
              <span className="w-64 text-BodyMono text-right">{txCount}</span>
            </div>
          </div>
          <FiveStarRating
          value={3.2}
          count = {txCount}
          size={40}
          />
        </div>
        <div className="relative p-10 [&_div]:flex [&_div]:justify-center [&_div]:items-center">
          <div className="h-full aspect-square rounded-full bg-Gray30">
            <div className="h-68pct aspect-square rounded-full bg-white shadow-md">
              <div className="h-89pct aspect-square rounded-full border-40 border-Gray20 border-dashed">
                <div className="h-92pct aspect-square rounded-full border-24 border-Gray20">
                  <div className="h-92pct aspect-square rounded-full border-12 border-Gray20">
                    <div className="h-92pct aspect-square rounded-full bg-Primary10 shadow-lg">
                      <span className="font-mono text-AvgScore text-white">85</span>
                    </div>
                  </div>
                </div>
>>>>>>> main
              </div>
            </div>
            <StarRating
              rating={3.9}
              maxStars={5}
              size={40}
            />
          </div>
        </div>

        <div className=" h-full w-fit relative p-10 [&_div]:flex [&_div]:justify-center [&_div]:items-center">
          <ScoreCircle
            score={85}
            maxScore={100}
          />
        </div>


      </div>
    </div>
  );
}
