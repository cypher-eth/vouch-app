import { useContractRead } from "wagmi"
import { useWriteTransaction } from "./wagmi"

export const CONTRACT_ADDRESS = "0x5cbe254Bf5bF98e96F1972d70A3F5abD54efbA61"

export const useRegisterBill = (id: string) => {
  return useWriteTransaction({
    abi: ["function register (string) external"],
    address: CONTRACT_ADDRESS,
    args: [id],
    functionName: "register",
  })
}
export const useUnregisterBill = (id: string) => {
  return useWriteTransaction({
    abi: ["function unregister (string) external"],
    address: CONTRACT_ADDRESS,
    args: [id],
    functionName: "unregister",
  })
}

export const useProcessUnvouched = (id: string) => {
  return useWriteTransaction({
    abi: ["function processUnvouched (string) external"],
    address: CONTRACT_ADDRESS,
    args: [id],
    functionName: "processUnvouched",
  })
}
export const useVouchNote = (billId: string, message: string) => {
  return useWriteTransaction({
    abi: ["function vouch(string, string) external returns (bool)"],
    address: CONTRACT_ADDRESS,
    args: [billId, message],
    overrides: {
      gasLimit: 3e6 as any,
    },
    functionName: "vouch",
  })
}

export const useAccountMetadata = (address: string) => {
  const { data: latestBillCode = "", isFetched } = useContractRead<
    any,
    any,
    string
  >({
    cacheTime: 15_000,
    scopeKey: `userBarcode.${address}`,
    watch: true,
    enabled: Boolean(address),
    abi: ["function userBarcode(address) external view returns (string)"],
    address: CONTRACT_ADDRESS,
    functionName: "userBarcode",
    args: [address as any],
  })

  const { data: vouchCount } = useContractRead<any, any, any>({
    cacheTime: 15_000,
    scopeKey: `vouchCount.${address}`,
    watch: true,
    enabled: Boolean(address),
    abi: ["function vouchCount(address) external view returns (uint256)"],
    address: CONTRACT_ADDRESS,
    functionName: "vouchCount",
    args: [address as any],
  })

  return {
    latestBillCode,
    isFetched,
    vouchCount: Number(vouchCount || 0),
  }
}
