import { useState } from "react";
import { useOutsideClick } from "../../hooks/useOutsideClick.hook";
import { SearchInputItems } from "./SearchInputItems";
import { User } from "../../types/common";
import { useSearchInput } from "./search-input.context";

export function SearchInputContent({ data }: { data: User[] }) {
  const { setSelectedIndex, searchQuery, setSearchQuery } = useSearchInput();
  const [isFocused, setFocused] = useState(false);
  const ref = useOutsideClick(() => {
    setSelectedIndex(0);
    setFocused(false);
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
  };

  return (
    <div className="max-w-md m-4 relative" ref={ref}>
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-500 dark:text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          value={searchQuery}
          onChange={handleChange}
          onFocus={() => setFocused(true)}
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              setFocused(false);
            } else {
              setFocused(true);
            }
          }}
          type="search"
          id="default-search"
          className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:outline-gray-300"
          placeholder="Search users by ID, name, or address, order items"
          required
        />
      </div>
      {isFocused && <SearchInputItems data={data} />}
    </div>
  );
}
