"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { getPageTitle } from "@/lib/page-titles";

/**
 * Контекст для кастомизации заголовка в шапке.
 *
 * @example
 * // На странице профиля — добавить бадж статуса:
 * const { setHeader } = useHeader();
 * useEffect(() => {
 *   setHeader("Profile", <Badge>Verified</Badge>);
 * }, []);
 *
 * @example
 * // На странице валюты — указать сеть:
 * setHeader("BTC", <span className="text-muted-foreground">Ethereum</span>);
 */

type HeaderContextValue = {
  /** Переопределение заголовка (если не задано — используется getPageTitle(pathname)) */
  titleOverride: string | null;
  /** Дополнительный контент рядом с заголовком (бадж, сеть и т.д.) */
  extra: React.ReactNode;
  setHeader: (title?: string, extra?: React.ReactNode) => void;
};

const HeaderContext = React.createContext<HeaderContextValue | null>(null);

export function HeaderProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [titleOverride, setTitleOverride] = React.useState<string | null>(null);
  const [extra, setExtra] = React.useState<React.ReactNode>(null);

  // Сброс при смене страницы
  React.useEffect(() => {
    setTitleOverride(null);
    setExtra(null);
  }, [pathname]);

  const setHeader = React.useCallback(
    (title?: string, extraContent?: React.ReactNode) => {
      setTitleOverride(title ?? null);
      setExtra(extraContent ?? null);
    },
    [],
  );

  const value = React.useMemo(
    () => ({ titleOverride, extra, setHeader }),
    [titleOverride, extra, setHeader],
  );

  return (
    <HeaderContext.Provider value={value}>{children}</HeaderContext.Provider>
  );
}

export function useHeader() {
  const context = React.useContext(HeaderContext);
  if (!context) {
    throw new Error("useHeader must be used within HeaderProvider");
  }
  return context;
}

export function useHeaderTitle() {
  const pathname = usePathname();
  const context = React.useContext(HeaderContext);
  if (!context) return getPageTitle(pathname);
  return context.titleOverride ?? getPageTitle(pathname);
}

/** Компонент для рендера заголовка и доп. контента в шапке */
export function HeaderTitleSlot() {
  const pathname = usePathname();
  const context = React.useContext(HeaderContext);
  const title = context?.titleOverride ?? getPageTitle(pathname);
  const extra = context?.extra ?? null;

  return (
    <div
      data-slot="header-title"
      className="flex min-w-0 flex-1 flex-wrap items-center gap-2 min-[1200px]:ml-2"
    >
      <h1 className="text-foreground text-lg font-semibold lg:text-xl shrink-0">
        {title}
      </h1>
      {extra}
    </div>
  );
}
