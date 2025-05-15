import { cn } from "@/lib/utils"

export default function Container({ children, className }: { children: React.ReactNode } & React.ComponentProps<"div">) {
  const cns = cn("flex self-center justify-self-center h-min w-full h-full 2xl:max-w-[1536px] mx-auto px-4 min-[1536px]:px-0", className)
  return (
    <div className={cns}>
      {children}
    </div>
  )
}
