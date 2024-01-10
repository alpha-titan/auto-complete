import { useState, useEffect, useMemo } from "react";
import { UseAutoCompleteProps, UseAutoCompleteResult } from "./types";

export const useAutoComplete = <T>({
  fetchData,
  value,
}: UseAutoCompleteProps<T>): UseAutoCompleteResult<T> => {
  const [filteredData, setFilteredData] = useState<T[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const memoizedFilteredData = useMemo(() => {
    return filteredData;
  }, [filteredData]);

  useEffect(() => {
    const fetchDataAsync = async (): Promise<void> => {
      if (value) {
        setLoading(true);
        try {
          const data = await Promise.resolve(fetchData(value));
          setFilteredData(data);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      } else {
        setFilteredData([]);
      }
    };

    fetchDataAsync();
  }, [value, fetchData]);

  return {
    filteredData: memoizedFilteredData,
    loading,
  };
};
