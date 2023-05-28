/* eslint-disable @next/next/no-img-element */
import qrcode from "qrcode"
import copy from "clipboard-copy"
import { useEffect, useState } from "react"

import { toastSuccess } from "@/lib/toaster"
import { MdOutlineContentCopy } from "react-icons/md"
import NavTitle from "./NavTitle"

function QrCode({ billCode }: { billCode: string }) {
  const [qr, setQr] = useState({
    imageURL: "",
    url: "",
  })

  useEffect(() => {
    const url = `${location.origin}?vouch=${billCode}`
    if (billCode) {
      qrcode.toDataURL(
        url,
        {
          width: 480,
          margin: 2,
        },
        (err, imageURL) => {
          if (!err) {
            setQr({
              imageURL,
              url,
            })
          }
        }
      )
    }
  }, [billCode])

  function handleCopyToClipboard() {
    copy(qr.url)
    toastSuccess("Copied to clipboard!", "bottom-center")
  }

  return (
    <section>
      <NavTitle href="/edit">Share Note</NavTitle>
      {qr.imageURL && (
        <div className="max-w-[90vw] mx-auto mt-6">
          <figure className="overflow-hidden rounded-xl">
            <img className="block" src={qr.imageURL} alt="" />
          </figure>

          <nav className="flex mt-4 relative justify-end items-center overflow-hidden bg-white/50 text-black/80 rounded-xl text-sm">
            <span className="px-4 flex-grow whitespace-nowrap">{qr.url}</span>
            <button
              onClick={handleCopyToClipboard}
              className="group flex-shrink-0 bg-white/70 flex items-center justify-center w-12 h-12"
            >
              <MdOutlineContentCopy className="text-xl group-hover:scale-105" />
            </button>
          </nav>
        </div>
      )}
    </section>
  )
}
export default QrCode
