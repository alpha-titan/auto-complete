// App.tsx
import { useCallback } from "react";
import "./App.css";
import AutoComplete from "./components/AutoComplete/AutoComplete";
import { Post } from "./components/AutoComplete/types";
import { getItemKey } from "./utils/util";

function App() {
  /**
   *
   * UNCOMMENT BELOW TO WORK WITH REAL API
   *
   */

  // const fetchDataAsync = useCallback(
  //   async (query: string): Promise<string[]> => {
  //     if (!query) {
  //       return [];
  //     }

  //     try {
  //       // Fetch data from a sample API (JSONPlaceholder)
  //       const response = await fetch(
  //         `https://jsonplaceholder.typicode.com/posts?title_like=${query}`
  //       );
  //       const data: Post[] = await response.json();

  //       // Extract titles from the fetched data
  //       const titles = data.map((post) => post.title);
  //       return titles;
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //       return [];
  //     }
  //   },
  //   []
  // );

  const fetchDataAsync = useCallback(
    async (query: string): Promise<string[]> => {
      if (!query) {
        return [];
      }
      const mockData = [
        "apple",
        "banana",
        "cherry",
        "date",
        "elderberry",
        "fig",
      ];
      const filteredData = mockData.filter((item) => item.includes(query));
      return filteredData;
    },
    []
  );

  return (
    <div className="appContainer">
      <AutoComplete fetchData={fetchDataAsync} getDataKey={getItemKey} />
    </div>
  );
}

export default App;
