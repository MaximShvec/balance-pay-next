"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { ContrastIcon } from "lucide-react";

import {
  BellOutlineIcon,
  EditIcon,
  LogoutIcon,
  SettingsIcon,
  UserIcon,
  WhitelistIcon,
} from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const sidebarNavItems = [
  {
    title: "Profile",
    href: "/profile",
    icon: UserIcon,
  },
  {
    title: "Account",
    href: "/profile/account",
    icon: SettingsIcon,
  },
  {
    title: "Whitelist",
    href: "/profile/whitelist",
    icon: WhitelistIcon,
  },
  {
    title: "Appearance",
    href: "/profile/appearance",
    icon: EditIcon,
  },
  {
    title: "Notifications",
    href: "/profile/notifications",
    icon: BellOutlineIcon,
  },
  {
    title: "Sessions",
    href: "/profile/sessions",
    icon: ContrastIcon,
    disabled: true,
  },
];

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <Card className="py-0">
      <CardContent className="p-2">
        <nav className="flex flex-col space-y-0.5 space-x-2 lg:space-x-0">
          {sidebarNavItems.map((item) =>
            item.disabled ? (
              <Button
                key={item.href}
                variant="ghost"
                disabled
                className="justify-start gap-2 opacity-50 cursor-not-allowed"
              >
                {item.icon && <item.icon className="size-4 shrink-0" />}
                {item.title}
              </Button>
            ) : (
              <Button
                key={item.href}
                variant="ghost"
                className={cn(
                  "hover:bg-muted justify-start",
                  pathname === item.href ? "bg-muted hover:bg-muted" : "",
                )}
                asChild
              >
                <Link href={item.href} className="flex items-center gap-2">
                  {item.icon && <item.icon className="size-4 shrink-0" />}
                  {item.title}
                </Link>
              </Button>
            ),
          )}
        </nav>
        <Button
          variant="ghost"
          className="mt-4 w-full justify-start gap-2"
          onClick={() => {
            /* TODO: logout */
          }}
        >
          <LogoutIcon className="size-4 shrink-0" />
          Log out
        </Button>
      </CardContent>
    </Card>
  );
}
