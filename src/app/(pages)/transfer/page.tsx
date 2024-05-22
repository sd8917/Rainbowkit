'use client';

import{useRef} from 'react'
import { GOLD_TOKE_ABI } from '@/config/contract';
import { CONTRACT_ADDRESS } from '@/utils/common.variable';
import React, { useEffect, useState } from 'react';
import { http, createConfig } from 'wagmi';
import { mainnet, sepolia } from 'wagmi/chains';
import { writeContract } from '@wagmi/core';
import { estimateGas, readContract } from 'viem/actions';
import { getAccount } from 'wagmi/actions';
import { useReadContract } from 'wagmi';
import { formatEther } from 'viem';
import { 
  type BaseError,
  useSendTransaction, 
  useWaitForTransactionReceipt 
} from 'wagmi' 
import { parseEther } from 'viem' 

const config = createConfig({
  chains: [mainnet, sepolia],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
});

export default function Transfer() {

  const { 
    data: hash,
    error,
    isPending, 
    sendTransaction 
  } = useSendTransaction() 

  async function submit(e: React.FormEvent<HTMLFormElement>) { 
    
    e.preventDefault() 
    const formData = new FormData(e.target as HTMLFormElement) 
    const to = formData.get('address') as `0x${string}` 
    const value = formData.get('value') as string 
    sendTransaction({ to, value: parseEther(value) }) 
  } 

  const { isLoading: isConfirming, isSuccess: isConfirmed } = 
    useWaitForTransactionReceipt({ 
      hash, 
    }) 

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="container mx-auto text-center">
        <h1 className="text-2xl font-bold mb-8">Transfer Page</h1>
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
              placeholder="0.05"
              required
              className="block w-full p-2 mb-4 border border-gray-300 rounded"
            />
            <button
              className={`text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-200 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-900 font-medium rounded-lg text-sm px-5 py-2.5 w-full text-center ${isPending ? 'opacity-50 cursor-not-allowed' : ''}`}
              type="submit"
              disabled={isPending}
            >
              {isPending ? 'Confirming....' : 'Transfer'}
            </button>
             
          </form>


          <div className="mt-4">
          {hash && <div>Transaction Hash: <a href={`https://sepolia.etherscan.io/tx/`+ hash} >View on etherscan</a></div>}
            {isConfirming && <div>Waiting for confirmation...</div>}
            {isConfirmed && <div>Tranfer successful.</div>}
            {error && (
              <div>Error: {(error as BaseError).shortMessage || error.message}</div>
            )}
          </div>


        </div>
      </div>
    </main>
  );
  }
  