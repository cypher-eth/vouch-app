import { Fragment } from "react"
import Link from "next/link"

import { ConnectButton } from "@rainbow-me/rainbowkit"
import Image from "next/image"
import asset_logo from "@/assets/logo.webp"

function Navigation() {
  return (
    <Fragment>
      <section className="w-full flex justify-center items-center gap-12 max-w-screen-md mx-auto">
        <div className="w-full flex items-center">
          <Link href="/">
            <figure className="w-[3rem] sm:w-[4rem]">
              <Image placeholder="blur" src={asset_logo} alt="" />
            </figure>
          </Link>
        </div>

        <div className="flex [&_button]:!rounded-full whitespace-nowrap w-full items-center justify-end">
          <ConnectButton
            accountStatus={{
              largeScreen: "full",
              smallScreen: "address",
            }}
            showBalance={false}
          />
        </div>
      </section>
    </Fragment>
  )
}

export default Navigation
