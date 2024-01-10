import React, { useCallback, useEffect, useRef, useState } from "react";
import { useAutoComplete } from "./useAutoComplete";
import { IAutoCompleteProps } from "./types";
import { DEFAULT_INPUT_PLACE_HOLDER } from "./constants";
import "./styles/styles.css";
import deelLogo from "../../assets/Brand.svg";
import SuggestionContainer from "./SuggestionContainer/SuggestionContainer";

const AutoComplete: React.FC<IAutoCompleteProps> = React.memo(
  ({ fetchData, getDataKey }) => {
    const [isLogoVisible, setLogoVisibility] = useState(false);
    const inputRef = useRef<HTMLInputElement | null>(null);

    const {
      inputValue,
      setInputValue,
      filteredData = [],
      loading,
      handleInputChange,
      debouncedValue,
    } = useAutoComplete({
      fetchData,
    });
    useEffect(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, [inputValue]);
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
      [inputRef, setInputValue]
    );

    return (
      <div className="container">
        <img
          src={deelLogo}
          alt="Logo"
          // just a small add on to make it "Deel search" :)
          className={
            isLogoVisible ? `logo logo-slide ${loading && "logo-jump"}` : "logo"
          }
        />
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

        {!loading && filteredData?.length > 0 && (
          <SuggestionContainer
            inputValue={debouncedValue}
            filteredData={filteredData ?? []}
            getDataKey={getDataKey}
            handleSuggestionClick={handleSuggestionClick}
          />
        )}
      </div>
    );
  }
);
export default AutoComplete;
