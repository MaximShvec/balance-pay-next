"use client";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  WalletLinearIcon,
  AssetIcon,
  TransactionsLinearIcon,
  BuysellIcon,
  FundsconnectLinearIcon,
  AmlLinearIcon,
} from "@/components/icons";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const navItems = [
  { title: "Dashboard", href: "/", icon: WalletLinearIcon },
  // { title: "Cards", href: "/cards", icon: AssetIcon },
  {
    title: "My transactions",
    href: "/transactions",
    icon: TransactionsLinearIcon,
  },
  // { title: "Buy & Sell", href: "/", icon: BuysellIcon },
  {
    title: "Funds Connect",
    href: "/funds-connect",
    icon: FundsconnectLinearIcon,
  },
  // { title: "Verification", href: "/", icon: AmlLinearIcon },
];

/** Grouped nav items for search command palette */
export const searchNavItems = [{ title: "Menu", items: navItems }];

export function NavMain() {
  const pathname = usePathname();

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Menu</SidebarGroupLabel>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                className="hover:text-foreground active:text-foreground hover:bg-[var(--primary)]/10 active:bg-[var(--primary)]/10"
                isActive={pathname === item.href}
                tooltip={item.title}
                asChild
              >
                <Link href={item.href}>
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
