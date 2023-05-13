import NoVouchs from "@/components/NoVouchs"
import QrCode from "@/components/QrCode"

import { useAccountMetadata } from "@/lib/vouch"
import { useConnectedAccount } from "@/lib/wagmi"

export default function Home() {
  const { address: connectedAddy } = useConnectedAccount()
  const { latestBillCode } = useAccountMetadata(connectedAddy)

  if (latestBillCode) {
    return <QrCode billCode={latestBillCode} />
  }

  return <NoVouchs />
}
