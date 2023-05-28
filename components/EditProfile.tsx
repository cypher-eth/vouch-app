import { toastError } from "@/lib/toaster"
import { useAccountMetadata, useUnregisterBill } from "@/lib/vouch"
import Button from "@/components/Button"
import useWaitForTx from "@/lib/useWaitForTx"

import { ForceConnectButton } from "./Register"
import NoVouchs from "./NoVouchs"
import NavTitle from "./NavTitle"

function EditProfile({
  billCode,
  account,
}: {
  billCode: string
  account: string
}) {
  const { vouchCount } = useAccountMetadata(account)

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
      <section className="flex flex-col gap-4 mb-4">
        <div>
          <NavTitle href="/">Your Profile</NavTitle>
          <p className="text-center opacity-60 text-lg">
            Your note: <strong className="font-semibold">{billCode}</strong>
          </p>

          <div className="flex mt-20 flex-col items-center justify-center gap-2">
            <div className="bg-black/10 text-xl font-semibold backdrop-blur w-12 h-12 rounded-full flex items-center justify-center">
              {vouchCount}
            </div>
            <p className="text-center opacity-60 text-lg">Times Vouched</p>
          </div>
        </div>
        <ForceConnectButton>
          <Button disabled={isLoading} onClick={handleUnregister}>
            Remove
          </Button>
        </ForceConnectButton>
        <ForceConnectButton>
          <Button asLink href="/share" type="outlined">
            Share
          </Button>
        </ForceConnectButton>
      </section>
    )
  }

  return <NoVouchs />
}

export default EditProfile
