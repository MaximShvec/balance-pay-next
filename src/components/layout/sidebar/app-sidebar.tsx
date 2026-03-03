"use client";

import * as React from "react";
import { useEffect } from "react";
import { ChevronsUpDown, Plus, ShoppingBagIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useIsTablet } from "@/hooks/use-mobile";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { NavMain } from "@/components/layout/sidebar/nav-main";
import { ScrollArea } from "@/components/ui/scroll-area";
import Logo from "@/components/layout/logo";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  const { setOpen, setOpenMobile, isMobile } = useSidebar();
  const isTablet = useIsTablet();

  useEffect(() => {
    if (isMobile) setOpenMobile(false);
  }, [pathname, isMobile, setOpenMobile]);

  useEffect(() => {
    setOpen(!isTablet);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- только при смене breakpoint, не при ручном toggle
  }, [isTablet]);

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton className="hover:text-foreground h-8 md:h-10 group-data-[collapsible=icon]:px-0! hover:bg-[var(--primary)]/5 cursor-pointer transition-all duration-200">
                  <Logo />
                  <span className="text-foreground font-semibold">
                    Balance Pay
                  </span>
                  <ChevronsUpDown className="ml-auto group-data-[collapsible=icon]:hidden" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="mt-4 w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                side={isMobile ? "bottom" : "right"}
                align="end"
                sideOffset={4}
              >
                <DropdownMenuLabel>Projects</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="flex items-center gap-3 cursor-pointer transition-all duration-200"
                  asChild
                >
                  <Link href="/profile">
                    <div className="flex size-8 items-center justify-center rounded-md border">
                      <ShoppingBagIcon className="text-muted-foreground size-4" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">Personal</span>
                      <span className="text-xs text-green-700">Active</span>
                    </div>
                  </Link>
                </DropdownMenuItem>
                {/* <DropdownMenuItem className="flex items-center gap-3">
                  <div className="flex size-8 items-center justify-center rounded-md border">
                    <UserCircle2Icon className="text-muted-foreground size-4" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">Cards</span>
                    <span className="text-muted-foreground text-xs">
                      Inactive
                    </span>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center gap-3">
                  <div className="flex size-8 items-center justify-center rounded-md border">
                    <UserCircle2Icon className="text-muted-foreground size-4" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">Business</span>
                    <span className="text-muted-foreground text-xs">
                      Inactive
                    </span>
                  </div>
                </DropdownMenuItem> */}
                <DropdownMenuSeparator />
                {/* по клику на "New, открываются два пункта меню Cards и Business" */}
                <Button
                  className="w-full cursor-pointer transition-all duration-200"
                  asChild
                >
                  <Link href="/new-workspace">
                    <Plus className="size-4" />
                    New
                  </Link>
                </Button>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <ScrollArea className="h-full">
          <NavMain />
        </ScrollArea>
      </SidebarContent>
    </Sidebar>
  );
}
