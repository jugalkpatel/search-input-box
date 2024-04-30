import { User } from "../../types/common";
import { SearchInputContext } from "./search-input.context";
import { actions } from "../../constants";
import { useCallback, useReducer } from "react";
import { data } from "../../utils";

const initialState: {
  selectedIndex: number;
  searchQuery: string;
  data: User[];
  isHoverEnabled: boolean;
} = { selectedIndex: 0, searchQuery: "", data, isHoverEnabled: true };

export type ACTIONTYPE =
  | { type: typeof actions.SET_HOVER; payload: boolean }
  | { type: typeof actions.SET_INDEX; payload: number }
  | { type: typeof actions.SET_QUERY; payload: string }
  | { type: typeof actions.SET_DATA; payload: User[] }
  | { type: typeof actions.ARROW_UP }
  | { type: typeof actions.ARROW_DOWN };

function reducer(state: typeof initialState, action: ACTIONTYPE) {
  switch (action.type) {
    case actions.SET_HOVER:
      return {
        ...state,
        isHoverEnabled: action.payload,
      };
    case actions.SET_INDEX:
      return {
        ...state,
        selectedIndex: action.payload,
      };
    case actions.SET_QUERY:
      return {
        ...state,
        searchQuery: action.payload,
      };
    case actions.ARROW_UP:
      return {
        ...state,
        isHoverEnabled: false,
        selectedIndex:
          state.selectedIndex !== 0
            ? state.selectedIndex - 1
            : state.data.length - 1,
      };
    case actions.ARROW_DOWN:
      return {
        ...state,
        isHoverEnabled: false,
        selectedIndex:
          state.selectedIndex !== state.data.length - 1
            ? state.selectedIndex + 1
            : 0,
      };
    case actions.SET_DATA:
      return {
        ...state,
        data: action.payload,
      };
    default:
      throw new Error();
  }
}

export default function SearchInputProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setSelectedIndex = (index: number) => {
    dispatch({ type: actions.SET_INDEX, payload: index });
  };

  const setSearchQuery = (query: string) => {
    dispatch({ type: actions.SET_QUERY, payload: query });
  };

  const handleHover = useCallback((value: boolean) => {
    dispatch({ type: actions.SET_HOVER, payload: value });
  }, []);

  return (
    <SearchInputContext.Provider
      value={{
        ...state,
        dispatch,
        setSelectedIndex,
        setSearchQuery,
        setHoverEnabled: handleHover,
      }}
    >
      {children}
    </SearchInputContext.Provider>
  );
}
