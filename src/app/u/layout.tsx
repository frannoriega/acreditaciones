import Navbar from "@/components/shared/navbar";
import UserSidebar from "@/components/shared/sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { ThemeProvider } from "next-themes";

export default function UserLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider attribute="class" enableSystem enableColorScheme disableTransitionOnChange>
      <SidebarProvider defaultOpen={false} className="w-full flex flex-col h-full">
        <Navbar />
        <div className="min-h-screen w-full flex flex-row">
          <UserSidebar />
          <div className="flex flex-col w-full items-center">
            {children}
          </div>
        </div>
      </SidebarProvider>
    </ThemeProvider >
  )
}
