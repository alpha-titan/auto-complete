import { ChangeEvent, Dispatch, SetStateAction } from "react";

export interface IAutoCompleteProps<T = string> {
  fetchData: (query: string) => Promise<T[]>;
  getDataKey: (item: T) => string;
}

// eslint-disable-next-line
type DebouncedFunction<T extends (...args: any[]) => any> = (
  ...args: Parameters<T>
) => void;

export interface IUseAutoCompleteProps<T> {
  fetchData: DebouncedFunction<(query: string) => Promise<T[]>>;
}

export interface IUseAutoCompleteResult<T> {
  inputValue: string;
  filteredData: T[];
  loading: boolean;
  handleInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  setInputValue: Dispatch<SetStateAction<string>>;
}

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}
