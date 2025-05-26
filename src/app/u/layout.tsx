import { auth } from "@/auth";
import Navbar from "@/components/organisms/navbar";
import UserSidebar from "@/components/organisms/sidebar";
import { SidebarProvider } from "@/components/atoms/ui/sidebar";
import { redirect } from "next/navigation";

export default async function UserLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session) {
    redirect("/")
  }
  return (
    <SidebarProvider defaultOpen={false} className="w-full flex flex-col h-full">
      <Navbar />
      <div className="min-h-screen w-full flex flex-row">
        <UserSidebar />
        <div className="flex flex-col w-full items-center">
          {children}
        </div>
      </div>
    </SidebarProvider>
  )
}
