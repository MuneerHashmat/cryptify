import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import MainContext from "../context/MainContext";
import { ScaleLoader } from "react-spinners";
import { ArrowBack } from "@mui/icons-material";
import LineChart from "../components/LineChart";
import toast from "react-hot-toast";

const CryptoDetails = () => {
  const { cryptoId } = useParams();
  const [cryptoData, setCryptoData] = useState(null);
  const [historicalData, setHistoricalData] = useState(null);
  const [loading, setLoading] = useState(false);
  const context = useContext(MainContext);
  const currency = context.currency;

  const fetchData = async () => {
    setLoading(true);
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": "CG-FFJXfwWGdxU5iArVafJc7c2h",
      },
    };
    try {
      const [cryptoResponse, historicResponse] = await Promise.all([
        fetch(`https://api.coingecko.com/api/v3/coins/${cryptoId}`, options),
        fetch(
          `https://api.coingecko.com/api/v3/coins/${cryptoId}/market_chart?vs_currency=${currency.name}&days=7&interval=daily`,
          options
        ),
      ]);

      const cryptoJson = await cryptoResponse.json();
      const historicJson = await historicResponse.json();

      setCryptoData(cryptoJson);
      setHistoricalData(historicJson);

      console.log(cryptoJson);
      console.log(historicJson);
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch data for this crypto!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currency]);
  return (
    <div className="pt-[100px]">
      <div className="md:mx-16 mx-[5vw] p-1 w-max mb-10 bg-[#F0B90B] rounded-md hover:scale-[1.02] transition-all text-black">
        <Link to={"/"} className="flex gap-2 ">
          <ArrowBack sx={{ fontSize: "30px" }} />
        </Link>
      </div>
      {cryptoData && historicalData && !loading ? (
        <div className="mt-5 mb-10 pt-5 pb-7 px-2 lg:w-[60vw] w-[90vw] mx-auto rounded-md bg-[#FAFAFA] dark:bg-[#1E2329] shadow">
          <div className="mx-auto flex flex-col justify-center items-center">
            <img
              src={cryptoData.image.large}
              alt="image"
              className="rounded-full w-[150px]"
            />
            <h1 className="text-xl">
              {cryptoData.name} ({cryptoData.symbol.toUpperCase()})
            </h1>
          </div>

          <div className="md:px-10 sm:px-2 px-1 mx-auto mt-10 sm:h-[300px] h-[200px]">
            <LineChart historicalData={historicalData} />
          </div>

          <div className="mt-10">
            <div className="sm:px-10 px-1 py-2 flex justify-between">
              <p>Crypto Market Rank</p>
              <p>{cryptoData.market_cap_rank}</p>
            </div>
            <hr />
            <div className="sm:px-10 px-1 py-2 flex justify-between">
              <p>Current price</p>
              <p>
                {currency.symbol}
                {cryptoData.market_data.current_price[
                  currency.name
                ].toLocaleString()}
              </p>
            </div>

            <hr />
            <div className="sm:px-10 px-1 py-2 flex justify-between">
              <p>Market Cap</p>
              <p>
                {currency.symbol}
                {cryptoData.market_data.market_cap[
                  currency.name
                ].toLocaleString()}
              </p>
            </div>
            <hr />

            <div className="sm:px-10 px-1 py-2 flex justify-between">
              <p>24h high</p>
              <p>
                {currency.symbol}
                {cryptoData.market_data.high_24h[
                  currency.name
                ].toLocaleString()}
              </p>
            </div>
            <hr />
            <div className="sm:px-10 px-1 py-2 flex justify-between">
              <p>24h low</p>
              <p>
                {currency.symbol}
                {cryptoData.market_data.low_24h[currency.name].toLocaleString()}
              </p>
            </div>
            <hr />
          </div>
        </div>
      ) : (
        <div className="p-4 mt-5 mb-[200px] lg:w-[60vw] w-[90vw] mx-auto rounded-md bg-[#FAFAFA] dark:bg-[#1E2329] shadow flex justify-center items-center">
          <ScaleLoader
            color="#F0B90B"
            height={100}
            margin={10}
            radius={10}
            width={10}
          />
        </div>
      )}
    </div>
  );
};

export default CryptoDetails;
