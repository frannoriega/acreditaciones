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
  const { setOpen, open } = useSidebar()
  
  return (
    <div 
      className={`absolute left-0 top-0 z-10 h-full flex flex-col border-r bg-sidebar transition-all duration-300 ease-out ${open ? 'w-64' : 'w-16'}`}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <div className="flex h-full w-full flex-col">
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {
                  links.map(l => (
                    <SidebarMenuItem key={l.href}>
                      <SidebarMenuButton 
                        className={`h-full [&>svg]:size-6 ${url === l.href ? "dark:bg-slate-800" : "dark:hover:bg-slate-800"}`} 
                        asChild
                      >
                        <Link href={l.href}>
                          {
                            l.icon && <l.icon size={24} />
                          }
                          <span 
                            className={`transition-all duration-200 ease-out whitespace-nowrap ${open ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'}`}
                          >
                            {l.title}
                          </span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))
                }
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </div>
    </div>
  )
}
