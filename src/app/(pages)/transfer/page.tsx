'use client';

import { GOLD_TOKE_ABI } from '@/config/contract';
import { CONTRACT_ADDRESS } from '@/utils/common.variable';
import React from 'react';
import { http, createConfig } from 'wagmi';
import { mainnet, sepolia } from 'wagmi/chains';
import { useReadContract } from 'wagmi';
import { formatEther, parseUnits } from 'viem';
import {
  type BaseError,
  useWaitForTransactionReceipt,
  useWriteContract
} from 'wagmi';

import { 
  useSendTransaction, 
} from 'wagmi' 
import { parseEther } from 'viem' 


export default function Transfer() {
  /** Reading decimals */
  const decimalResult = useReadContract({
    abi: GOLD_TOKE_ABI,
    address: CONTRACT_ADDRESS,
    functionName: "decimals",
  }) as {
    isLoading: boolean;
    data: BigInt;
    isError: boolean;
    error: Error | null;
  };

  const {
    data: hash,
    error,
    isPending,
    sendTransaction,
  } = useSendTransaction();

  const {
    data: tokenData,
    error: tokenError,
    isPending: tokenPending,
    writeContract,
  } = useWriteContract();

  async function ethSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const to = formData.get("address") as `0x${string}`;
    const value = formData.get("value") as string;
    sendTransaction({ to, value: parseEther(value) });
  }

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  async function transferSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const addressto = formData.get("addressTo") as `0x${string}`;
    const token = formData.get("token") as string;
    //Find decimal
    const parsedToken = parseUnits(token, Number(decimalResult.data));
    writeContract({
      address: CONTRACT_ADDRESS,
      abi: GOLD_TOKE_ABI,
      functionName: "transfer",
      args: [addressto, parsedToken],
    });
  }

  const {
    isLoading: isConfirmTokenTransfer,
    isSuccess: isConfirmTokenTranferComplete,
  } = useWaitForTransactionReceipt({
    hash: tokenData,
  });

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="container mx-auto text-center">
        <h1 className="text-2xl font-bold mb-8">Transfer Page</h1>
        <div className="space-y-4">
          <form onSubmit={ethSubmit} className="w-full max-w-md mx-auto">
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
              className={`text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-200 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-900 font-medium rounded-lg text-sm px-5 py-2.5 w-full text-center ${
                isPending ? "opacity-50 cursor-not-allowed" : ""
              }`}
              type="submit"
              disabled={isPending}
            >
              {isPending ? "Confirming...." : "Transfer Eth"}
            </button>
          </form>

          <div className="mt-4 max-w-md mx-auto">
            {hash && (
              <div className="bg-blue-500 text-white mt-2  rounded-lg p-2 underline">
                Transaction Hash:{" "}
                <a href={`https://sepolia.etherscan.io/tx/` + hash}>
                  View on etherscan
                </a>
              </div>
            )}
            {isConfirming && (
              <div className="text-white bg-orange-600 mt-2 rounded-lg p-2">
                Waiting for confirmation...
              </div>
            )}
            {isConfirmed && (
              <div className="text-white bg-green-600 mt-2 rounded-lg p-2">
                Tranfer successful.
              </div>
            )}
            {error && (
              <div className="text-white bg-red-600 mt-2 rounded-lg p-2">
                Error: {(error as BaseError).shortMessage || error.message}
              </div>
            )}
          </div>
        </div>
      </div>

      <hr className="my-6 border-red-700 sm:mx-auto  lg:my-8 h-4" />

      <div className="container mx-auto text-center">
        <h1 className="text-2xl font-bold mb-8">Transfer Token</h1>
        <div className="space-y-4">
          <form onSubmit={transferSubmit} className="w-full max-w-md mx-auto">
            <input
              name="addressTo"
              placeholder="0xA0Cf…251e"
              required
              className="block w-full p-2 mb-4 border border-gray-300 rounded"
            />
            <input
              name="token"
              placeholder="5"
              required
              className="block w-full p-2 mb-4 border border-gray-300 rounded"
            />
            <button
              className={`text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-200 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-900 font-medium rounded-lg text-sm px-5 py-2.5 w-full text-center ${
                tokenPending ? "opacity-50 cursor-not-allowed" : ""
              }`}
              type="submit"
              disabled={tokenPending}
            >
              {tokenPending ? "Confirming...." : "Transfer token"}
            </button>
          </form>

          <div className="mt-4 max-w-md mx-auto">
            {tokenData && (
              <div className="bg-blue-500 text-white mt-2  rounded-lg p-2 underline">
                Token Transfer Hash:{" "}
                <a href={`https://sepolia.etherscan.io/tx/` + tokenData}>
                  View on etherscan
                </a>
              </div>
            )}
            {isConfirmTokenTransfer && (
              <div className="text-white bg-orange-600 mt-2 rounded-lg p-2">
                Waiting for confirmation...
              </div>
            )}
            {isConfirmTokenTranferComplete && (
              <div className="text-white bg-green-600 mt-2 rounded-lg p-2">
                Tranfer token successful.
              </div>
            )}
            {tokenError && (
              <div className="text-white bg-red-600 mt-2 rounded-lg p-2">
                Error:{" "}
                {(tokenError as BaseError).shortMessage || tokenError.message}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
  
