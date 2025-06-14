'use client'
import { Badge } from "@/components/atoms/ui/badge"
import { Button } from "@/components/atoms/ui/button"
import { Command, CommandInput, CommandItem, CommandList } from "@/components/atoms/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/atoms/ui/popover"
import { CircleX } from "lucide-react"
import {  useEffect, useState } from "react"
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

type MultiSelectProps = {
  onValueChange: (vals: Map<string, number>) => void
}

function MultiSelect({ onValueChange }: MultiSelectProps) {
  const [selected, setSelected] = useState<MultiSet<{ label: string, value: string, bg: string }>>(new MultiSet());
  const [values, setValues] = useState<Map<string, number>>(new Map())

  useEffect(() => {
    onValueChange(values)
  }, [onValueChange, values])

  const [open, setOpen] = useState(false)

  return (
    <div className="h-full flex flex-row gap-4 items-center">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline">
            Agregar músicos
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-2">
          <Command>
            <CommandInput placeholder="Buscar..." />
            <CommandList className="pt-2 w-full">
              {items.map((item, index) => (
                <CommandItem key={index} onSelect={() => {
                  const newSet = MultiSet.from(selected.values());
                  newSet.add(item);
                  setSelected(newSet);
                  setValues(map => {
                    const newMap = new Map(map)
                    if (newMap.has(item.value)) {
                      const old = newMap.get(item.value)
                      newMap.set(item.value, (old ?? 0) + 1)
                    } else {
                      newMap.set(item.value, 1)
                    }
                    return newMap
                  })
                }} className="w-full">
                  {item.label}
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
                type="button"
                onClick={() => {
                  const newSet = MultiSet.from(selected.values());
                  newSet.remove(item);
                  setSelected(newSet);
                  setValues(map => {
                    const newMap = new Map(map)
                    if (newMap.has(item.value)) {
                      const old = newMap.get(item.value)
                      newMap.set(item.value, (old ?? 1) - 1)
                    } else {
                      newMap.set(item.value, 0)
                    }
                    return newMap
                  })
                }
                }
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
