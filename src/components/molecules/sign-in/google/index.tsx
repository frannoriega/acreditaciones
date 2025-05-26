import { Button } from "@/components/atoms/ui/button"
import { signInWithGoogle } from "@/services/auth"

export default function GoogleSignIn() {

  const submit = async () => {
    "use server"
    await signInWithGoogle()
  }
  return (
    <form
      action={submit}
      className="w-full"
    >
      <Button type="submit" className="w-full dark:bg-slate-900 dark:text-slate-100">Iniciar sesión con Google</Button>
    </form>
  )
}
