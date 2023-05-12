import Button from "@/components/Button"
import Register from "@/components/Register"

export default function Home() {
  return (
    <section className="flex w-full flex-col gap-4">
      <Register />
      <p className="text-center text-white">Or</p>
      <Button type="outlined" asLink href="/vouch">
        Vouch
      </Button>
    </section>
  )
}
