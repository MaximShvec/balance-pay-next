import Link from "next/link";
import { LogOut } from "lucide-react";

import {
  UserIcon,
  TransactionsLinearIcon,
  ForwardIcon,
} from "@/components/icons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function UserMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="cursor-pointer transition-all duration-200"
        asChild
      >
        <button
          type="button"
          className="flex size-10 shrink-0 items-center justify-center rounded-full bg-muted/50 hover:bg-muted"
          aria-label="User menu"
        >
          <UserIcon className="size-5 text-muted-foreground" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-(--radix-dropdown-menu-trigger-width) min-w-60"
        align="end"
      >
        <DropdownMenuLabel className="p-0">
          <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
            <Avatar>
              <AvatarImage src={`/images/avatars/01.png`} alt="User avatar" />
              <AvatarFallback className="rounded-lg">TB</AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-semibold">
                Toby Belhome *(статус)
              </span>
              <span className="text-muted-foreground truncate text-xs">
                hello@tobybelhome.com
              </span>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            className="cursor-pointer transition-all duration-200"
            asChild
          >
            <Link href="/profile">
              <UserIcon className="size-5" />
              Account
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer transition-all duration-200"
            asChild
          >
            <Link href="/profile">
              <TransactionsLinearIcon className="size-5" />
              Whitelist
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer transition-all duration-200"
            asChild
          >
            <Link href="/profile">
              <ForwardIcon className="size-5" />
              Referal Link
            </Link>
          </DropdownMenuItem>
          {/* <DropdownMenuItem className="cursor-pointer transition-all duration-200">
            <CreditCard />
            WhiteList
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer transition-all duration-200">
            <Bell />
            Referal Link
          </DropdownMenuItem> */}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer transition-all duration-200">
          <LogOut />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
