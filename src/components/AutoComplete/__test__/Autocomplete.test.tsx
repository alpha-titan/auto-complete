import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import AutoComplete from "../AutoComplete";
import { DEFAULT_INPUT_PLACE_HOLDER } from "../constants";

const mockFetchData = async (query: string): Promise<string[]> => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return ["apple", "banana", "cherry", "date", "elderberry", "fig"].filter(
    (item) => item.includes(query)
  );
};

test("renders AutoComplete component", async () => {
  render(<AutoComplete fetchData={mockFetchData} getDataKey={(ele) => ele} />);

  const inputElement = screen.getByPlaceholderText(DEFAULT_INPUT_PLACE_HOLDER);

  fireEvent.change(inputElement, { target: { value: "ban" } });

  await waitFor(() => screen.getByText("banana"));

  expect(screen.getByText("banana")).toBeInTheDocument();
  expect(screen.queryByText("apple")).not.toBeInTheDocument();
});
