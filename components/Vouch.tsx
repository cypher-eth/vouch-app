import { useState } from "react"

import { toastError } from "@/lib/toaster"
import { useVouchForAddy } from "@/lib/vouch"
import Button from "@/components/Button"
import Input from "@/components/Input"

import { ForceConnectButton } from "./Register"

function Vouch({ billCode }: { billCode: string }) {
  const [addy, setAddy] = useState<string>()
  const { write: vouch } = useVouchForAddy(addy!, "Good vibes at Zuzalu")

  function handleVouch() {
    if (!addy?.length) return toastError("Address cannot be empty")
    if (!vouch) return toastError("Input not valid")
    vouch()
  }

  if (billCode) {
    return (
      <section className="flex flex-col gap-4">
        <div>
          <h1 className="mb-2">Vouch Note</h1>
          <p className="text-center opacity-70">
            Input note to vouch:{" "}
            {billCode === "0" ? "" : ` (Your note is #${billCode})`}
          </p>
        </div>
        <Input
          value={addy}
          onChange={(e) => setAddy(e.target.value)}
          placeholder="Self issued identity"
        />
        <ForceConnectButton>
          <Button onClick={handleVouch}>VOUCH</Button>
        </ForceConnectButton>
      </section>
    )
  }

  return (
    <section className="flex flex-col gap-8">
      <div>
        <h1 className="mb-2">No Bills Found</h1>
        <p className="text-center opacity-70">
          You must register A Bill to continue.
        </p>
      </div>

      <Button asLink href="/">
        REGISTER
      </Button>
    </section>
  )
}

export default Vouch