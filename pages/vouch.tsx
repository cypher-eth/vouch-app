import { Fragment } from "react"
import Button from "@/components/Button"
import Vouch from "@/components/Vouch"

import { useAccountMetadata } from "@/lib/vouch"
import { useConnectedAccount } from "@/lib/wagmi"

export default function Home() {
  const { address: connectedAddy } = useConnectedAccount()
  const { latestBillCode } = useAccountMetadata(connectedAddy)

  return (
    <section className="flex w-full flex-col gap-4">
      <Vouch billCode={latestBillCode} />
      {latestBillCode && (
        <Fragment>
          <p className="text-center text-white">Or</p>
          <Button type="outlined" asLink href="/">
            Register
          </Button>
        </Fragment>
      )}
    </section>
  )
}
