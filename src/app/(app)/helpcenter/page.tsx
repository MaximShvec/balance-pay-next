import path from "path";
import { promises as fs } from "fs";
import { ChatItemProps, UserPropsTypes } from "@/components/help-center/types";
import { ChatSidebar } from "@/components/help-center/chat-sidebar";
import { ChatContent } from "@/components/help-center/chat-content";

async function getChats() {
  const data = await fs.readFile(
    path.join(process.cwd(), "src/app/(app)/helpcenter/data/chats.json")
  );
  return JSON.parse(data.toString());
}

async function getChatUser(id: number) {
  const data = await fs.readFile(
    path.join(process.cwd(), "src/app/(app)/helpcenter/data/contacts.json")
  );
  return JSON.parse(data.toString()).find((item: UserPropsTypes) => item.id === id);
}

export default async function HelpCenterPage() {
  const chats = await getChats();

  const chats_with_user = await Promise.all(
    chats.map(async (item: ChatItemProps) => {
      item.user = await getChatUser(item.user_id);
      return item;
    })
  );

  return (
    <div className="flex h-[calc(100vh-var(--header-height)-3rem)] w-full">
      <ChatSidebar chats={chats_with_user} />
      <div className="grow">
        <ChatContent />
      </div>
    </div>
  );
}
