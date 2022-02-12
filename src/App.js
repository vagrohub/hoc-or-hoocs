import { useState, useEffect } from "react";
import "./styles.css";

export default function App({ list }) {
  const [enteredSearchValue, setEnteredSearchValue] = useState("");
  const [activeSearchValue, setActiveSearchValue] = useState("");
  const [sortMode, setSortMode] = useState(null);

  const availableItems = activeSearchValue
    ? list.filter((item) => RegExp(activeSearchValue, "i").test(item.title))
    : list;

  const sortedItems = !sortMode
    ? availableItems
    : availableItems.slice().sort((a, b) => {
        if (sortMode === "asc" && a.title > b.title) {
          return 1;
        } else if (sortMode === "asc") {
          return -1;
        } else if (sortMode === "desc" && a.title > b.title) {
          return -1;
        } else {
          return 1;
        }
      });

  useEffect(() => {
    const handler = setTimeout(() => {
      setActiveSearchValue(enteredSearchValue);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [enteredSearchValue]);

  return (
    <div className="App">
      <div className="form">
        <input
          type="search"
          value={enteredSearchValue}
          onChange={(e) => setEnteredSearchValue(e.target.value)}
          placeholder="search todo"
        />
        <div className="form-radio">
          <input
            type="radio"
            name="sort"
            value="asc"
            checked={sortMode === "asc"}
            onChange={(e) => setSortMode(e.target.value)}
          />{" "}
          A-Z
          <input
            type="radio"
            name="sort"
            value="desc"
            checked={sortMode === "desc"}
            onChange={(e) => setSortMode(e.target.value)}
          />{" "}
          Z-A
        </div>
      </div>

      <ul>
        {sortedItems.map((item) => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
    </div>
  );
}
