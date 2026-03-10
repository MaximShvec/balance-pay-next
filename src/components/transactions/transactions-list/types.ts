export type TransactionsFilterState = {
  selectedStatuses: Set<string>;
  setSelectedStatuses: React.Dispatch<React.SetStateAction<Set<string>>>;
  selectedTypes: Set<string>;
  setSelectedTypes: React.Dispatch<React.SetStateAction<Set<string>>>;
  selectedMethods: Set<string>;
  setSelectedMethods: React.Dispatch<React.SetStateAction<Set<string>>>;
  statuses: { value: string; label: string }[];
  types: { value: string; label: string }[];
};
