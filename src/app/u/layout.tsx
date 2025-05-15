import Navbar from "@/components/shared/navbar";
import { CreditCard, Info, Users } from "lucide-react";
import { ThemeProvider } from "next-themes";
import Link from "next/link";
import { headers } from "next/headers"

const links = [
  {
    href: "/u",
    icon: <Info size={24} />
  },
  {
    href: "/u/empleados",
    icon: <Users size={24} />
  },
  {
    href: "/u/pagos",
    icon: <CreditCard size={24} />
  }
]

export default async function UserLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const headersList = await headers()
  const url = headersList.get('x-url') ?? ''
  return (
    <ThemeProvider attribute="class" enableSystem enableColorScheme disableTransitionOnChange>
      <div className="flex flex-col h-full">
        <Navbar />
        <div className="flex flex-row w-full h-full items-start">
          <div className="dark:bg-slate-900 flex flex-col w-16 h-full items-start justify-start">
            {
              links.map(l => (
                <SidebarItem key={l.href} href={l.href} selected={url === l.href}>
                  {l.icon}
                </SidebarItem>
              ))
            }
          </div>
          <div className="flex flex-col w-full items-center">
            {children}
          </div>
        </div>
      </div>
    </ThemeProvider>
  )
}

function SidebarItem({ children, href, selected }: { children: React.ReactNode, href: string, selected: boolean }) {
  return (
    <Link href={href} className={`w-full h-16 flex flex-col items-center justify-center ${selected ? "dark:bg-slate-800" : "dark:hover:bg-slate-800"}`}>
      {children}
    </Link>
  )
}
