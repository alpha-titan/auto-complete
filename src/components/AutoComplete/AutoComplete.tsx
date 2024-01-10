import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useAutoComplete } from "./useAutoComplete";
import { IAutoCompleteProps } from "./types";
import { DEFAULT_INPUT_PLACE_HOLDER } from "./constants";
import "./styles/autocomplete.styles.css";
import SuggestionContainer from "./SuggestionContainer/SuggestionContainer";
import useDebounce from "./useDebounce";

const AutoComplete: React.FC<IAutoCompleteProps> = React.memo(
  ({
    fetchData,
    getDataKey,
    value = "",
    onChange,
    shouldDebounce,
    delay,
    title,
    shouldShowLogo,
    logoSrc,
  }) => {
    const [isLogoVisible, setLogoVisibility] = useState(false);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [inputValue, setInputValue] = useState<string>(value);

    const debouncedValue = useDebounce(inputValue, delay ?? 1000);
    console.log({ debouncedValue });

    const { filteredData = [], loading } = useAutoComplete({
      fetchData,
      value: shouldDebounce ? debouncedValue : inputValue,
      setInputValue,
    });
    useEffect(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, [inputValue]);

    const handleInputChange = async (
      event: ChangeEvent<HTMLInputElement>
    ): Promise<void> => {
      const currValue = event.target.value;
      setInputValue(currValue);
      onChange(currValue);
    };

    const handleInputFocus = useCallback(() => {
      setLogoVisibility(true);
    }, [setLogoVisibility]);

    const handleInputBlur = useCallback(() => {
      setLogoVisibility(false);
    }, [setLogoVisibility]);

    const handleSuggestionClick = useCallback(
      (value: string) => {
        setInputValue(value);
        inputRef.current?.focus();
      },
      [inputRef]
    );

    return (
      <div className="auto-complete-container">
        <h3>{title}</h3>
        <div className="container">
          {shouldShowLogo && (
            <img
              src={logoSrc}
              alt="Logo"
              // just a small add on to make it "Deel search" :)
              className={
                isLogoVisible
                  ? `logo logo-slide ${loading && "logo-jump"}`
                  : "logo"
              }
            />
          )}
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            className="input-box"
            // Isolation string constants to seperate file for i18n
            placeholder={DEFAULT_INPUT_PLACE_HOLDER}
          />

          {!loading && (
            <SuggestionContainer
              inputValue={shouldDebounce ? debouncedValue : inputValue}
              filteredData={filteredData ?? []}
              getDataKey={getDataKey}
              handleSuggestionClick={handleSuggestionClick}
            />
          )}
        </div>
      </div>
    );
  }
);
export default AutoComplete;
