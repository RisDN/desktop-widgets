import { useEffect, useState } from "react";
import "./App.css";
import {
  afterDays,
  afterHours,
  afterMonths,
  afterYears,
  formatDate,
  wasMonthsAgo,
  wasYearsAgo,
  wasDaysAgo,
  wasHoursAgo,
} from "./utils";
import Freecurrencyapi from "./currency";

function App() {
  const [numbers, setNumbers] = useState<number[]>([0]);
  const [eur, setEur] = useState<number>(0);
  const [usd, setUsd] = useState<number>(0);

  const dislayNumbers = (): string => {
    if (numbers.length === 0) return "-";
    return numbers.join("");
  };

  const toExactNumber = (): number => {
    return parseInt(dislayNumbers());
  };

  const currencyapi = new Freecurrencyapi("");
  useEffect(() => {
    setCurrencies();
  }, []);


  const setCurrencies = async () => {
    currencyapi
      .latest({
        base_currency: "EUR",
      })
      .then((data) => {
        console.log(data.data);
        setEur(data.data.HUF);
      });
    currencyapi
      .latest({
        base_currency: "USD",
      })
      .then((data) => {
        console.log(data.data);
        setUsd(data.data.HUF);
      });
  };

  const exchange = (from: string, to: string): number => {
    if (from === "EUR" && to === "HUF") return round(eur * toExactNumber(), 2);
    if (from === "HUF" && to === "EUR") return round(toExactNumber() / eur, 2);
    if (from === "USD" && to === "HUF") return round(usd * toExactNumber(), 2);
    if (from === "HUF" && to === "USD") return round(toExactNumber() / usd, 2);
    return 32;
  };

  const round = (num: number, digits: number): number => {
    return Math.round(num * Math.pow(10, digits)) / Math.pow(10, digits);
  };

  return (
    <>
      <div className="current-number text-white text-4xl flex flex-row justify-center items-center align-middle border-1 w-auto h-12 bg-slate-600">
        {dislayNumbers()}
      </div>

      <div className="grid col-span-2 grid-cols-2 text-fuchsia-200 w-full">
        <div className="row-auto">
          <h1 className="text-center">Pénznem</h1>
          <div className="flex flex-col">
            <span>
              {dislayNumbers()} EUR = {exchange("EUR", "HUF")} HUF
            </span>
            <span>
              {dislayNumbers()} HUF = {exchange("HUF", "EUR")} EUR
            </span>

            <span>
              {dislayNumbers()} USD = {exchange("USD", "HUF")} HUF
            </span>

            <span>
              {dislayNumbers()} HUF = {exchange("HUF", "USD")} USD
            </span>
          </div>
          <div>
            <button onClick={() => setCurrencies()} className="mx-2 px-4 py-2 bg-gray-400 rounded-md text-lg font-semibold hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50">Refresh</button>
          </div>
        </div>
        <div className="row-auto">
          <h1 className="text-center">Idő</h1>
          <div className="flex flex-col text-green-500">
            <span>
              {dislayNumbers()} óra múlva lesz:
              {formatDate(afterHours(toExactNumber()))}
            </span>
            <span>
              {dislayNumbers()} nap múlva lesz:
              {formatDate(afterDays(toExactNumber()))}
            </span>
            <span>
              {dislayNumbers()} hónap múlva lesz:
              {formatDate(afterMonths(toExactNumber()))}
            </span>
            <span>
              {dislayNumbers()} év múlva lesz:
              {formatDate(afterYears(toExactNumber()))}
            </span>
          </div>
          <div className="flex flex-col text-red-500">
            <span>
              {dislayNumbers()} órával ezelőtt:
              {formatDate(wasHoursAgo(toExactNumber()))}
            </span>
            <span>
              {dislayNumbers()} nappal ezelőtt:
              {formatDate(wasDaysAgo(toExactNumber()))}
            </span>
            <span>
              {dislayNumbers()} hónappal ezelőtt:
              {formatDate(wasMonthsAgo(toExactNumber()))}
            </span>
            <span>
              {dislayNumbers()} évvel ezelőtt:
              {formatDate(wasYearsAgo(toExactNumber()))}
            </span>
          </div>
        </div>
      </div>

      <div className="flex align-middle items-center justify-center h-[100vh]">
        <div className="control-buttons"></div>
        {Array.from({ length: 10 }).map((_, number) => (
          <button
            onClick={() => {
              if (numbers[0] === 0) {
                setNumbers([number]);
              } else {
                setNumbers([...numbers, number]);
              }
            }}
            key={number}
            className=" mx-2 px-4 py-2 bg-gray-400 rounded-md text-lg font-semibold hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
          >
            {number}
          </button>
        ))}
        <button
          onClick={() => setNumbers([])}
          className="mx-2 px-4 py-2 bg-gray-400 rounded-md text-lg font-semibold hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
        >
          Reset
        </button>
      </div>
    </>
  );
}

export default App;
