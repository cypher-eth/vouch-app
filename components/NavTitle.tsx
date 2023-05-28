import type { PropsWithChildren } from "react"
import Link from "next/link"
import { GoChevronLeft } from "react-icons/go"

function NavTitle({ children, href }: PropsWithChildren<{ href: string }>) {
  return (
    <nav className="flex items-center justify-center gap-3 md:gap-6 mb-2 pr-6 md:pr-9">
      <Link href={href} className="text-2xl md:text-3xl group">
        <GoChevronLeft className="group-hover:-translate-x-px" />
      </Link>
      <h1 className="m-0">{children}</h1>
    </nav>
  )
}

export default NavTitle
