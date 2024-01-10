import React, { useCallback } from "react";
import { Phone } from "../../components/AutoComplete/types";
import AutoComplete from "../../components/AutoComplete/AutoComplete";
import { getItemKey } from "../../utils/util";
import ripplingLogo from "../../assets/Rippling logo.svg";
import { AUTO_COMPLETE_TITLE } from "./constants";

// This is the cosumer container

const CrossTeamContainer = () => {
  const handleInputChange = async (value: string) => {
    console.log(value);
  };

  const fetchDataAsync = useCallback(
    async (query: string): Promise<string[]> => {
      if (!query) {
        return [];
      }
      try {
        // this use albums api
        // https://dummyjson.com/products/search?q=phone
        const response = await fetch(
          `https://dummyjson.com/products/search?q=${query}`
        );
        const data = await response.json();
        const { products = [] }: { products: Phone[] } = data;
        // Extract titles from the fetched data
        const phones: string[] = products?.map((phone) => phone?.title ?? "");
        return phones;
      } catch (error) {
        console.error("Error fetching data:", error);
        return [];
      }
    },
    []
  );

  return (
    <AutoComplete
      title={AUTO_COMPLETE_TITLE}
      onChange={handleInputChange}
      fetchData={fetchDataAsync}
      getDataKey={getItemKey}
      shouldDebounce={true}
      delay={500}
      shouldShowLogo={true}
      logoSrc={ripplingLogo}
    />
  );
};

export default CrossTeamContainer;
