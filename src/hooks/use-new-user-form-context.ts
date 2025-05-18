import { NewUserFormContext } from "@/components/new-user-provider"
import { useContext } from "react"

export const useNewUserFormContext = () => {
  const context = useContext(NewUserFormContext)
  if (!context) {
    throw new Error('useNewUserFormContext must be used within a NewUserFormContextProvider')
  }

  return context
}
