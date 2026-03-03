"use client";

import { AddIcon } from "@/components/icons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";

const whitelistContacts = [
  {
    id: "1",
    name: "shadcn",
    email: "shadcn@vercel.com",
    avatar: "/images/avatars/01.png",
  },
  {
    id: "2",
    name: "maxleiter",
    email: "maxleiter@vercel.com",
    avatar: "/images/avatars/02.png",
  },
  {
    id: "3",
    name: "evilrabbit",
    email: "evilrabbit@vercel.com",
    avatar: "/images/avatars/03.png",
  },
];

export default function Page() {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Whitelist</CardTitle>
        </CardHeader>
        <CardContent>
          <ItemGroup className="space-y-2">
            {whitelistContacts.map((contact) => (
              <Item key={contact.id} variant="outline">
                <ItemMedia variant="default" className="shrink-0">
                  <Avatar className="size-10">
                    <AvatarImage src={contact.avatar} alt={contact.name} />
                    <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                </ItemMedia>
                <ItemContent>
                  <ItemTitle>{contact.name}</ItemTitle>
                  <ItemDescription>{contact.email}</ItemDescription>
                </ItemContent>
              </Item>
            ))}
          </ItemGroup>
          <Button variant="default" className="mt-2 w-fit gap-2">
            <AddIcon className="size-5" />
            Add contact
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
