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

  /**
   * verify method
   */
  const verify = async() => {
    setIsLoading(true);

    try {
      // create forwarder contract instance
      const forwarder: any = (new Contract(FORWARDER_CONTRACT_ADDRESS, ScoreValutForwarderJson.abi, signer)) as any;
      // create ScoreValut contract instance
      const scoreVault: any = (new Contract(SCOREVAULT_CONTRACT_ADDRESS, ScoreValutJson.abi, signer)) as any;
      // get domain
      const domain = await forwarder.eip712Domain();
      // create callData for verify
      const res: any = await fetch('/api/generateProof');
      const result = await res.json();
      // crate encodedFunctionData
      const encodedData: any = scoreVault.interface.encodeFunctionData("verifyProof",[result.a, result.b, result.c, result.input])
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
        primaryType:'ForwardRequest',
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

      console.log(await gaslessResult.json())
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
    } catch(err: any) {
      console.error("err:", err);
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
              />
              <Input
                labelText="Score"
                id="Score"
                type="text"
                autoCorrect="off"
                autoCapitalize="off"
                autoComplete="off"
                icon="ScoreIcon"
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
