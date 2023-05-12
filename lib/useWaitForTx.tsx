import { Fragment, useCallback, useState } from "react"
import Link from "next/link"
import toast from "react-hot-toast"
import { HiExternalLink } from "react-icons/hi"

type WaitForTx = {
  successMessage?: string
  errorMessage?: string
  loadingMessage?: string
  onSuccess?: (txHash: string) => void
  onError?: (txHash: string) => void
}

const TRACKING: Record<string, boolean> = {}
const useWaitForTx = ({
  successMessage,
  loadingMessage,
  errorMessage,
  onSuccess,
  onError,
}: WaitForTx = {}) => {
  const waitForTx = useCallback(function (
    tx: { hash: string; wait: () => Promise<any> } | undefined,
    overrides: WaitForTx = {}
  ) {
    if (!tx) return
    // Early exit if undefined

    const { hash } = tx
    if (TRACKING[hash]) return
    // Early exit if already tracking this TX

    TRACKING[hash] = true
    // Turn tracking flag on

    const LOADING_MESSAGE = overrides.loadingMessage || loadingMessage
    const ERROR_MESSAGE = overrides.errorMessage || errorMessage
    const SUCESS_MESSAGE = overrides.successMessage || successMessage

    const toastId = toast.loading(
      <Fragment>
        <span>{LOADING_MESSAGE || "Loading..."}</span>{" "}
        <Link
          target="_blank"
          className="group gap-1 whitespace-nowrap inline-flex items-center ml-2 text-sm text-rk-blue hover:underline"
          href={`https://goerli.etherscan.io/tx/${hash}`}
        >
          <span>View TX</span>
          <HiExternalLink className="text-base group-hover:-translate-y-px group-hover:translate-x-px" />
        </Link>
      </Fragment>
    )

    ;(tx?.wait || Promise.resolve)()
      .then(() => {
        toast.dismiss(toastId)
        if (SUCESS_MESSAGE) setTimeout(() => toast.success(SUCESS_MESSAGE), 0)
        ;(overrides.onSuccess || onSuccess)?.(hash)
      })
      .catch(() => {
        if (ERROR_MESSAGE) toast.error(ERROR_MESSAGE)
        ;(overrides.onError || onError)?.(hash)
      })
  },
  [])

  return { waitForTx }
}

export default useWaitForTx
