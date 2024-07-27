import { useContext } from "react";
import logo from "../assets/cryptocurrency.png";
import MainContext from "../context/MainContext";
import { Link } from "react-router-dom";
import { LightMode, DarkMode } from "@mui/icons-material";
const Navbar = () => {
  const context = useContext(MainContext);

  const currencyHandler = (value) => {
    switch (value) {
      case "usd":
        context.setNewCurrency({ name: "usd", symbol: "$" });
        break;
      case "eur":
        context.setNewCurrency({ name: "eur", symbol: "€" });
        break;
      case "inr":
        context.setNewCurrency({ name: "inr", symbol: "₹" });
        break;
      default:
        context.setNewCurrency({ name: "usd", symbol: "$" });
        break;
    }
  };
  return (
    <div className="flex justify-between px-12 py-[17px] w-[100vw] fixed text-[#F0B90B] bg-white dark:bg-[#181A20] shadow-md top-0 z-30">
      <Link to="/">
        <div className="flex gap-2 items-center">
          <img src={logo} alt="logo" className="w-[30px] h-[30px]" />
          <p className="font-bold text-xl">CRYPTIFY</p>
        </div>
      </Link>

      <div className="flex gap-3 items-center">
        <select
          onChange={(e) => currencyHandler(e.target.value)}
          className="bg-white dark:bg-[#181A20] font-bold rounded-md outline-none  border border-white  dark:border-[#181A20]"
        >
          <option value="usd">USD</option>
          <option value="eur">EUR</option>
          <option value="inr">INR</option>
        </select>
        <button
          onClick={() => context.setTheme()}
          className="hover:scale-[1.05]"
        >
          {!context.isDark ? (
            <LightMode sx={{ fontSize: "35px" }} />
          ) : (
            <DarkMode x={{ fontSize: "35px" }} />
          )}
        </button>
      </div>
    </div>
  );
};

export default Navbar;
