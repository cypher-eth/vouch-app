import { useState, useEffect } from "react"

import { toastError } from "@/lib/toaster"
import { useSetDocument} from "@/lib/document"
import Button from "@/components/Button"
import Input from "@/components/Input"
import useWaitForTx from "@/lib/useWaitForTx"

import { ForceConnectButton } from "./Register"

function EditProfile({ billCode }: { billCode: string }) {

  const { waitForTx } = useWaitForTx({
    successMessage: "Vouch sent!",
    errorMessage: "Oops, something went wrong.",
  })

  const [twitter, setTwitter] = useState<string>()
  const [imgUrl, setImgUrl] = useState<string>()

  const { 
    write: setDocument,
    data: txReceipt,
    isLoading,
  } = useSetDocument(twitter!, "Good vibes at Zuzalu")

  function handleSetDocument() {
    if (!twitter?.length) return toastError("Twitter cannot be empty")
    if (!setDocument) return toastError("Input not valid")
    setDocument()
  }

  useEffect(() => {
    if (isLoading) setTwitter(undefined)
  }, [isLoading])

  waitForTx(txReceipt)

  if (billCode) {
    return (
      <section className="flex flex-col gap-4">
        <div>
          <h1 className="mb-2">Edit Profile</h1>
          <p className="text-center opacity-70">

            {billCode === "0" ? "" : ` (Your note is #${billCode})`}
          </p>
        </div>
        <Input
          value={imgUrl}
          onChange={(e) => setImgUrl(e.target.value)}
          placeholder="Profile image"
        />
        <Input
          value={twitter}
          onChange={(e) => setTwitter(e.target.value)}
          placeholder="@twitter"
        />
        <ForceConnectButton>
          <Button disabled={isLoading} onClick={handleSetDocument}>Update</Button>
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

export default EditProfile
