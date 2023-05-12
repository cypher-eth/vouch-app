import { Fragment, PropsWithChildren } from "react"
import Link from "next/link"
import { useRouter } from "next/router"

import { ConnectButton } from "@rainbow-me/rainbowkit"
import Image from "next/image"
import asset_logo from "@/assets/logo.webp"

function Navigation() {
  const { asPath } = useRouter()

  const RENDERED_LINKS = LINKS.map(({ href, name }) => {
    return (
      <NavButton
        href={href}
        key={`link-item-${href}`}
        isActive={asPath === href}
      >
        {name}
      </NavButton>
    )
  })

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
        <div className="hidden md:flex rounded-full bg-white p-1">
          {RENDERED_LINKS}
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

const NavButton = ({
  children,
  isActive,
  href,
}: PropsWithChildren<{ isActive: boolean; href: string }>) => {
  return (
    <Link
      href={href}
      className={`font-bold text-sm hover:text-opacity-80 rounded-full py-2 px-5 ${
        isActive ? "bg-rk-blue text-white" : "text-rk-blue"
      }`}
    >
      {children}
    </Link>
  )
}

const LINKS = [
  { name: "Register", href: "/" },
  { name: "Vouch", href: "/vouch" },
]

export default Navigation
