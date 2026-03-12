"use client";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  WalletLinearIcon,
  WalletBoldIcon,
  AssetsIcon,
  CardIcon,
  TransactionsLinearIcon,
  TransactionsBoldIcon,
  CryptoLinearIcon,
  CryptoBoldIcon,
  FundsconnectLinearIcon,
  FundsconnectBoldIcon,
} from "@/components/icons";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const navItems = [
  {
    title: "Dashboard",
    href: "/",
    icon: WalletLinearIcon,
    iconActive: WalletBoldIcon,
  },
  {
    title: "Funds",
    href: "/funds",
    icon: FundsconnectLinearIcon,
    iconActive: FundsconnectBoldIcon,
  },
  {
    title: "Assets",
    href: "/assets",
    icon: AssetsIcon,
    iconActive: AssetsIcon,
  },
  {
    title: "Buy & Sell",
    href: "/buy-sell",
    icon: CryptoLinearIcon,
    iconActive: CryptoBoldIcon,
  },
  {
    title: "Transactions",
    href: "/transactions",
    icon: TransactionsLinearIcon,
    iconActive: TransactionsBoldIcon,
  },
  {
    title: "Cards",
    href: "/cards",
    icon: CardIcon,
    iconActive: CardIcon,
  },
];

export const searchNavItems = [{ title: "Menu", items: navItems }];

export function NavMain() {
  const pathname = usePathname();

  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                className="hover:text-foreground active:text-foreground hover:bg-muted/60 active:bg-[var(--primary)]/10"
                isActive={pathname === item.href}
                tooltip={item.title}
                asChild
              >
                <Link href={item.href}>
                  {item.icon &&
                    (pathname === item.href && item.iconActive ? (
                      <item.iconActive />
                    ) : (
                      <item.icon />
                    ))}
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
