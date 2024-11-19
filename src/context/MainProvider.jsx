import PropTypes from "prop-types";
import MainContext from "./MainContext";
import { useEffect, useState } from "react";
import { API_KEY } from "../config/apiKey";

const MainProvider = ({ children }) => {
  const initialState = localStorage.getItem("theme") === "light";
  const [themeFlag, setThemeFlag] = useState(initialState);
  const [allCrypto, setAllCrypto] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currency, setCurrency] = useState({
    name: "usd",
    symbol: "$",
  });

  const fetchAllCrypto = async () => {
    setLoading(true);
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": API_KEY,
      },
    };

    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}`,
        options
      );
      const data = await response.json();
      console.log(data);
      setAllCrypto(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const setTheme = () => {
    setThemeFlag(!themeFlag);
  };

  const setNewCurrency = (obj) => {
    setCurrency(obj);
  };

  useEffect(() => {
    if (themeFlag) {
      window.document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      window.document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
  }, [themeFlag]);

  useEffect(() => {
    fetchAllCrypto();
  }, [currency]);

  return (
    <MainContext.Provider
      value={{
        themeFlag,
        allCrypto,
        currency,
        loading,
        setTheme,
        setNewCurrency,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};

MainProvider.propTypes = {
  children: PropTypes.node,
};

export default MainProvider;
