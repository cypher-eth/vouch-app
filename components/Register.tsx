import { type PropsWithChildren, useState, useEffect } from "react"

import { useRkAccountModal } from "@/lib/rainbow"
import { toastError } from "@/lib/toaster"
import { useRegisterBill } from "@/lib/vouch"
import { useConnectedAccount } from "@/lib/wagmi"
import Button from "@/components/Button"
import Input from "@/components/Input"
import useWaitForTx from "@/lib/useWaitForTx"

function Register({ vouchId }: { vouchId?: string }) {
  const { waitForTx } = useWaitForTx({
    successMessage: "Bill Registered!",
    errorMessage: "Oops, something went wrong.",
  })

  const [billId, setBillId] = useState<string>()

  const {
    write: register,
    data: txReceipt,
    isLoading,
  } = useRegisterBill(billId!)

  function handleRegister() {
    if (!billId?.length) return toastError("Bill cannot be empty")
    register?.()
  }

  useEffect(() => {
    if (isLoading) setBillId(undefined)
  }, [isLoading])

  useEffect(() => {
    if (vouchId) setBillId(vouchId)
  }, [vouchId])

  waitForTx(txReceipt)

  return (
    <section className="flex flex-col gap-4">
      <h1>Register Bill</h1>
      <Input
        value={billId}
        onChange={(e) => setBillId(e.target.value?.toUpperCase())}
        placeholder="Bill Serial #"
      />
      <ForceConnectButton>
        <Button disabled={isLoading} onClick={handleRegister}>
          CONTINUE
        </Button>
      </ForceConnectButton>
    </section>
  )
}

export function ForceConnectButton({ children }: PropsWithChildren) {
  const { openAccountModal } = useRkAccountModal()
  const { isConnected } = useConnectedAccount()

  if (!isConnected) {
    return <Button onClick={openAccountModal}>CONNECT</Button>
  }

  return children as JSX.Element
}

export default Register
