"use client";
import { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

type Option = {
  label: string;
  value: string;
};

type SearchSelectProps = {
  defaultValue?: string;
  label?: string;
  options: Option[];
  placeholder?: string;
  onChange: (value: string) => void;
  className?: string;
};

export default function SearchSelect({
  defaultValue = "",
  label,
  options,
  placeholder = "Select...",
  onChange,
  className = "",
}: SearchSelectProps) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(defaultValue);

  const selectedOption = options.find((opt) => opt.value === selected);

  const handleSelect = (value: string) => {
    setSelected(value);
    onChange(value);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <label className="whitespace-nowrap text-[14px] font-jost font-medium text-charade-950">
        Select Shape
      </label>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            "w-full outline-0 border-0  justify-between rounded bg-spring-white text-[14px] h-fit py-[6px]  font-jost font-medium text-charade-950 shadow-[0_4px_4px_rgba(0,0,0,0.25)]",
            className
          )}
        >
          <p className="truncate">
            {selectedOption ? selectedOption.label : placeholder}
          </p>
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0 w-fit ">
        <Command>
          <CommandInput
            placeholder="Search..."
            className=" max-w-[80px]  placeholder:tuatura-400   text-[14px] font-inter text-charade-950  px-0"
          />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {options.map((opt) => (
                <CommandItem
                  key={opt.value}
                  value={opt.value}
                  onSelect={() => handleSelect(opt.value)}
                  className="text-[14px] font-inter text-charade-950"
                >
                  <p className="truncate">{opt.label}</p>
                  <Check
                    className={cn(
                      "ml-auto",
                      selected === opt.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
