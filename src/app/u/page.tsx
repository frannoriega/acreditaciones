import Container from "@/components/atoms/container";
import Status from "@/components/molecules/status";


export default async function UserPage() {
  return (
    <Container className="pt-4 flex flex-col bg-slate-50 dark:bg-slate-950">
      <Status />
    </Container>
  )
}
