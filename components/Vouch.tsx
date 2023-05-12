import { useState, useEffect } from "react"

import { toastError } from "@/lib/toaster"
import { useVouchForAddy } from "@/lib/vouch"
import Button from "@/components/Button"
import Input from "@/components/Input"
import useWaitForTx from "@/lib/useWaitForTx"

import { ForceConnectButton } from "./Register"

function Vouch({ billCode }: { billCode: string }) {

  const { waitForTx } = useWaitForTx({
    successMessage: "Vouch sent!",
    errorMessage: "Oops, something went wrong.",
  })

  const [addy, setAddy] = useState<string>()
  const { 
    write: vouch,
    data: txReceipt,
    isLoading,
  } = useVouchForAddy(addy!, "Good vibes at Zuzalu")

  function handleVouch() {
    if (!addy?.length) return toastError("Address cannot be empty")
    if (!vouch) return toastError("Input not valid")
    vouch()
  }

  useEffect(() => {
    if (isLoading) setAddy(undefined)
  }, [isLoading])

  waitForTx(txReceipt)

  if (billCode ) {
    return (
      <section className="flex flex-col gap-4">
        <div>
          <h1 className="mb-2">Vouch Note</h1>
          <p className="text-center opacity-70">
            {billCode === "0" ? "" : ` (Your note is #${billCode})`}
          </p>
        </div>
        <Input
          value={addy}
          onChange={(e) => setAddy(e.target.value)}
          placeholder="The Note of someone you trust."
        />
        <ForceConnectButton>
          <Button disabled={isLoading} onClick={handleVouch}>VOUCH</Button>
        </ForceConnectButton>
      </section>
    )
  }

  return (
    <section className="flex flex-col gap-8">
      <div>
        <h1 className="mb-2">No Bills Found</h1>
        <p className="text-center opacity-70">
          You must register a Bill to continue.
        </p>
      </div>
      <ForceConnectButton>
        <Button asLink href="/register">
          REGISTER
        </Button>
      </ForceConnectButton>

    </section>
  )
}

export default Vouch
