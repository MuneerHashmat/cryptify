import PropTypes from "prop-types";
import MainContext from "./MainContext";
import { useEffect, useState } from "react";
import { api } from "../config/axiosInstance";
import toast from "react-hot-toast";

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

    try {
      const response = await api.get(`markets?vs_currency=${currency.name}`);
      console.log(response.data);
      setAllCrypto(response.data);
    } catch (error) {
      if (error.code === "ECONNABORTED") {
        toast.error("Request timeout!");
      } else {
        console.error("Error:", error.message);
      }
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
