export type CurrencyTypeFilter = "all" | "crypto" | "stable" | "fiat";

export type CurrencyTypeKey = "crypto" | "stable" | "fiat";

export type AssetsTableFilterBy = "fiat" | "crypto" | "crypto-and-stable";

export function showTypeFilter(filterBy: AssetsTableFilterBy | undefined): boolean {
  return !filterBy || filterBy === "crypto-and-stable";
}

export type AssetsFilterState = {
  hideZeroBalance: boolean;
  setHideZeroBalance: (v: boolean) => void;
  selectedTypes: Set<CurrencyTypeKey>;
  setSelectedTypes: React.Dispatch<React.SetStateAction<Set<CurrencyTypeKey>>>;
  selectedCurrencies: Set<string>;
  setSelectedCurrencies: React.Dispatch<React.SetStateAction<Set<string>>>;
  selectedNetworks: Set<string>;
  setSelectedNetworks: React.Dispatch<React.SetStateAction<Set<string>>>;
  uniqueCurrencies: { key: string; label: string }[];
  uniqueNetworks: string[];
  filterBy?: AssetsTableFilterBy;
};
