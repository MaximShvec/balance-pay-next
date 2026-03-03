import type React from "react";
import {
  Megaphone,
  SquareTerminal,
  CalendarDays,
  ChevronRight,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import Link from "next/link";

export const metadata = {
  title: "New workspace",
  description: "Create a new workspace",
};

export default function NewWorkspacePage() {
  return (
    <div className="flex h-[calc(100vh-var(--header-height)-3rem)] flex-col items-center justify-center">
      <div className="mx-auto max-w-md text-center">
        <header className="space-y-2">
          <p className="text-muted-foreground">
            Start by selecting a template or begin with a blank canvas.
          </p>
        </header>

        <div className="mt-8 space-y-4 flex flex-col">
          {/* disabled */}
          <TemplateCard
            icon={<Megaphone className="h-6 w-6 text-white" />}
            iconBgColor="bg-pink-500"
            title="Personal"
            description="Вы не можете создать еще один персональный workspace. На одного пользователя может быть только один персональный workspace."
            disabled
          />
          <TemplateCard
            icon={<SquareTerminal className="h-6 w-6 text-white " />}
            iconBgColor="bg-purple-500"
            title="Cards"
            description="Manage complex builds and bring your technical ideas to life."
            href="/cards"
          />
          {/* go to workspace */}
          <TemplateCard
            icon={<CalendarDays className="h-6 w-6 text-white" />}
            iconBgColor="bg-orange-500"
            title="Business"
            description="Organize and track events that matter — from meetups to conferences."
          />
        </div>
      </div>
    </div>
  );
}

interface TemplateCardProps {
  icon: React.ReactNode;
  iconBgColor: string;
  title: string;
  description: string;
  href?: string;
  disabled?: boolean;
}

function TemplateCard({
  icon,
  iconBgColor,
  title,
  description,
  href,
  disabled,
}: TemplateCardProps) {
  const content = (
    <>
      <div className={`flex-shrink-0 rounded-full p-3 ${iconBgColor}`}>
        {icon}
      </div>
      <div className="flex-grow text-left">
        <h3 className="text-base font-medium">{title}</h3>
        <p className="text-muted-foreground text-sm">{description}</p>
      </div>
      {!disabled && (
        <ChevronRight className="text-muted-foreground ml-auto size-4 shrink-0" />
      )}
    </>
  );

  const cardClassName = disabled
    ? "flex flex-row items-center gap-4 bg-muted p-4"
    : "hover:bg-muted flex cursor-pointer flex-row items-center gap-4 p-4 transition-all duration-200";

  return href ? (
    <Link href={href}>
      <Card className={cardClassName}>{content}</Card>
    </Link>
  ) : (
    <Card className={cardClassName}>{content}</Card>
  );
}
