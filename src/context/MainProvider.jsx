import PropTypes from "prop-types";
import MainContext from "./MainContext";
import { useEffect, useState } from "react";

const MainProvider = ({ children }) => {
  const initialState = localStorage.getItem("theme") === "dark";
  const [isDark, setIsDark] = useState(initialState);
  const [allCrypto, setAllCrypto] = useState([]);
  const [currency, setCurrency] = useState({
    name: "usd",
    symbol: "$",
  });

  const fetchAllCrypto = async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": "CG-FFJXfwWGdxU5iArVafJc7c2h",
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
    }
  };

  const setTheme = () => {
    setIsDark(!isDark);
  };

  const setNewCurrency = (obj) => {
    setCurrency(obj);
  };

  useEffect(() => {
    if (isDark) {
      window.document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      window.document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  useEffect(() => {
    fetchAllCrypto();
  }, [currency]);

  return (
    <MainContext.Provider
      value={{ isDark, allCrypto, currency, setTheme, setNewCurrency }}
    >
      {children}
    </MainContext.Provider>
  );
};

MainProvider.propTypes = {
  children: PropTypes.node,
};

export default MainProvider;
