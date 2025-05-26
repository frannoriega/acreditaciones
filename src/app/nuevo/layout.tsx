'use client'

export default function NewUserLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="overflow-y-scroll flex flex-col w-full h-full bg-slate-100 dark:bg-slate-900 items-center bg-gradient-to-b from-[#FFFA20] to-[#F229D9]">
      {children}
    </div>
  )
}
