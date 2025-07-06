import Container from "@/components/atoms/container";
import Status from "@/components/molecules/status";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getUserApplicationStatus } from "@/services/users/application-status";

export default async function UserPage() {
  const session = await auth();
  
  if (!session?.user?.email) {
    redirect("/");
  }

  const userEmail = session.user.email;
  const status = await getUserApplicationStatus(userEmail);

  if (!status.hasApplied) {
    redirect("/nuevo");
  }

  return (
    <Container className="pt-4 flex flex-col bg-slate-50 dark:bg-slate-950">
      <Status />
    </Container>
  )
}
