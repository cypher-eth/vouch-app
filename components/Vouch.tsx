import { useState, useEffect } from "react"

import useWaitForTx from "@/lib/useWaitForTx"
import { toastError } from "@/lib/toaster"
import { useVouchNote } from "@/lib/vouch"
import Button from "@/components/Button"
import Input from "@/components/Input"

import { ForceConnectButton } from "./Register"

function Vouch({ billCode, palNote }: { billCode: string; palNote: string }) {
  const { waitForTx } = useWaitForTx({
    successMessage: "Vouch sent!",
    errorMessage: "Oops, something went wrong.",
  })

  const [note, setNote] = useState("")

  const {
    write: vouch,
    data: txReceipt,
    isLoading,
  } = useVouchNote(note!, "Good vibes at Zuzalu")

  function handleVouch() {
    if (!note?.length) return toastError("Note cannot be empty")
    if (!vouch) return toastError("Input not valid")
    vouch()
  }

  useEffect(() => {
    if (isLoading) setNote("")
  }, [isLoading])

  useEffect(() => {
    if (palNote) setNote(palNote.toUpperCase())
  }, [palNote])

  waitForTx(txReceipt)

  return (
    <section className="w-full flex flex-col gap-4">
      <div>
        <h1 className="mb-2">Vouch Note</h1>
        <p className="text-center opacity-60 text-lg">
          Your note: <strong className="font-semibold">{billCode}</strong>
        </p>
      </div>
      <Input
        value={note}
        onChange={(e) => setNote(e.target.value.toUpperCase())}
        placeholder="The Note of someone you trust"
      />
      <ForceConnectButton>
        <Button disabled={isLoading} onClick={handleVouch}>
          VOUCH
        </Button>
      </ForceConnectButton>
    </section>
  )
}

export default Vouch
