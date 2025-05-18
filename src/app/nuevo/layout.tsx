'use client'

import { UserFormContextProvider } from "@/components/new-user-provider";
import Container from "@/components/shared/container";
import Logo from "@/components/shared/logo";

export default function NewUserLayout({ children }: { children: React.ReactNode }) {
  return (
    <UserFormContextProvider>
      <div className="overflow-scroll flex flex-col h-full bg-gradient-to-b from-[#FFFA20] to-[#F229D9] items-center justify-between py-16">
        <Container className="flex flex-col item-center">

          <div className="w-full min-h-min h-full flex flex-col items-center justify-center">
            <Logo className="fill-white p-8 my-auto" />
          </div>
          <div>
            {children}
          </div>
        </Container>
      </div>
    </UserFormContextProvider>
  )
}
