"use client";

import { useState, useEffect } from "react";
import { useAccount } from 'wagmi'
import { ethers } from "ethers";
import { CONTRACT_ADDRESS } from "@/utils/common.variable";
import { type UseAccountReturnType } from 'wagmi'
import { signMessage } from '@wagmi/core';
import { http, createConfig } from 'wagmi'
import { mainnet, sepolia } from 'wagmi/chains'
import { disconnect, getAccount, getBalance } from '@wagmi/core'
import { injected } from '@wagmi/connectors'
import { connect } from "wagmi/actions";

const config = createConfig({
  chains: [mainnet, sepolia],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
})


const Home =  () => {

  const [address, setAddress] = useState<`0x${string}`>("0x");
  const [chain, setChain] = useState<string | undefined>("");
  const [isConnected, setIsConnected] = useState<boolean | undefined>(false);
  const [balanceAcc, setBalanceAcc] = useState<any>("");
  const [signMsg,setSignMsg] = useState<string>("");

  const account: UseAccountReturnType = useAccount({
    config,
  })


  const { connector } = getAccount(config)


  const logoutFunction = async () => {

    const result = await disconnect(config, {
      connector,
    })

    console.log('result 123', result);
  }

  const connectorFunction = async () => {
    const result = await connect(config, { connector: injected() });
    
    const balance = await getBalance(config, {
      address: result.accounts[0],
      chainId: 11155111, 
    })
    
  
     setBalanceAcc(balance?.formatted)
    
    console.log("result ", result);

  }


  const signMessageFunc = async () => {
    
    const resultMes = await signMessage(config, {
      account: address, 
      message: 'hello world',
    })
    console.log("result ", resultMes);
    setSignMsg(resultMes)
  }



  useEffect(() => {
    setAddress(account.address!);
    setChain(account.chain?.blockExplorers?.default?.url)
    setIsConnected(account?.isConnected);
  }, [account, isConnected,address,balanceAcc])


  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
        <h5 className="mb-4 text-xl font-medium text-gray-500 dark:text-gray-400">Account Detail</h5>
        <div className="flex items-baseline text-gray-900 dark:text-white">

          <span className="text-5xl font-extrabold tracking-tight">{balanceAcc}</span>
          <span className="ms-1 text-xl font-normal text-gray-500 dark:text-gray-400"> eth</span>
        </div>
        <ul role="list" className="space-y-5 my-7">
          <li className="flex items-center">
            <svg className="flex-shrink-0 w-4 h-4 text-blue-700 dark:text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
            </svg>
            <span className="w-8 text-wrap font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3">Address :- {address} </span>
          </li>
          <li className="flex">
            <svg className="flex-shrink-0 w-4 h-4 text-blue-700 dark:text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
            </svg>
            <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3">Account is {isConnected ? "Connected" : "Not Connected"}</span>
          </li>
          <li className="flex">
            <svg className="flex-shrink-0 w-4 h-4 text-blue-700 dark:text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
            </svg>
            <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3">Chain URL :- {chain}</span>
          </li>

        </ul>
        {
        isConnected ? 
        <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-200 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-900 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex justify-center w-full text-center"
          onClick={logoutFunction} disabled={isConnected! ? false : true} >Disconnect/Logout</button> :
          <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-200 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-900 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex justify-center w-full text-center"
            onClick={connectorFunction} disabled={!isConnected! ? false : true} >Connect</button>
        }

        {
          isConnected &&
          <button type="button" className="text-white bg-blue-700 mt-4 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-200 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-900 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex justify-center w-full text-center"
         disabled={isConnected! ? false : true} onClick={signMessageFunc} >Send Message </button>
         
        }
        <span className="w-4 text-wrap font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3">Message :- {signMsg} </span>
      </div>

    </main>
  );
}

export default Home;
