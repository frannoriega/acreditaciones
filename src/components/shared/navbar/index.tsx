import Container from "../container";
import { auth } from "@/auth";
import ProfileDropdown from "./dropdown";
import Logo from "../logo";
import ThemeButton from "@/components/shared/theme-button";
import { Separator } from "@/components/ui/separator";

export default async function Navbar() {
  const session = await auth()

  return (
    <div className="border-b w-full bg-slate-100 dark:bg-slate-900 h-min">
      <Container className="py-4 flex flex-row justify-between">
        <Logo className="max-h-8 w-min fill-slate-900 dark:fill-slate-100"/>
        <div className="flex flex-row gap-4 h-full items-center justify-center">
          <ThemeButton className="text-slate-900 dark:text-slate-100 h-full" />
          <Separator className="data-[orientation=vertical]:h-3/4 bg-slate-900 dark:bg-slate-100" orientation="vertical" decorative />
          <ProfileDropdown avatar_url={session?.user?.image ?? ""} />
        </div>
      </Container>
    </div>
  )
}
