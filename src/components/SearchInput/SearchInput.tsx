import React from "react";
import SearchInputProvider from "./search-input.provider";

export function SearchInput({ children }: { children: React.ReactNode }) {
  return <SearchInputProvider>{children}</SearchInputProvider>;
}
