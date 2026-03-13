"use client";

import React from "react";
import { ArrowLeft, Ellipsis } from "lucide-react";
import { Button } from "@/components/ui/button";
import useChatStore from "@/components/help-center/use-chat-store";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { CallDialog } from "@/components/help-center/call-dialog";
import { VideoCallDialog } from "@/components/help-center/video-call-dialog";
import { ChatUserDropdown } from "@/components/help-center/chat-list-item-dropdown";
import { Avatar, AvatarBadge, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

function getInitials(name?: string) {
  if (!name) return "";
  return name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2);
}
import { UserPropsTypes } from "@/components/help-center/types";

export function ChatHeader({ user }: { user: UserPropsTypes }) {
  const { setSelectedChat } = useChatStore();

  return (
    <div className="flex justify-between gap-4 lg:px-4">
      <div className="flex gap-4">
        <Button
          size="sm"
          variant="outline"
          className="flex size-10 p-0 lg:hidden"
          onClick={() => setSelectedChat(null)}
        >
          <ArrowLeft />
        </Button>
        <Avatar className="overflow-visible lg:size-10">
          <AvatarImage src={`${user?.avatar}`} alt="avatar image" />
          <AvatarBadge
            className={cn("size-2.5", {
              "bg-green-500": user?.online_status === "success",
              "bg-yellow-500": user?.online_status === "warning",
              "bg-red-500": user?.online_status === "danger",
            })}
          />
          <AvatarFallback>{getInitials(user?.name)}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-1">
          <span className="text-sm font-semibold">{user.name}</span>
          {user.online_status === "success" ? (
            <span className="text-xs text-green-500">Online</span>
          ) : (
            <span className="text-muted-foreground text-xs">{user.last_seen}</span>
          )}
        </div>
      </div>
      <div className="flex gap-2">
        <div className="hidden lg:flex lg:gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div>
                  <VideoCallDialog />
                </div>
              </TooltipTrigger>
              <TooltipContent side="bottom">Start Video Chat</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <div>
                  <CallDialog />
                </div>
              </TooltipTrigger>
              <TooltipContent side="bottom">Start Call</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <ChatUserDropdown>
          <Button size="icon" variant="ghost">
            <Ellipsis />
          </Button>
        </ChatUserDropdown>
      </div>
    </div>
  );
}
