import { useEffect, useRef } from "react";
import { AddressType, User } from "../../types/common";
import { useSearchInput } from "./search-input.context";
import { checkPresentInItems } from "../../utils";
import { getHighlightedText } from "./search-input.utils";
import clsx from "clsx";

function ItemFound() {
  const { searchQuery } = useSearchInput();
  return (
    <p className="border-y-2 border-grey-500 py-1 text-md before:content-['•'] before:text-blue-800 before:p-1 before:font-extrabold before:text-md my-1">
      {searchQuery} found in items
    </p>
  );
}

function TextWithHighlight({ text }: { text: string }) {
  const { searchQuery } = useSearchInput();
  const { leading, middle, trailing, index } = getHighlightedText(
    text,
    searchQuery
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

function Address(props: AddressType & { pincode: string }) {
  const { streetAddress, city, state, country, pincode } = props;
  const addressLines = [streetAddress, city];
  if (state) {
    addressLines.push(`${state}`);
  }
  const address = addressLines.join(", ");

  return (
    <div className="mt-1 font-normal text-sm">
      <TextWithHighlight text={address} />
      <p>
        <TextWithHighlight text={country} />
        {", "}
        <TextWithHighlight text={pincode} />
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

export function SearchInputCard(props: User & { index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { searchQuery, selectedIndex, isHoverEnabled, setSelectedIndex } =
    useSearchInput();
  const { id, name, address, items, pincode, index } = props;
  const isPresentInItems = checkPresentInItems(items, searchQuery);

  useEffect(() => {
    // Keyboard will take preference if mouse is kept hovered on the list, similarly mouse will take preference if
    // keyboard navigation is not used
    if (index === selectedIndex) {
      ref.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center",
      });
      // setHoverEnabled(false);
    }
  }, [index, selectedIndex]);

  const handleClick = (index: number) => {
    if (isHoverEnabled) {
      setSelectedIndex(index);
    }
  };

  return (
    <div
      ref={ref}
      className={clsx(
        "border-b flex flex-col p-4 cursor-pointer last:border-b-0",
        {
          "bg-gray-100": index === selectedIndex,
        }
      )}
      onMouseEnter={() => handleClick(index)}
    >
      <p className="font-semibold">{id}</p>
      <Name name={name} />
      {isPresentInItems && <ItemFound />}
      <Address {...address} pincode={pincode} />
    </div>
  );
}
