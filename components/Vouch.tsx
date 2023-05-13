import { useState, useEffect } from "react"

import { toastError } from "@/lib/toaster"
import { useVouchForAddy } from "@/lib/vouch"
import Button from "@/components/Button"
import Input from "@/components/Input"
import useWaitForTx from "@/lib/useWaitForTx"

import { ForceConnectButton } from "./Register"
import NoVouchs from "./NoVouchs"

function Vouch({ billCode, palNote }: { billCode: string; palNote: string }) {
  const { waitForTx } = useWaitForTx({
    successMessage: "Vouch sent!",
    errorMessage: "Oops, something went wrong.",
  })

  const [note, setNote] = useState<string>()

  const {
    write: vouch,
    data: txReceipt,
    isLoading,
  } = useVouchForAddy(note!, "Good vibes at Zuzalu")

  function handleVouch() {
    if (!note?.length) return toastError("Address cannot be empty")
    if (!vouch) return toastError("Input not valid")
    vouch()
  }

  useEffect(() => {
    if (isLoading) setNote(undefined)
  }, [isLoading])

  useEffect(() => {
    if (palNote) setNote(palNote)
  }, [palNote])

  waitForTx(txReceipt)

  if (billCode) {
    return (
      <section className="flex flex-col gap-4">
        <div>
          <h1 className="mb-2">Vouch Note</h1>
          <p className="text-center opacity-50">
            {billCode === "0" ? "" : `Your note: ${billCode}`}
          </p>
        </div>
        <Input
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="The Note of someone you trust."
        />
        <ForceConnectButton>
          <Button disabled={isLoading} onClick={handleVouch}>
            VOUCH
          </Button>
        </ForceConnectButton>
      </section>
    )
  }

  return <NoVouchs />
}

export default Vouch
