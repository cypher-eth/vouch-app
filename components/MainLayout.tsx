import { Fragment, type PropsWithChildren } from "react"
import Image from "next/image"
import Navigation from "@/components/Navigation"
import asset_bg from "@/assets/bg.webp"
import Link from "next/link"

function MainLayout({ children }: PropsWithChildren) {
  return (
    <Fragment>
      <figure className="fixed inset-0">
        <Image
          className="!h-[115%] lg:!h-[100%] object-cover object-top"
          src={asset_bg}
          alt=""
          placeholder="blur"
          fill
        />
      </figure>
      <main className="px-4 flex flex-col relative z-[1] sm:px-6 pt-5 lg:pt-12 pb-8 min-h-screen">
        <Navigation />
        <section className="mt-20 lg:mt-32 flex flex-col gap-8 items-center w-full max-w-md mx-auto">
          {children}
        </section>
        <div className="flex-grow" />
        <footer className="flex gap-8 mt-16 text-xl items-center justify-center max-w-screen-sm mx-auto">
          <Link className="font-title hover:text-o3-pink" href="/edit">
            Profile
          </Link>
          <Link className="font-title hover:text-o3-pink" href="/share">
            Share
          </Link>
          <Link
            target="_blank"
            className="font-title hover:text-o3-pink"
            href="https://t.me/c/1871610495/714/737"
          >
            Telegram
          </Link>
          <Link
            target="_blank"
            className="font-title hover:text-o3-pink"
            href="https://twitter.com/blockravers"
          >
            Twitter
          </Link>
        </footer>
      </main>
    </Fragment>
  )
}

export default MainLayout
