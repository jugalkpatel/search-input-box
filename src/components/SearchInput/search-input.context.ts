import { createContext, useContext } from "react";
import { User } from "../../types/common";
import { ACTIONTYPE } from "./search-input.provider";

export type SearchContextType = {
  selectedIndex: number;
  setSelectedIndex: (index: number) => void;
  searchQuery: string;
  setSearchQuery: (text: string) => void;
  data: User[];
  dispatch: React.Dispatch<ACTIONTYPE>;
  isHoverEnabled: boolean;
  setHoverEnabled: (value: boolean) => void;
};

export const SearchInputContext = createContext<SearchContextType | undefined>(
  undefined
);

export function useSearchInput() {
  const context = useContext(SearchInputContext);

  if (context === undefined) {
    throw new Error(
      "useSearchInputContext must be used within a SearchInputProvider"
    );
  }

  return context;
}
