import Button from "@/components/Button"
import Register from "@/components/Register"
import Vouch from "@/components/Vouch"

import { useAccountMetadata } from "@/lib/vouch"
import { useConnectedAccount } from "@/lib/wagmi"

export default function Home() {
  const { address: connectedAddy } = useConnectedAccount()
  const { latestBillCode } = useAccountMetadata(connectedAddy)

  if (latestBillCode == "0") {
    return (
      <section className="flex w-full flex-col gap-4">
        <Register />
      </section>
    )
  }
  return (
    <section className="flex w-full flex-col gap-4">
      <Vouch billCode={latestBillCode} />
    </section>
  )


}
