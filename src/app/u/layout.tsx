import Navbar from "@/components/shared/navbar";
import Sidebar from "@/components/shared/sidebar";
import { ThemeProvider } from "next-themes";

export default function UserLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider attribute="class" enableSystem enableColorScheme disableTransitionOnChange>
      <div className="flex flex-col h-full">
        <Navbar />
        <div className="flex flex-row w-full h-full items-start">
          <Sidebar>
            {children}
          </Sidebar>
        </div>
      </div>
    </ThemeProvider>
  )
}
