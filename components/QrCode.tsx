import QRCode from 'qrcode'
import { useState } from 'react'
import Button from "@/components/Button"
import { ForceConnectButton } from "./Register"

function QrCode({ billCode }: { billCode: string }) {

    const origin =
        typeof window !== 'undefined' && window.location.origin
            ? window.location.origin
            : '';

    const [url, setUrl] = useState('')
    // setUrl(origin + '/vouch/' + billCode)

    const [qr, setQr] = useState('')
    const GenerateQRCode = () => {
         setUrl(origin + '/vouch/' + billCode)
        QRCode.toDataURL(url, {
            width: 800,
            margin: 2,
            color: {
                // dark: '#335383FF',
                // light: '#EEEEEEFF'
            }
        }, (err, url) => {
            if (err) return console.error(err)
            console.log(url)
            setQr(url)
        })
    }
    return (
      <section className="flex flex-col gap-4">
        <div>
            <h1>Share Note</h1>
        </div>
        <ForceConnectButton>
            <Button onClick={GenerateQRCode}>Generate QR</Button>
        </ForceConnectButton>
            {qr && <>
                <img src={qr} />
                <div>{url}</div>
            </>}
        
        </section>
    )
}
export default QrCode