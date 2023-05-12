import { classnames } from "@/lib/helpers"
import { DetailedHTMLProps, InputHTMLAttributes } from "react"

type InputProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>

function Input(props: InputProps) {
  return (
    <input
      {...props}
      className={classnames(
        "border-b-[1.5px] placeholder:text-white/60 text-white bg-transparent border-white py-3 px-4 focus:outline-none w-full",
        props.className
      )}
    />
  )
}

export default Input
