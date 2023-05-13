import { useRouter } from "next/router"
import { useAccountMetadata } from "@/lib/vouch"
import { useConnectedAccount } from "@/lib/wagmi"

import Register from "@/components/Register"
import Vouch from "@/components/Vouch"

export default function Home() {
  const { vouch } = useRouter().query as { vouch: string }
  const { address: connectedAddy } = useConnectedAccount()
  const { latestBillCode } = useAccountMetadata(connectedAddy)

  if (latestBillCode === "") {
    // No-Vouch or Empty
    return <Register />
  }

  return <Vouch palNote={vouch} billCode={latestBillCode} />
}
