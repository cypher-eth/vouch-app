import { useRouter } from "next/router"
import { useAccountMetadata } from "@/lib/vouch"
import { useConnectedAccount } from "@/lib/wagmi"

import Register from "@/components/Register"
import Vouch from "@/components/Vouch"

export default function Home() {
  const { vouch } = useRouter().query as { vouch: string }
  const { address: connectedAddy } = useConnectedAccount()
  const { latestBillCode } = useAccountMetadata(connectedAddy)

  if (["0", ""].includes(latestBillCode) || vouch) {
    // No-Vouch or Empty
    return (
      <section className="flex w-full flex-col gap-4">
        <Register vouchId={vouch} />
      </section>
    )
  }

  return (
    <section className="flex w-full flex-col gap-4">
      <Vouch billCode={latestBillCode} />
    </section>
  )
}
