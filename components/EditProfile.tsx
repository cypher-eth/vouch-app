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
          <h1 className="mb-2">Your Profile</h1>
          <p className="text-center opacity-60 text-lg">
            Your note: <strong className="font-semibold">{billCode}</strong>
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
