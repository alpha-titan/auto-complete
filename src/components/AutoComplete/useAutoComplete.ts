import { useState, useEffect, useMemo, Dispatch } from "react";

interface UseAutoCompleteProps<T> {
  fetchData: (query: string) => Promise<T[]>;
  value: string;
  shouldDebounce?: boolean;
  delay?: number;
  setInputValue: Dispatch<React.SetStateAction<string>>;
}

interface UseAutoCompleteResult<T> {
  filteredData: T[];
  loading: boolean;
}

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
    console.log({ value });
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
