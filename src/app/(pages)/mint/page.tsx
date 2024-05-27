'use client';

import { formatUnits, parseUnits } from 'viem';
import { GOLD_TOKE_ABI } from '@/config/contract';
import { CONTRACT_ADDRESS } from '@/utils/common.variable';
import React, { useEffect, useState } from 'react';
import { useReadContract } from 'wagmi';
import {
  type BaseError,
  useWaitForTransactionReceipt,
  useWriteContract
} from 'wagmi';


export default function Mint() {

   /** State Variables... */
   const [decimals, setDecimals] = useState<string>('8');

  
   /** Reading decimals */
  const decimalResult = useReadContract({
    abi: GOLD_TOKE_ABI,
    address: CONTRACT_ADDRESS,
    functionName: 'decimals',
  }) as {
    isLoading: boolean;
    data: BigInt;
    isError: boolean;
    error: Error | null;
  };

  
  /** Fetching the Contract Detail READ */
  const { isLoading, data, isError, error } = useReadContract({
    abi: GOLD_TOKE_ABI,
    address: CONTRACT_ADDRESS,
    functionName: 'totalSupply',
  }) as {
    isLoading: boolean;
    data: BigInt;
    isError: boolean;
    error: Error | null;
  };

  // Ensure data is of type BigInt
  const dataBigInt = data as BigInt | undefined;
  let totalTokenSupply = "0";
  // Check if data is not undefined
  if (dataBigInt !== undefined) {
    // Convert BigInt to a string and then format it
    totalTokenSupply = formatUnits(BigInt(dataBigInt.toString()),parseInt(decimals) );
  }

  /** Minting the Contract Write */
  const {
    data: hash,
    error: contractError,
    isPending,
    writeContract
  } = useWriteContract()

 
  /**On click of mint */
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    const amount = formData.get('value') as string
    const address = formData.get('address') as string;

    //Find decimal 
    const amountParsed = parseUnits(amount, Number(decimals));
    writeContract({
      address: CONTRACT_ADDRESS,
      abi: GOLD_TOKE_ABI,
      functionName: 'mint',
      args: [address, amountParsed],
    })
  }

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    })

    useEffect(()=>{
      if(decimalResult.data){
        setDecimals(decimalResult.data.toString());
      }
      
    },[decimalResult.data, isPending])

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="container mx-auto text-center">
        <h1 className="text-2xl font-bold mb-8">Mint Page</h1>
        <div className="space-y-4">

          <form onSubmit={submit} className="w-full max-w-md mx-auto">
            <input
              name="address"
              placeholder="0xA0Cf…251e"
              required
              className="block w-full p-2 mb-4 border border-gray-300 rounded"
            />
            <input
              name="value"
              placeholder="5"
              required
              className="block w-full p-2 mb-4 border border-gray-300 rounded"
            />
            <button
              className={`text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-200 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-900 font-medium rounded-lg text-sm px-5 py-2.5 w-full text-center ${isPending ? 'opacity-50 cursor-not-allowed' : ''}`}
              type="submit"
              disabled={isPending}
            >
              {isPending ? 'Confirming....' : 'Mint'}
            </button>
            {hash && <div className='bg-blue-500 text-white mt-2  rounded-lg p-2 underline'>Transaction Hash: <a href={`https://sepolia.etherscan.io/tx/` + hash} >View on etherscan</a></div>}
            {isConfirming && <div className='text-white bg-orange-600 mt-2 rounded-lg p-2'>Waiting for confirmation...</div>}
            {isConfirmed && <div className='text-white bg-green-600 mt-2 rounded-lg p-2'>Transaction confirmed.</div>}
            {contractError && (
              <div className="text-white bg-red-600 mt-2 rounded-lg p-2">Error: {(contractError as BaseError).shortMessage || contractError.message}</div>
            )}
          </form>


          <div className="mt-4 max-w-48/3 flex justify-center content-center">
            {isLoading && <div className="text-blue-700">Loading total supply...</div>}
            {isError && <div className="text-red-500">Error: {error?.message}</div>}
            {!isLoading && (
              <div className="bg-gray-800 text-white rounded-lg p-4 mt-4">
                <h2 className="text-xl font-semibold">Total Supply</h2>
                <p>{totalTokenSupply} Tokens</p>
                <p>{decimals} Decimals</p>
              </div>
            )}
          </div>


        </div>
      </div>
    </main>
  );
}
