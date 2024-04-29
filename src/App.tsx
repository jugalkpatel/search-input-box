import { useState } from "react";
import { data } from "./utils";
import { AddressType, Item, User } from "./types/common";
import { useSearchParams } from "react-router-dom";

// onFocus drop down should open with some initial items
// onBlur drop down should close
// you provide dropdown items and value

function ItemFound() {
  const { queryValue } = useQueryParams();
  return (
    <p className="border-y-2 border-grey-500 py-1 text-md before:content-['•'] before:text-blue-800 before:p-1 before:font-extrabold before:text-md my-1">
      {queryValue} found in items
    </p>
  );
}

function checkPresentInItems(items: Item[], queryValue: string) {
  if (!queryValue) {
    return false;
  }

  return items.some((item) =>
    item.name.toLowerCase().includes(queryValue.toLowerCase())
  );
}

function getHighlightedText(text: string, queryValue: string) {
  const index = queryValue
    ? text.toLowerCase().indexOf(queryValue.toLowerCase())
    : -1;
  const leading = index > -1 ? text.slice(0, index) : "";
  const trailing = index > -1 ? text.slice(index + queryValue.length) : "";
  const middle = index > -1 ? text.slice(index, index + queryValue.length) : "";

  return { leading, trailing, middle, index };
}

function TextWithHighlight({ text }: { text: string }) {
  const { queryValue } = useQueryParams();
  const { leading, middle, trailing, index } = getHighlightedText(
    text,
    queryValue
  );

  const highlightedText = (
    <span>
      {leading}
      <span className="bg-blue-500">{middle}</span>
      {trailing}
    </span>
  );

  return <>{index > -1 ? highlightedText : text}</>;
}

function Address(props: AddressType) {
  const { streetAddress, city, state, postalCode, country } = props;
  const addressLines = [streetAddress, city];
  if (state) addressLines.push(`${state} ${postalCode ? postalCode : ""}`);
  const address = addressLines.join(", ");

  return (
    <div className="mt-1 font-normal text-sm">
      <TextWithHighlight text={address} />
      <p>
        <TextWithHighlight text={country} />
      </p>
    </div>
  );
}

function Name({ name }: { name: string }) {
  return (
    <p className="font-medium">
      <TextWithHighlight text={name} />
    </p>
  );
}

function UserCard(props: User) {
  const { queryValue } = useQueryParams();
  const { id, name, address, items } = props;
  const isPresentInItems = checkPresentInItems(items, queryValue);

  return (
    <div className="border-b flex flex-col p-4 hover:bg-gray-100 cursor-pointer">
      <p className="font-semibold">{id}</p>
      <Name name={name} />
      {isPresentInItems && <ItemFound />}
      <Address {...address} />
    </div>
  );
}

function useQueryParams() {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryValue = searchParams.get("q") || "";

  return { queryValue, setSearchParams };
}

function App() {
  const { queryValue, setSearchParams } = useQueryParams();
  const [query, setQuery] = useState(() => queryValue);
  const [isFocused, setFocused] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    setSearchParams({ q: value });
  };

  return (
    <div className="max-w-md m-4 relative">
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
          value={query}
          onChange={handleChange}
          onFocus={() => setFocused(true)}
          type="search"
          id="default-search"
          className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:outline-gray-300"
          placeholder="Search users by ID, name, or address, order items"
          required
        />
      </div>
      {isFocused && (
        <div className="border border-gray-300 h-96 shadow-sm rounded-md absolute inset-0 top-16 overflow-auto">
          {data.map((user) => (
            <UserCard key={user.id} {...user} />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
