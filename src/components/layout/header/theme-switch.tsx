"use client";

import { useTheme } from "next-themes";
import { MoonIcon, SunIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function ThemeSwitch() {
  const { theme, setTheme } = useTheme();

  if (theme === undefined) {
    return null;
  }

  return (
    <Button
      size="icon"
      variant="ghost"
      className="relative size-10 rounded-full bg-muted/50 hover:bg-muted transition-all duration-200 cursor-pointer"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      {theme === "light" ? <MoonIcon /> : <SunIcon />}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
