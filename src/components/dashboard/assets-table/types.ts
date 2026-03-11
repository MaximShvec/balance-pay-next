export type CurrencyTypeFilter = "all" | "crypto" | "stable" | "fiat";

export type AssetsTableFilterBy = "fiat" | "crypto" | "crypto-and-stable";

export function showTypeFilter(filterBy: AssetsTableFilterBy | undefined): boolean {
  return !filterBy || filterBy === "crypto-and-stable";
}

export type AssetsFilterState = {
  hideZeroBalance: boolean;
  setHideZeroBalance: (v: boolean) => void;
  currencyTypeFilter: CurrencyTypeFilter;
  setCurrencyTypeFilter: (v: CurrencyTypeFilter) => void;
  selectedCurrencies: Set<string>;
  setSelectedCurrencies: React.Dispatch<React.SetStateAction<Set<string>>>;
  selectedNetworks: Set<string>;
  setSelectedNetworks: React.Dispatch<React.SetStateAction<Set<string>>>;
  uniqueCurrencies: { key: string; label: string }[];
  uniqueNetworks: string[];
  filterBy?: AssetsTableFilterBy;
};
