import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover';
import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { Button } from './ui/button';
import { Check, ChevronDown } from 'lucide-react';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from './ui/command';
import { cn } from '@/lib/utils';

interface SearchableSelectContextValue {
  open: boolean;
  selectedValue: string | null;
  selectedLabel: string | null;
  searchQuery: string;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
  contentRef: React.RefObject<HTMLDivElement | null>;
  onValueChange: (value: string, label: string) => void;
  onSearchChange: (query: string) => void;
  onTriggerClick: () => void;
  onContentBlur: () => void;
}

const SearchableSelectContext = createContext<SearchableSelectContextValue | null>(null);

export function SearchableSelect({ children, defaultValue = null, onValueChange }: {
  children: React.ReactNode;
  defaultValue?: string | null;
  onValueChange?: (value: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState<string | null>(defaultValue);
  const [selectedLabel, setSelectedLabel] = useState<string | null>(defaultValue);
  const [searchQuery, setSearchQuery] = useState('');
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  const handleValueChange = (value: string, label: string) => {
    setSelectedValue(value);
    setSelectedLabel(label);
    onValueChange?.(value);
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

  const contextValue: SearchableSelectContextValue = {
    open,
    selectedValue,
    selectedLabel,
    searchQuery,
    triggerRef,
    contentRef,
    onValueChange: handleValueChange,
    onSearchChange: handleSearchChange,
    onTriggerClick: handleTriggerClick,
    onContentBlur: handleContentBlur,
  };

  return (
    <SearchableSelectContext.Provider value={contextValue}>
      <Popover open={open} onOpenChange={setOpen}>
        {children}
      </Popover>
    </SearchableSelectContext.Provider>
  );
}

export function SearchableSelectTrigger({ children, className }: {
  children: React.ReactNode;
  className?: string;
}) {
  const context = useContext(SearchableSelectContext);
  if (!context) throw new Error('SearchableSelectTrigger must be used within SearchableSelect');

  const { onTriggerClick, triggerRef } = context;

  const cns = cn("w-full justify-between", className)

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
        <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
      </Button>
    </PopoverTrigger>
  );
}

export function SearchableSelectValue({ placeholder = 'Select...' }: {
  placeholder?: string;
}) {
  const context = useContext(SearchableSelectContext);
  if (!context) throw new Error('SearchableSelectValue must be used within SearchableSelect');

  const { selectedLabel } = context;

  return (
    <span
      data-placeholder={!selectedLabel ? '' : undefined}
      className="data-[placeholder]:text-muted-foreground">
      {selectedLabel || placeholder}
    </span>
  );
}

export function SearchableSelectContent({ children, className }: {
  children: React.ReactNode;
  className?: string;
}) {
  const context = useContext(SearchableSelectContext);
  if (!context) throw new Error('SearchableSelectContent must be used within SearchableSelect');

  const { open, contentRef } = context;

  if (!open) return null;

  const cns = cn("w-(--radix-popover-trigger-width) p-0 py-1", className)

  return (
    <PopoverContent ref={contentRef} className={cns}>
      <Command>
        {children}
      </Command>
    </PopoverContent>
  );
}

export function SearchableSelectInput({ placeholder = 'Search...', className }: {
  placeholder?: string;
  className?: string;
}) {
  const context = useContext(SearchableSelectContext);
  if (!context) throw new Error('SearchableSelectInput must be used within SearchableSelect');

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

export function SearchableSelectList({ children, className }: {
  children: React.ReactNode;
  className?: string;
}) {
  const context = useContext(SearchableSelectContext);
  if (!context) throw new Error('SearchableSelectList must be used within SearchableSelect');

  const cns = cn("p-1", className)

  return (
    <CommandList className={cns}>
      {children}
    </CommandList>
  );
}

export function SearchableSelectGroup({ children, className }: {
  children: React.ReactNode;
  className?: string;
}) {

  const context = useContext(SearchableSelectContext);
  if (!context) throw new Error('SearchableSelectList must be used within SearchableSelect');

  return (
    <CommandGroup className={className}>
      {children}
    </CommandGroup>
  );
}

export function SearchableSelectEmpty({ children, className }: {
  children: React.ReactNode;
  className?: string;
}) {

  const context = useContext(SearchableSelectContext);
  if (!context) throw new Error('SearchableSelectList must be used within SearchableSelect');

  const cns = cn("text-muted-foreground p-1 text-md", className)

  return (
    <CommandEmpty className={cns} >
      {children}
    </CommandEmpty>
  );
}

export function SearchableSelectItem({ value, children, className }: {
  value: string;
  children: string;
  className?: string;
}) {
  const context = useContext(SearchableSelectContext);
  if (!context) throw new Error('SearchableSelectItem must be used within SearchableSelect');
  if (typeof children !== "string") throw new Error('children must be a string')

  const { onValueChange, selectedValue } = context;

  const cns = cn("w-full flex justify-between", className)

  return (
    <CommandItem
      value={value}
      onSelect={val => onValueChange(val, children)}
      className={cns}
    >
      {children}
      {selectedValue == value &&
        <Check className="size-4" />
      }
    </CommandItem>
  );
}
