/**
 * Маппинг путей к названиям разделов для отображения в шапке.
 * Используется usePathname() для определения текущей страницы.
 */
export const PAGE_TITLES: Record<string, string> = {
  "/": "Dashboard",
  "/transactions": "Transactions",
  "/funds": "Funds",
  "/assets": "Assets",
  "/cards": "Cards",
  "/new-workspace": "New Workspace",
  "/profile": "Settings",
  "/profile/account": "Account",
  "/profile/whitelist": "Whitelist",
  "/profile/appearance": "Appearance",
  "/profile/notifications": "Notifications",
  "/profile/sessions": "Sessions",
};

export function getPageTitle(pathname: string): string {
  // Точное совпадение
  if (PAGE_TITLES[pathname]) {
    return PAGE_TITLES[pathname];
  }
  // Для вложенных путей (например /profile/account/something) берём ближайший родительский
  const segments = pathname.split("/").filter(Boolean);
  for (let i = segments.length; i > 0; i--) {
    const path = "/" + segments.slice(0, i).join("/");
    if (PAGE_TITLES[path]) {
      return PAGE_TITLES[path];
    }
  }
  return "Dashboard";
}
