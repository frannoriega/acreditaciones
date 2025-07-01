'use client'
import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { Badge } from "@/components/atoms/ui/badge"
import { Button } from "@/components/atoms/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/atoms/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/atoms/ui/popover"
import { CheckIcon, CircleX } from "lucide-react"
import { cn } from "@/lib/utils"

interface MultiSelectContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  selectedValue: { value: string; label: string; }[];
  searchQuery: string;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
  contentRef: React.RefObject<HTMLDivElement | null>;
  onValueChange: (values: { value: string; label: string; }[]) => void;
  onSearchChange: (query: string) => void;
  onTriggerClick: () => void;
  onContentBlur: () => void;
}

const MultiSelectContext = createContext<MultiSelectContextValue | null>(null);

export function MultiSelect({ children, defaultValues = [], onValueChange, className }: {
  children: React.ReactNode;
  defaultValues?: { value: string; label: string; }[];
  onValueChange?: (values: { value: string; label: string; }[]) => void;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const [selectedValues, setSelectedValues] = useState<{ value: string; label: string; }[]>(defaultValues);
  const [searchQuery, setSearchQuery] = useState('');
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  const handleValueChange = (values: { value: string; label: string; }[]) => {
    setSelectedValues(values);
    onValueChange?.(values);
    setOpen(false);
    setSearchQuery('');
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  const handleTriggerClick = () => {
    setOpen(!open);
  };

  const handleContentBlur = () => {
    setOpen(false);
    setSearchQuery('');
  };

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (contentRef.current &&
        !contentRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)) {
        setOpen(false);
        setSearchQuery('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const contextValue: MultiSelectContextValue = {
    open,
    setOpen,
    selectedValue: selectedValues,
    searchQuery,
    triggerRef,
    contentRef,
    onValueChange: handleValueChange,
    onSearchChange: handleSearchChange,
    onTriggerClick: handleTriggerClick,
    onContentBlur: handleContentBlur,
  };

  const cns = cn("h-full w-fit flex flex-row gap-4 items-center", className)

  return (
    <MultiSelectContext.Provider value={contextValue}>
      <div className={cns}>
        {children}
      </div>
    </MultiSelectContext.Provider>
  );
}

export function MultiSelectValues({ className }: {
  className?: string
}) {
  const context = useContext(MultiSelectContext);
  if (!context) throw new Error('MultiSelectBadges must be used within MultiSelect');
  const cns = cn("w-full justify-between", className)

  return (
    <ul className="flex flex-row gap-2 flex-wrap w-full">
      {context.selectedValue.map((item, index) => (
        <li key={index}>
          <Badge className={cns} data-sel={item.value} >
            <span key={index}>
              {item.label}
            </span>
            <Button
              type="button"
              onClick={() => {
                const newVals = context.selectedValue.filter(v => v.value != item.value)
                context.onValueChange(newVals)
              }}
              className="w-4 h-4 p-0 m-0 bg-transparent"
            >
              <CircleX className="w-4 h-4" />
            </Button>
          </Badge>
        </li>
      ))
      }
    </ul>
  )
}

export function MultiSelectMenu({ children }: {
  children: React.ReactNode;
}) {
  const context = useContext(MultiSelectContext);
  if (!context) throw new Error('MultiSelectMenu must be used within MultiSelect');

  const { open, setOpen } = context

  return (
    <Popover open={open} onOpenChange={setOpen} modal={true}>
      {children}
    </Popover>
  );
}

export function MultiSelectTrigger({ children, className }: {
  children: React.ReactNode;
  className?: string;
}) {
  const context = useContext(MultiSelectContext);
  if (!context) throw new Error('MultiSelectTrigger must be used within MultiSelect');

  const { onTriggerClick, triggerRef } = context;

  const cns = cn("w-fit min-w-80 justify-between", className)

  return (
    <PopoverTrigger asChild>
      <Button
        ref={triggerRef}
        variant="outline"
        role="combobox"
        onClick={onTriggerClick}
        className={cns}
      >
        {children}
      </Button>
    </PopoverTrigger>
  );
}

export function MultiSelectContent({ children, className }: {
  children: React.ReactNode;
  className?: string;
}) {
  const context = useContext(MultiSelectContext);
  if (!context) throw new Error('MultiSelectContent must be used within MultiSelect');

  const { open, contentRef } = context;

  if (!open) return null;

  const cns = cn("w-(--radix-popover-trigger-width) p-0 z-[9999]", className)

  return (
    <PopoverContent 
      ref={contentRef} 
      className={cns} 
      align="start" 
      sideOffset={4}
    >
      <Command className="p-0">
        {children}
      </Command>
    </PopoverContent>
  );
}

export function MultiSelectInput({ placeholder = 'Search...', className }: {
  placeholder?: string;
  className?: string;
}) {
  const context = useContext(MultiSelectContext);
  if (!context) throw new Error('MultiSelectInput must be used within MultiSelect');

  const { searchQuery, onSearchChange } = context;
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input when content opens
  useEffect(() => {
    if (context.open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [context.open]);

  return (
    <CommandInput placeholder={placeholder} className={className} onValueChange={onSearchChange} value={searchQuery} />
  );
}

export function MultiSelectList({ children, className }: {
  children: React.ReactNode;
  className?: string;
}) {
  const context = useContext(MultiSelectContext);
  if (!context) throw new Error('MultiSelectList must be used within MultiSelect');

  return (
    <CommandList className={className}>
        {children}
    </CommandList>
  );
}

export function MultiSelectGroup({ children, className, heading }: {
  children: React.ReactNode;
  className?: string;
  heading?: string;
}) {
  const context = useContext(MultiSelectContext);
  if (!context) throw new Error('MultiSelectGroup must be used within MultiSelect');

  return (
    <CommandGroup className={className} heading={heading}>
      {children}
    </CommandGroup>
  );
}

export function MultiSelectEmpty({ children, className }: {
  children: React.ReactNode;
  className?: string;
}) {

  const context = useContext(MultiSelectContext);
  if (!context) throw new Error('MultiSelectList must be used within MultiSelect');

  const cns = cn("text-muted-foreground p-1 text-md", className)

  return (
    <CommandEmpty className={cns} >
      {children}
    </CommandEmpty>
  );
}

export function MultiSelectItem({ value, children, className }: {
  value: string;
  children: string;
  className?: string;
}) {
  const context = useContext(MultiSelectContext);
  if (!context) throw new Error('MultiSelectItem must be used within MultiSelect');
  if (typeof children !== "string") throw new Error('children must be a string')

  const { onValueChange, selectedValue } = context;

  const cns = cn("w-full flex justify-between", className)

  return (
    <CommandItem
      value={value}
      onSelect={val => {
        const idx = selectedValue.findIndex(v => v.value === val)
        if (idx < 0) {
          onValueChange([...selectedValue, { value: val, label: children }])
        } else {
          const newVals = [...selectedValue]
          newVals.splice(idx, 1)
          onValueChange(newVals)
        }
      }
      }
      className={cns}
    >
      {children}
      {selectedValue.some(v => v.value == value) &&
        <CheckIcon className="size-4" />
      }
    </CommandItem>
  );
}
