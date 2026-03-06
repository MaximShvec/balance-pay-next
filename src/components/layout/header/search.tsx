"use client";

import React, { useEffect, useState } from "react";
import { SearchIcon } from "@/components/icons";
import { Input } from "@/components/ui/input";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { useRouter } from "next/navigation";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { searchNavItems } from "@/components/layout/sidebar/nav-main";

export default function Search() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <div className="lg:flex-1">
      <div className="relative hidden max-w-[240px] flex-1 lg:block">
        <SearchIcon className="text-muted-foreground absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2" />
        <Input
          className="bg-muted/50 h-12 w-full cursor-pointer rounded-full border-0 pr-10 pl-4 text-sm placeholder:text-muted-foreground focus-visible:ring-1"
          placeholder="Search..."
          type="search"
          onFocus={() => setOpen(true)}
        />
      </div>
      <div className="block lg:hidden">
        <Button
          size="icon"
          variant="ghost"
          className="size-12 rounded-full bg-muted/50 hover:bg-muted"
          onClick={() => setOpen(true)}
        >
          <SearchIcon className="size-5 text-muted-foreground" />
        </Button>
      </div>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <VisuallyHidden>
          <DialogHeader>
            <DialogTitle></DialogTitle>
          </DialogHeader>
        </VisuallyHidden>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          {searchNavItems.map((route) => (
            <React.Fragment key={route.title}>
              <CommandGroup heading={route.title}>
                {route.items.map((item, key) => (
                  <CommandItem
                    key={key}
                    onSelect={() => {
                      setOpen(false);
                      router.push(item.href);
                    }}
                  >
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
              <CommandSeparator />
            </React.Fragment>
          ))}
        </CommandList>
      </CommandDialog>
    </div>
  );
}
