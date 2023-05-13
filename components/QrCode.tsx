/* eslint-disable @next/next/no-img-element */
import qrcode from "qrcode"
import { useEffect, useState } from "react"

function QrCode({ billCode }: { billCode: string }) {
  const [qr, setQr] = useState({
    imageURL: "",
    url: "",
  })

  useEffect(() => {
    const url = `${location.origin}/vouch?code=${billCode}`
    if (billCode) {
      qrcode.toDataURL(
        url,
        {
          width: 800,
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

  return (
    <section className="flex flex-col gap-4">
      <div>
        <h1>Share Note</h1>
      </div>

      {qr.imageURL && (
        <>
          <img src={qr.imageURL} alt="" />
          <div>{qr.url}</div>
        </>
      )}
    </section>
  )
}
export default QrCode
