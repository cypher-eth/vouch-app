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

export const useRegisterBill = (address: string, id: string) => {
  return useWriteTransaction({
    abi: ["function register (address, string) external"],
    address: "0xb84c93cfb31d51ad3d48e77cd4fa44ed59d277fa",
    args: [address, id],
    functionName: "register",
  })
}

export const useVouchForAddy = (address: string) => {
  return useWriteTransaction({
    abi: ["function vouch(address) external"],
    address: "0xb84c93cfb31d51ad3d48e77cd4fa44ed59d277fa",
    args: [address],
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
    address: "0xb84c93cfb31d51ad3d48e77cd4fa44ed59d277fa",
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
