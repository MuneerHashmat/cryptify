import { useContext, useEffect, useState } from "react";
import MainContext from "../context/MainContext";
import { ArrowBackIosNew, ArrowForwardIos } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { ScaleLoader } from "react-spinners";

const Home = () => {
  const context = useContext(MainContext);
  const allCrypto = context.allCrypto;
  const currency = context.currency;
  const [cryptos, setCryptos] = useState(allCrypto);
  const [searchInput, setSearchInput] = useState("");
  const initialPageNo=parseInt(sessionStorage.getItem("page")) || 1;
  const [currentPage, setCurrentPage] = useState(initialPageNo);
  const [itemsPerPage] = useState(10);
  const lastItemIndex = currentPage * itemsPerPage;
  const firstItemIndex = lastItemIndex - itemsPerPage;
  const totalPages = Math.ceil(cryptos.length / itemsPerPage);
  let pages = [];
  for (let i = 1; i <= totalPages; i++) {
    if (currentPage <= 3) {
      pages = [1, 2, 3, 4, "...", totalPages];
    } else if (currentPage >= totalPages - 2) {
      pages = [
        1,
        "...",
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    } else {
      pages = [
        1,
        "...",
        currentPage - 1,
        currentPage,
        currentPage + 1,
        "...",
        totalPages,
      ];
    }
  }

  const handleOnChange = (e) => {
    setSearchInput(e.target.value);
    if (e.target.value.trim() == "") {
      setCryptos(allCrypto);
    }
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    const searchText = searchInput.trim().toLowerCase();
    const filteredCryptos = allCrypto.filter((item) => {
      return item.name.toLowerCase().includes(searchText);
    });
    setCryptos(filteredCryptos);
  };

  useEffect(() => {
    setCryptos(allCrypto);
    setSearchInput("");
  }, [allCrypto]);

  useEffect(()=>{
    sessionStorage.setItem("page",currentPage);
  },[currentPage])

  return (
    <>
      <div className="pt-[100px]">
        <div className="mx-auto text-center flex flex-col gap-4 justify-center items-center">
          <h1 className="sm:text-[60px] text-[35px] font-bold uppercase sm:leading-[65px] leading-[40px]">
            Stay ahead of the <br />{" "}
            <span className="text-[#F0B90B]">crypto curve</span>
          </h1>
          <p className="text-lg md:text-xl text-center max-w-[525px] w-[90vw]">
            Track prices, analyze trends, and make informed decisions. Easy,
            reliable, and free.
          </p>
        </div>
        {context.loading ? (
          <div className="mt-10 h-[600px] py-20 lg:w-[60vw] w-[90vw] mx-auto rounded-md bg-[#FAFAFA] dark:bg-[#1E2329] shadow flex justify-center">
            <ScaleLoader
              color="#F0B90B"
              height={100}
              margin={10}
              radius={10}
              width={10}
            />
          </div>
        ) : (
          <>
            <div className="mt-10 lg:w-[60vw] w-[90vw] mx-auto">
              <form
                className="flex justify-center gap-2 items-center lg:w-[40vw] md:w-[60vw] mx-auto w-[85vw]"
                onSubmit={handleOnSubmit}
              >
                <input
                  type="text"
                  placeholder="search crypto"
                  className="bg-white dark:bg-[#181A20] border
                   border-gray-600 dark:border-gray-300 overflow-hidden px-2 py-1 text-xl rounded-md outline-none md:w-[78%] w-[68%]"
                  value={searchInput}
                  onChange={handleOnChange}
                />
                <button className="rounded-md bg-[#F0B90B] px-3 py-2 hover:scale-105 text-black md:w-[18%] w-[28%]">
                  Search
                </button>
              </form>
            </div>

            <div className="mt-5 mb-10 lg:w-[60vw] w-[90vw] mx-auto rounded-md bg-[#FAFAFA] dark:bg-[#1E2329] shadow">
              <div className=" grid md:grid-cols-full sm:grid-cols-small grid-cols-smaller py-4 px-5 border-b border-gray-300 dark:border-gray-600">
                <p>#</p>
                <p className="ml-3">Crypto</p>
                <p>Price</p>
                <p className="text-center">24h Change</p>
                <p className="text-right md:block hidden">Market Cap</p>
              </div>

              {cryptos.slice(firstItemIndex, lastItemIndex).map((item) => (
                <Link
                  to={`/crypto/${item.id}`}
                  key={item.id}
                  className="main-table grid  md:grid-cols-full sm:grid-cols-small grid-cols-smaller items-center py-4 px-5 border-b border-gray-300 dark:border-gray-600 cursor-pointer"
                >
                  <p>{item.market_cap_rank}</p>
                  <div className="flex items-center gap-2">
                    <img
                      src={item.image}
                      alt="image"
                      className="w-[30px] sm:w-[40px] rounded-full"
                    />
                    <p>
                      <span className="uppercase">{item.symbol} </span>
                      <br />
                      <span className="text-sm hidden sm:inline text-gray-500 dark:text-gray-300">
                        {item.name}
                      </span>
                    </p>
                  </div>
                  <p>
                    {currency.symbol} {item.current_price.toLocaleString()}
                  </p>
                  <p
                    style={{ textAlign: "center" }}
                    className={
                      item.price_change_percentage_24h > 0
                        ? " text-green-600"
                        : "text-red-600"
                    }
                  >
                    {Math.floor(item.price_change_percentage_24h * 100) / 100}
                  </p>
                  <p className="text-right md:block hidden">
                    {currency.symbol} {item.market_cap.toLocaleString()}
                  </p>
                </Link>
              ))}
            </div>
            {cryptos.length >= allCrypto.length && (
              <div className="flex gap-1 justify-center lg:w-[60vw] w-[90vw] mx-auto mb-20">
                <button
                  disabled={currentPage == 1 ? true : false}
                  onClick={() => setCurrentPage(currentPage - 1)}
                  className="bg-[#FAFAFA] dark:bg-[#1E2329] py-1 px-1 rounded-md shadow-sm border border-gray-300 dark:border-gray-600"
                  style={{ color: currentPage == 1 ? "gray" : null }}
                >
                  <ArrowBackIosNew />
                </button>
                {pages.map((page, index) =>
                  page === "..." ? (
                    <p key={index}>{page}</p>
                  ) : (
                    <button
                      key={index}
                      className="bg-[#FAFAFA] dark:bg-[#1E2329] py-1 px-4 rounded-md shadow-sm border border-gray-300 dark:border-gray-600"
                      style={{
                        backgroundColor: page == currentPage ? "#F0B90B" : null,
                        padding: page >= 10 ? "4px 12px" : "",
                      }}
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </button>
                  )
                )}
                <button
                  disabled={currentPage == totalPages ? true : false}
                  onClick={() => setCurrentPage(currentPage + 1)}
                  className="bg-[#FAFAFA] dark:bg-[#1E2329] py-1 px-1 rounded-md shadow-sm border border-gray-300 dark:border-gray-600"
                  style={{ color: currentPage == totalPages ? "gray" : null }}
                >
                  <ArrowForwardIos />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Home;
