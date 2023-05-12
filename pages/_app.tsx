import "@/styles/globals.css"
import "@rainbow-me/rainbowkit/styles.css"
import type { AppProps } from "next/app"

import localFont from "@next/font/local"
import { Inter } from "@next/font/google"
import { WagmiConfig, createClient, configureChains } from "wagmi"
import { goerli } from "wagmi/chains"
import { publicProvider } from "wagmi/providers/public"
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit"
import { Toaster } from "react-hot-toast"
import MainLayout from "@/components/MainLayout"

const { provider, chains } = configureChains([goerli], [publicProvider()])

const { connectors } = getDefaultWallets({
  appName: "153153153.xyz",
  // replace with your appUrl or appName
  chains,
})

const client = createClient({
  autoConnect: true,
  provider,
  connectors,
})

const nextFont = Inter({
  weight: ["500", "700"],
  subsets: [],
})

const titleFont = localFont({
  src: [
    {
      path: "../assets/fonts/gravity/Gravity-1000.woff2",
      weight: "800",
    },
    {
      path: "../assets/fonts/gravity/Gravity-500.woff2",
      weight: "500",
    },
  ],
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={nextFont.className}>
      <style
        dangerouslySetInnerHTML={{
          __html: `
            :root {
              --font-title: ${titleFont.style.fontFamily};
            }
            :root [data-rk] {
              --rk-radii-modal: 1rem;
              --rk-radii-connectButton: 999px;
            }
            [data-rk] *:not(.font-title) {
              font-family: ${nextFont.style.fontFamily} !important;
            }
          `,
        }}
      />
      <Toaster
        position="top-right"
        containerClassName="mt-14 md:mt-16 lg:mt-24 max-w-screen-md mx-auto"
        toastOptions={{
          className: "!rounded-full select-none",
        }}
      />
      <WagmiConfig client={client}>
        <RainbowKitProvider chains={chains}>
          <MainLayout>
            <Component {...pageProps} />
          </MainLayout>
        </RainbowKitProvider>
      </WagmiConfig>
    </main>
  )
}
