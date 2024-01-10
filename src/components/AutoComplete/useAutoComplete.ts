import {
  useState,
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useMemo,
} from "react";
import useDebounce from "./useDebounce";

interface UseAutoCompleteProps<T> {
  fetchData: (query: string) => Promise<T[]>;
}

interface UseAutoCompleteResult<T> {
  inputValue: string;
  setInputValue: Dispatch<SetStateAction<string>>;
  filteredData: T[];
  loading: boolean;
  handleInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  debouncedValue: string;
}

export const useAutoComplete = <T>({
  fetchData,
}: UseAutoCompleteProps<T>): UseAutoCompleteResult<T> => {
  const [inputValue, setInputValue] = useState<string>("");
  const [filteredData, setFilteredData] = useState<T[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const debouncedInputValue = useDebounce(inputValue, 200);

  const memoizedFilteredData = useMemo(() => {
    return filteredData;
  }, [filteredData]);

  useEffect(() => {
    const fetchDataAsync = async (): Promise<void> => {
      if (debouncedInputValue) {
        setLoading(true);
        try {
          setTimeout(async () => {
            const data = await Promise.resolve(fetchData(debouncedInputValue));
            setFilteredData(data);
            setLoading(false);
          }, 1000);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      } else {
        setFilteredData([]);
      }
    };

    fetchDataAsync();
  }, [debouncedInputValue, fetchData]);

  const handleInputChange = async (
    event: ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    const value = event.target.value;
    setInputValue(value);
  };

  return {
    inputValue,
    setInputValue,
    filteredData: memoizedFilteredData,
    loading,
    handleInputChange,
    debouncedValue: debouncedInputValue,
  };
};
