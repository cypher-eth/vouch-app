import { useEffect, useState } from "react"
import { useContract, useSigner } from "wagmi"
import { useWriteTransaction } from "./wagmi"
import { noOp } from "./helpers"

export const ABI = [
  {
    name: "userBarcode",
    inputs: [
      {
        internalType: "address",
        type: "address",
      },
    ],
    outputs: [
      {
        internalType: "string",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const

export const useRegisterBill = ( id: string) => {
  return useWriteTransaction({
    abi: ["function register (string) external"],
    address: "0x4D13ba5c7894C8d6c7B8Df0253Ce84a56562D10E",
    args: [id],
    functionName: "register",
  })
}
export const useUnregisterBill = ( id: string) => {
  return useWriteTransaction({
    abi: ["function unregister (string) external"],
    address: "0x4D13ba5c7894C8d6c7B8Df0253Ce84a56562D10E",
    args: [id],
    functionName: "unregister",
  })
}
export const useProcessUnvouched = ( id: string) => {
  return useWriteTransaction({
    abi: ["function processUnvouched (string) external"],
    address: "0x4D13ba5c7894C8d6c7B8Df0253Ce84a56562D10E",
    args: [id],
    functionName: "processUnvouched",
  })
}
export const useVouchForAddy = ( barcode: string, message: string ) => {
  return useWriteTransaction({
    abi: ["function vouch(string, string) external returns (bool)"],
    address: "0x4D13ba5c7894C8d6c7B8Df0253Ce84a56562D10E",
    args: [barcode, message],
    overrides: {
      gasLimit: 3e6 as any,
    },
    functionName: "vouch",
  })
}

export const useAccountMetadata = (address: string) => {
  const [metadata, setMetadata] = useState({
    latestBillCode: "0",
  })

  const { data: signer } = useSigner()

  const contract = useContract({
    abi: ABI,
    address: "0x4D13ba5c7894C8d6c7B8Df0253Ce84a56562D10E",
    signerOrProvider: signer?.provider,
  })

  useEffect(() => {
    if (signer) {
      contract
        ?.connect(signer)
        ?.userBarcode(address as any)
        .then((latestBillCode) => {
          setMetadata({
            latestBillCode,
          })
        })
        .catch(noOp)
    }
  }, [signer?._isSigner, address, contract?.address])

  return metadata
}
