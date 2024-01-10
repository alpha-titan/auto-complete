import React, { useCallback } from "react";
import { Post } from "../../components/AutoComplete/types";
import AutoComplete from "../../components/AutoComplete/AutoComplete";
import { getItemKey } from "../../utils/util";

const AutoCompleteContainer = () => {
  const handleInputChange = async (value: string) => {
    console.log(value);
  };

  const fetchDataAsync = useCallback(
    async (query: string): Promise<string[]> => {
      if (!query) {
        return [];
      }
      try {
        // Fetch data from a sample API (JSONPlaceholder)
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/posts?title_like=${query}`
        );
        const data: Post[] = await response.json();

        // Extract titles from the fetched data
        const titles = data.map((post) => post.title);
        return titles;
      } catch (error) {
        console.error("Error fetching data:", error);
        return [];
      }
    },
    []
  );

  // mock data function

  // const fetchDataAsync = useCallback(
  //   async (query: string): Promise<string[]> => {
  //     if (!query) {
  //       return [];
  //     }
  //     const mockData = [
  //       "apple",
  //       "banana",
  //       "cherry",
  //       "date",
  //       "elderberry",
  //       "fig",
  //     ];
  //     const filteredData = mockData.filter((item) => item.includes(query));
  //     return filteredData;
  //   },
  //   []
  // );

  return (
    <AutoComplete
      onChange={handleInputChange}
      fetchData={fetchDataAsync}
      getDataKey={getItemKey}
      shouldDebounce={true}
      delay={500}
    />
  );
};

export default AutoCompleteContainer;
