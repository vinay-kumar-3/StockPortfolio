import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function UpdateForm() {
  const navigate = useNavigate();
  const { stockSymbol } = useParams(); // Capture the stockSymbol from the URL

  const [stockData, setStockData] = useState(null); // Initialize as null
  const [isLoading, setIsLoading] = useState(true); // Track loading state

  // Fetch stock data to pre-fill the form
  useEffect(() => {
    const fetchStockData = async () => {
      setIsLoading(true); // Start loading
      try {
        const response = await fetch(
          `https://userstocksportfolio.up.railway.app/userstocks/${stockSymbol}`
        );
        if (!response.ok) {
          throw new Error("Stock not found");
        }
        const data = await response.json();
        setStockData(data);
      } catch (error) {
        console.error(error);
        setStockData(null); // Handle error by setting to null
      } finally {
        setIsLoading(false); // End loading
      }
    };

    fetchStockData();
  }, [stockSymbol]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch(
        "https://userstocksportfolio.up.railway.app/userstocks",
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        navigate("/mystocks");
      } else {
        console.error("Failed to update stock");
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (isLoading) {
    return (
      <motion.div
        className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 mb-8 flex justify-center items-center h-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
      >
        <span className="text-gray-300">Loading...</span>
      </motion.div>
    );
  }

  if (!stockData) {
    return (
      <motion.div
        className="flex justify-center items-center h-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
      >
        <span className="text-red-500">Failed to load stock data.</span>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <form onSubmit={handleSubmit}>
      <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base/7 font-semibold">Stock Details</h2>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              

              <div className="sm:col-span-3">
                <label htmlFor="stock-name" className="block text-sm/6 font-medium">
                  Stock Name
                </label>
                <div className="mt-2">
                  <input
                    id="stock-name"
                    name="stockName"
                    type="text"
                    autoComplete="given-name"
                    value={stockData.stockName || ''}
                    onChange={(e) => setStockData({ ...stockData, stockName: e.target.value })}
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-black outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="stock-symbol" className="block text-sm/6 font-medium">
                  Ticker
                </label>
                <div className="mt-2">
                  <input
                    id="stock-symbol"
                    name="stockSymbol"
                    type="text"
                    autoComplete="ticker"
                    value={stockData.stockSymbol || ''}
                    onChange={(e) => setStockData({ ...stockData, stockSymbol: e.target.value })}
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-black outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="stock_exchange" className="block text-sm/6 font-medium">
                  Stock Exchange
                </label>
                <div className="mt-2">
                  <input
                    id="stock_exchange"
                    name="stockExchange"
                    type="text"
                    value={stockData.stockExchange || ''}
                    onChange={(e) => setStockData({ ...stockData, stockExchange: e.target.value })}
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-black outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="quantity" className="block text-sm/6 font-medium">
                  Quantity
                </label>
                <div className="mt-2">
                  <input
                    id="quantity"
                    name="quantity"
                    type="number"
                    value={stockData.quantity || ''}
                    onChange={(e) => setStockData({ ...stockData, quantity: e.target.value })}
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-black outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="stock_price" className="block text-sm/6 font-medium">
                  Price
                </label>
                <div className="mt-2">
                  <input
                    id="stock_price"
                    name="stockPrice"
                    type="number"
                    value={stockData.stockPrice || ''}
                    onChange={(e) => setStockData({ ...stockData, stockPrice: e.target.value })}
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-black outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="button"
            onClick={() => navigate("/mystocks")}
            className="text-sm/6 font-semibold"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Update
          </button>
        </div>
      </form>
    </motion.div>
  );
}
