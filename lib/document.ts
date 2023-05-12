import { useEffect, useState } from "react"
import { useContract, useSigner } from "wagmi"
import { useWriteTransaction } from "./wagmi"
import { noOp } from "./helpers"


export const useSetDocument = ( key: string, value: string ) => {
  return useWriteTransaction({
    abi: ["function setDocument(string, string) external returns (bool)"],
    address: "0x4D13ba5c7894C8d6c7B8Df0253Ce84a56562D10E",
    args: [key, value],
    overrides: {
      gasLimit: 3e6 as any,
    },
    functionName: "setDocument",
  })
}

