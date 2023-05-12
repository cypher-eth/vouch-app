import Button from "@/components/Button"
import Register from "@/components/Register"

import { useAccountMetadata } from "@/lib/vouch"
import { useConnectedAccount } from "@/lib/wagmi"

export default function Home() {
  const { address: connectedAddy } = useConnectedAccount()
  const { latestBillCode } = useAccountMetadata(connectedAddy)
  console.log(latestBillCode)

  return (
      <section className="flex w-full flex-col gap-4">
        <Register />
      </section>
  )
  
}
