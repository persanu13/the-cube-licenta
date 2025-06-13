"use client";
import { Course } from "@/lib/models/course";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useActionState, useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
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
import { addCourseToGroup } from "@/lib/actions/groups";

export default function AddCourse({
  courses,
  groupId,
}: {
  courses: Course[];
  groupId: string;
}) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [state, formAction, isPending] = useActionState(addCourseToGroup, {});
  return (
    <form action={formAction}>
      <input type="hidden" value={groupId} name="groupId" />
      <input type="hidden" name="courseId" value={value} />
      <div className="flex gap-5">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-[200px] pr-20 outline-0 border-0  justify-between rounded bg-spring-white    text-[14px] font-medium font-inter text-charade-950  shadow-[0_4px_4px_rgba(0,0,0,0.25)]"
            >
              <p className="truncate">
                {value
                  ? courses.find((course) => course.id === value)?.name
                  : "Select course..."}
              </p>

              <ChevronsUpDown className="opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandInput
                placeholder="Search course..."
                className="h-9   placeholder:tuatura-400 text-[14px] font-inter text-charade-950"
              />
              <CommandList>
                <CommandEmpty>No course found.</CommandEmpty>
                <CommandGroup>
                  {courses.map((course) => (
                    <CommandItem
                      key={course.id}
                      value={course.id}
                      className=" text-[14px] font-inter text-charade-950"
                      onSelect={(currentValue) => {
                        setValue(currentValue === value ? "" : currentValue);
                        setOpen(false);
                      }}
                    >
                      <p className="truncate"> {course.name}</p>

                      <Check
                        className={cn(
                          "ml-auto",
                          value === course.id ? "opacity-100" : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
        <button
          className="flex gap-1 items-center w-fit px-4 py-2 rounded-sm  shadow-[0_4px_4px_rgba(0,0,0,0.25)]
          bg-carnation-400 text-spring-white font-inter text-[14px] font-semibold cursor-pointer"
        >
          <p>Add</p>
          <PlusIcon width={18} strokeWidth={2} />
        </button>
      </div>
    </form>
  );
}
