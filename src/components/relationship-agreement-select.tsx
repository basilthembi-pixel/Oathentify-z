"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

const relationshipAgreementTypes = [
    {
        category: "Foundation",
        types: [
            { value: "Living Together", label: "🏠 Living Together", description: "Making home life smooth & happy" },
            { value: "Money & Finances", label: "💰 Money & Finances", description: "Keep money talks healthy & clear" },
            { value: "Future Goals & Dreams", label: "🎯 Future Goals & Dreams", description: "Align on marriage, kids, and life" },
            { value: "Communication & Conflict", label: "🗣️ Communication & Conflict", description: "Fight fair, love better" },
            { value: "Social Life & Boundaries", label: "👥 Social Life & Boundaries", description: "Friends, family, and personal space" },
            { value: "Intimacy & Connection", label: "💑 Intimacy & Connection", description: "Physical and emotional closeness" },
            { value: "Family & In-Laws", label: "👨‍👩‍👧 Family & In-Laws", description: "Navigate family life together" },
            { value: "Personal Growth", label: "📈 Personal Growth", description: "Support each other's dreams" },
        ],
    },
    {
        category: "Protective",
        types: [
            { value: "Trust & Infidelity Boundaries", label: "💔 Trust & Infidelity Boundaries", description: "Serious - discuss openly first" },
            { value: "If We Ever Part Ways", label: "📦 If We Ever Part Ways", description: "Hope for the best, plan for clarity" },
            { value: "Debt & Financial Protection", label: "💳 Debt & Financial Protection", description: "Keep individual finances separate" },
            { value: "Health & Crisis Support", label: "🏥 Health & Crisis Support", description: "Be there when it matters most" },
            { value: "If Distance Happens", label: "✈️ If Distance Happens", description: "Making long-distance work" },
            { value: "Safety & Emergency Exit", label: "🚪 Safety & Emergency Exit", description: "Protection if things go wrong" },
        ],
    },
];

const allTypes = relationshipAgreementTypes.flatMap(group => group.types);

export function RelationshipAgreementSelect({ selectedValue, onValueChange }: { selectedValue: string, onValueChange: (value: string) => void }) {
  const [open, setOpen] = React.useState(false)

  const selectedLabel = allTypes.find(type => type.value === selectedValue)?.label || "Choose what matters to you both...";

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {selectedLabel}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
        <Command>
          <CommandInput placeholder="Search agreement type..." />
          <CommandList>
            <CommandEmpty>No agreement type found.</CommandEmpty>
            {relationshipAgreementTypes.map((group) => (
              <React.Fragment key={group.category}>
                <CommandGroup heading={group.category}>
                  {group.types.map((type) => (
                    <CommandItem
                      key={type.value}
                      value={type.value}
                      onSelect={(currentValue) => {
                        onValueChange(currentValue === selectedValue ? "" : currentValue)
                        setOpen(false)
                      }}
                    >
                      <div className="flex flex-col">
                        <div className="flex items-center">
                            <Check
                                className={cn(
                                "mr-2 h-4 w-4",
                                selectedValue === type.value ? "opacity-100" : "opacity-0"
                                )}
                            />
                            <span>{type.label}</span>
                        </div>
                        <span className="text-xs text-muted-foreground ml-6">{type.description}</span>
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
                {group.category === 'Foundation' && <CommandSeparator />}
              </React.Fragment>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
