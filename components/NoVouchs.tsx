import Button from "./Button"

function NoVouchs() {
  return (
    <section className="flex flex-col gap-8">
      <div>
        <h1 className="mb-2">No Bills Found</h1>
        <p className="text-center opacity-70">
          You must register a Bill to continue.
        </p>
      </div>
      <Button asLink href="/">
        REGISTER
      </Button>
    </section>
  )
}

export default NoVouchs
