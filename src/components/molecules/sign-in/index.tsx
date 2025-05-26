import { Separator } from "@/components/atoms/ui/separator"
import GoogleSignIn from "./google"
import { ResendSignIn } from "./resend"

export default function SignIn() {
  return (
    <div className="flex flex-col max-w-sm w-full items-center gap-2">
      <GoogleSignIn />
      <div className="flex flex-row gap-2 w-full align-middle items-center justify-center">
        <div className="w-full">
          <Separator orientation="horizontal" className="bg-slate-200" decorative />
        </div>
        <span className="text-slate-200">o</span>
        <div className="w-full bg-slate-200">
          <Separator orientation="horizontal" decorative />
        </div>
      </div>
      <ResendSignIn />
    </div>
  )
}
