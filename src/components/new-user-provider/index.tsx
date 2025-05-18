import { NewUser } from "@/types/new-user"
import { createContext, useState } from "react"

export interface UserContextProps {
  user: NewUser | null,
  updateUserData: (property: Partial<NewUser>) => void
}

export const NewUserFormContext = createContext<UserContextProps | null>({
  user: null,
  updateUserData: () => null
})

export function UserFormContextProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<NewUser | null>(null)

  // adding this code 👇🏽
  const updateUserData = (values: Partial<NewUser>) => {
    setUser({ ...user, ...values })
  }

  return (
    <NewUserFormContext.Provider value={{ user, updateUserData }}>
      {children}
    </NewUserFormContext.Provider>
  )
}
