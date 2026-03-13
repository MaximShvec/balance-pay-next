"use client";

import { PanelLeftIcon } from "lucide-react";
import Link from "next/link";

import { Separator } from "@/components/ui/separator";
import Notifications from "@/components/layout/header/notifications";
import Search from "@/components/layout/header/search";
import UserMenu from "@/components/layout/header/user-menu";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import { HeaderTitleSlot } from "@/components/layout/header/header-context";
import { MessageIcon } from "@/components/icons";

export { useHeader } from "@/components/layout/header/header-context";

export function SiteHeader() {
  const { toggleSidebar } = useSidebar();

  return (
    <header className="bg-background/40 sticky top-0 z-50 flex h-(--header-height) shrink-0 items-center gap-2 border-b py-2 md:py-4 backdrop-blur-xl transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 xl:px-8 lg:gap-2">
        <Button
          onClick={toggleSidebar}
          size="icon"
          variant="ghost"
          className="flex min-[1200px]:hidden"
          aria-label="Toggle sidebar"
        >
          <PanelLeftIcon />
        </Button>
        <Separator
          orientation="vertical"
          className="mr-2 block min-[1200px]:hidden data-[orientation=vertical]:h-4"
        />

        <HeaderTitleSlot />

        <div className="ml-auto flex items-center gap-2">
          <Search />
          <Button
            size="icon"
            variant="ghost"
            className="relative size-12 rounded-full bg-muted/50 hover:bg-muted focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
            asChild
          >
            <Link href="/helpcenter" aria-label="Help Center">
              <MessageIcon className="size-5 text-muted-foreground" />
            </Link>
          </Button>
          <Notifications />
          <Separator
            orientation="vertical"
            className="mx-2 hidden md:block data-[orientation=vertical]:h-4"
          />
          <UserMenu />
        </div>
      </div>
    </header>
  );
}
