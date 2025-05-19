'use client'

import { UserFormContextProvider } from "@/components/new-user-provider";

export default function NewUserLayout({ children }: { children: React.ReactNode }) {
  return (
    <UserFormContextProvider>
      <div className="overflow-scroll flex flex-col h-full bg-slate-100 dark:bg-slate-900 items-center">
        {children}
      </div>
    </UserFormContextProvider>
  )
}
