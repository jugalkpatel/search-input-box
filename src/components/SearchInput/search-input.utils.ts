import { User } from "../../types/common";
import { checkPresentInItems, combineAddress } from "../../utils";

export function getHighlightedText(text: string, queryValue: string) {
  const index = queryValue
    ? text.toLowerCase().indexOf(queryValue.toLowerCase())
    : -1;
  const isTextFound = index > -1;
  const leading = isTextFound ? text.slice(0, index) : "";
  const trailing = isTextFound ? text.slice(index + queryValue.length) : "";
  const middle = isTextFound
    ? text.slice(index, index + queryValue.length)
    : "";

  return { leading, trailing, middle, index };
}

// make custom hook that takes data, uses querystring is return true if there are results else false
export function checkQueryPresentInData(queryValue: string, data: User[]) {
  if (!queryValue) {
    return true;
  }

  return data.some((user) => {
    const { id, name, address, items, pincode } = user;
    const addressLine = combineAddress(address);

    if (getHighlightedText(name, queryValue).index > -1) {
      return true;
    }

    if (getHighlightedText(addressLine, queryValue).index > -1) {
      return true;
    }

    if (getHighlightedText(pincode, queryValue).index > -1) {
      return true;
    }

    if (getHighlightedText(id, queryValue).index > -1) {
      return true;
    }

    if (checkPresentInItems(items, queryValue)) {
      return true;
    }

    return false;
  });
}
