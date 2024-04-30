import { useEffect } from "react";
import useKeyPress from "../../hooks/useKeyPress.hook";
import { User } from "../../types/common";
import { useSearchInput } from "./search-input.context";
import { checkQueryPresentInData } from "./search-input.utils";
import { SearchInputCard } from "./SearchInputCard";

function useCheckSearchQueryPresentInUserData(data: User[]) {
  const { searchQuery } = useSearchInput();
  const isQueryPresentInUserData = checkQueryPresentInData(searchQuery, data);

  return isQueryPresentInUserData;
}

export function SearchInputItems({ data }: { data: User[] }) {
  const { dispatch, setHoverEnabled } = useSearchInput();
  const isQueryPresentInUserData = useCheckSearchQueryPresentInUserData(data);
  const arrowUpPressed = useKeyPress("ArrowUp");
  const arrowDownPressed = useKeyPress("ArrowDown");

  useEffect(() => {
    if (arrowUpPressed) {
      dispatch({ type: "ARROW_UP" });
    }
  }, [arrowUpPressed, dispatch]);

  useEffect(() => {
    if (arrowDownPressed) {
      dispatch({ type: "ARROW_DOWN" });
    }
  }, [arrowDownPressed, dispatch]);

  return (
    <div
      className="border border-gray-300 h-96 shadow-sm rounded-md absolute inset-0 top-16 overflow-auto"
      onMouseEnter={() => console.log("mouse hovered")}
      onMouseMove={() => setHoverEnabled(true)}
    >
      {isQueryPresentInUserData ? (
        <>
          {data.map((user, idx) => (
            <SearchInputCard key={user.id} {...user} index={idx} />
          ))}
        </>
      ) : (
        <p className="text-center py-36">No User Found</p>
      )}
    </div>
  );
}
