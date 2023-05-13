import { toastError } from "@/lib/toaster"
import { useUnregisterBill } from "@/lib/vouch"
import Button from "@/components/Button"
import useWaitForTx from "@/lib/useWaitForTx"

import { ForceConnectButton } from "./Register"
import NoVouchs from "./NoVouchs"

function EditProfile({ billCode }: { billCode: string }) {
  const { waitForTx } = useWaitForTx({
    successMessage: "Bill Unregistered!",
    errorMessage: "Oops, something went wrong.",
  })

  const {
    write: unregister,
    data: txReceipt,
    isLoading,
  } = useUnregisterBill(billCode!)

  function handleUnregister() {
    if (!billCode?.length) return toastError("Bill cannot be empty")
    unregister?.()
  }

  waitForTx(txReceipt)

  if (billCode) {
    return (
      <section className="flex flex-col gap-4">
        <div>
          <h1 className="mb-2">Edit Profile</h1>
        </div>
        <div>
          <p className="text-center">
            Unregister your note {billCode === "0" ? "" : ` ${billCode}`}
          </p>
        </div>
        <ForceConnectButton>
          <Button disabled={isLoading} onClick={handleUnregister}>
            Unregister
          </Button>
        </ForceConnectButton>
      </section>
    )
  }

  return <NoVouchs />
}

export default EditProfile
