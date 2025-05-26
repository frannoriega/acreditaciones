import { signOut } from "@/auth";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/atoms/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/atoms/ui/avatar";
import Link from "next/link";
import { Separator } from "@/components/atoms/ui/separator";

export default function ProfileDropdown({ avatar_url }: { avatar_url: string }) {
  async function logout() {
    "use server"
    await signOut({
      redirectTo: "/",
    })
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={avatar_url} />
          <AvatarFallback></AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="flex flex-col gap-2">
        <DropdownMenuGroup className="md:hidden">
          <DropdownMenuLabel>
            Navegación
          </DropdownMenuLabel>
          <DropdownMenuItem asChild>
            <Link href="/u">Información</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/u/empleados">Empleados</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/u/pagos">Pagos</Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <Separator orientation="horizontal" className="md:hidden"/>
        <DropdownMenuItem onSelect={logout}>
          Cerrar sesión
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
