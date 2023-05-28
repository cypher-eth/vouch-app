import type { PropsWithChildrenCx } from "@/types/shared"
import type { HTMLProps } from "react"
import Link from "next/link"
import { classnames } from "@/lib/helpers"

function Button({
  children,
  className,
  type = "white",
  asLink,
  ...props
}: PropsWithChildrenCx<
  HTMLProps<HTMLButtonElement> & {
    type?: "white" | "outlined"
    href?: string
    asLink?: boolean
    target?: "_blank"
  }
>) {
  const Container = asLink ? Link : "button"
  return (
    <Container
      {...(props as any)}
      className={classnames(
        className,
        className?.includes("py-") || "py-3.5",
        className?.includes("px-") || "px-16",
        "filter uppercase text-black font-title text-center hover:contrast-[1.15] text-lg shadow-xl rounded-full font-semibold border-opacity-20",
        "hover:scale-[1.02] transition-all duration-75",
        type === "white" && "bg-white",
        type === "outlined" && "bg-white/10 border-2 border-white",
        props.disabled &&
          "cursor-not-allowed grayscale text-opacity-50 hover:contrast-100"
      )}
    >
      {children}
    </Container>
  )
}

export default Button
