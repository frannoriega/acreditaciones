'use client'

import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarRail, useSidebar } from "@/components/atoms/ui/sidebar"
import { CreditCard, Info, Users } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const links = [
  {
    href: "/u",
    title: "Información",
    icon: Info
  },
  {
    href: "/u/empleados",
    title: "Empleados",
    icon: Users
  },
  {
    href: "/u/pagos",
    title: "Pagos",
    icon: CreditCard
  }
]

export default function UserSidebar() {
  const url = usePathname()
  const { setOpen } = useSidebar()
  return (
    <Sidebar collapsible="icon" className="relative h-full group" onMouseOver={(e) => {
      e.preventDefault()
      setOpen(true)
    }} onMouseOut={(e) => {
      e.preventDefault()
      setOpen(false)
    }}>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {
                links.map(l => (
                  <SidebarMenuItem key={l.href}>
                    <SidebarMenuButton className={`h-full [&>svg]:size-6 ${url === l.href ? "dark:bg-slate-800" : "dark:hover:bg-slate-800"}`} asChild>
                      <Link href={l.href}>
                        {
                          l.icon && <l.icon size={24} />
                        }
                        <span>{l.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))
              }
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
