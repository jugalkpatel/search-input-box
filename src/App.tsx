import { data } from "./utils";
import { SearchInput } from "./components/SearchInput/SearchInput";
import { SearchInputContent } from "./components/SearchInput/SearchInputContent";

// onFocus drop down should open with some initial items
// onBlur drop down should close
// you provide dropdown items and value
// onHover set selected item
// onKeyDown handle keyboard events
// if input is focus and then use presses down button then open popup
// show no results, if string not found
// whenever input got focus set selected index to 0, also when user clicks outside
// handle case where mouse is keep hoverover

function App() {
  return (
    <SearchInput>
      <SearchInputContent data={data} />
    </SearchInput>
  );
}

export default App;
