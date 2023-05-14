import toast from "react-hot-toast"

export const toastError = (message: string) => toast.error(message)
export const toastNotConnected = () =>
  toastError("Cannot find a wallet to connect")

export const toastSuccess = (message: string, position?: "bottom-center") =>
  toast.success(
    message,
    position
      ? {
          position,
        }
      : undefined
  )
