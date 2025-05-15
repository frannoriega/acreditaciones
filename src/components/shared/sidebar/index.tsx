'use client'

import { CreditCard, Info, Users } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

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

export default function Sidebar({ children }: { children?: React.ReactNode }) {
  const url = usePathname()
  return (
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
  )
}

function SidebarItem({ children, href, selected }: { children: React.ReactNode, href: string, selected: boolean }) {
  return (
    <Link href={href} className={`w-full h-16 flex flex-col items-center justify-center ${selected ? "dark:bg-slate-800" : "dark:hover:bg-slate-800"}`}>
      {children}
    </Link>
  )
}
