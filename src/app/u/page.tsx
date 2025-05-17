import Container from "@/components/shared/container"
import Status from "@/components/status"


export default async function UserPage() {
  return (
    <Container className="pt-4 flex flex-col bg-slate-50 dark:bg-slate-950">
      <Status />
    </Container>
  )
}
