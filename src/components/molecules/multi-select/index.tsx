'use client'
import { Badge } from "@/components/atoms/ui/badge"
import { Button } from "@/components/atoms/ui/button"
import { Command, CommandInput, CommandItem, CommandList } from "@/components/atoms/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/atoms/ui/popover"
import { CircleX } from "lucide-react"
import { useState } from "react"
import { MultiSet } from "mnemonist"

const items = [
  {
    label: "Guitarrista",
    value: "guitar",
    bg: "bg-[#FFC192]"
  },
  {
    label: "Tecladista",
    value: "keyboard",
    bg: "bg-[#F97BC2]"
  }
]

function MultiSelect({ children }: React.ComponentProps<"div">) {
  const [selected, setSelected] = useState<MultiSet<{ label: string, value: string, bg: string }>>(new MultiSet())
  const [open, setOpen] = useState(false)

  return (
    <div className="h-full flex flex-row gap-4 items-center">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline">
            Seleccione los instrumentos
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <Command>
            <CommandInput placeholder="Buscar..." />
            <CommandList className="w-56">
              {items.map((i, e) => (
                <CommandItem key={e} onSelect={() => {
                  setSelected(sel => {
                    const newSet = MultiSet.from(sel.values())
                    newSet.add(i)
                    return newSet
                  })
                }}>
                  {i.label}
                </CommandItem>
              ))}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <ul className="flex flex-row gap-2 flex-wrap w-full">
        {Array.from(selected.values()).map((item, index) => (
          <li key={index}>
            <Badge className={item.bg}>
              <span key={index}>
                {item.label}
              </span>
              <Button
                onClick={() => setSelected(sel => {
                  const newSet = MultiSet.from(sel.values())
                  newSet.remove(item)
                  return newSet
                })}
                className="w-4 h-4 p-0 m-0 bg-transparent"
              >
                <CircleX className="w-4 h-4" />
              </Button>
            </Badge>
          </li>
        ))
        }
      </ul>
    </div>
  )
}

export {
  MultiSelect
}
