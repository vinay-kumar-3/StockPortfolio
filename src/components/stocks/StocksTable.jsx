import { motion } from "framer-motion";
import { Edit, Plus, Search, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchStockDetails } from "../utils/api/stock-api";
import useFetch from "../../useFetch";

const defaultStocks = [
  {
    stockSymbol: "AAPL",
    quantity: 1,
    stockExchange: "NASDAQ",
    stockName: "Apple Inc.",
    stockPrice: 172.78,
    stockLogo: "https://logo.clearbit.com/apple.com",
  },
  {
    stockSymbol: "AMZN",
    quantity: 1,
    stockExchange: "NASDAQ",
    stockName: "Amazon.com Inc.",
    stockPrice: 234.85,
    stockLogo: "https://logo.clearbit.com/amazon.com",
  },
  {
    stockSymbol: "GOOGL",
    quantity: 1,
    stockExchange: "NASDAQ",
    stockName: "Alphabet Inc",
    stockPrice: 200.21,
    stockLogo: "https://logo.clearbit.com/google.com",
  },
  {
    stockSymbol: "NFLX",
    quantity: 1,
    stockExchange: "NASDAQ",
    stockName: "Netflix Inc.",
    stockPrice: 977.59,
    stockLogo: "https://logo.clearbit.com/netflix.com",
  },
  {
    stockSymbol: "TSLA",
    quantity: 1,
    stockExchange: "NASDAQ",
    stockName: "Tesla Inc",
    stockPrice: 406.58,
    stockLogo: "https://logo.clearbit.com/tesla.com",
  },
];

const StocksTable = () => {
  const { data, isPending, error} = useFetch("https://userstocksportfolio.up.railway.app/userstocks");
  const [searchTerm, setSearchTerm] = useState("");
  let stockData = data;
  const [filteredProducts, setFilteredProducts] = useState([]);

  // In the case of backend subscription expires
  if (error){
    stockData = defaultStocks;
  }

  const navigate = useNavigate(); // Correctly initialize the useNavigate hook

  useEffect(() => {
    if (stockData) {
      const fetchStockLogos = async () => {
        const updatedProducts = await Promise.all(
          stockData.map(async (stock) => {
            try {
              const result = await fetchStockDetails(stock.stockSymbol);
              console.log(result.logo)
              return { ...stock, stockLogo: result.logo }; // Use the logo from the API response
            } catch (error) {
              console.error('Error fetching logo for:', stock.stockSymbol, error);
              return { ...stock, stockLogo: '' }; // Fallback if the API call fails
            }
          })
        );
        setFilteredProducts(updatedProducts);
      };

      fetchStockLogos();
    }
  }, [stockData]);
  

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = stockData.filter(
      (product) =>
        product.stockName.toLowerCase().includes(term) ||
        product.stockSymbol.toLowerCase().includes(term)
    );
    setFilteredProducts(filtered);
  };

  const handleForm = () => {
    navigate("/addform"); // Navigate to the form page for adding new stock
  };  

  const handleDelete = async (stockSymbol) => {
    try {
      const response = await fetch(
        `http://localhost:8080/userstocks/${stockSymbol}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        setFilteredProducts((filtered) =>
          filtered.filter((product) => product.stockSymbol !== stockSymbol)
        );
        setStockData((data) =>
          data.filter((product) => product.stockSymbol !== stockSymbol)
        );
      } else {
        console.error("Failed to delete stock:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting stock:", error);
    }
  };

  const handleUpdate = (stockSymbol) => {
    navigate(`/addform/${stockSymbol}`);
  };
  

  return (
    <motion.div
      className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-100">Stocks List</h2>
        <div className="relative flex gap-3">
          <input
            type="text"
            placeholder="Search products..."
            className="bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleSearch}
            value={searchTerm}
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          <button
            onClick={handleForm}
            className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-500 transition"
          >
            <Plus size={18} />
            Add
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Symbol
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Quantity
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Exchange
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-700">

            { (!filteredProducts && error) && <tr>
                <td
                  colSpan="6"
                  className="px-6 py-4 text-center text-sm text-gray-400"
                >
                  {error}
                </td>
              </tr> }
            { filteredProducts && filteredProducts.map((product) => (
                <motion.tr
                  key={product.stockSymbol}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  onClick={ () => navigate(`/stockdetails/${product.stockSymbol}`) }
                  className="cursor-pointer"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100 flex gap-2 items-center">
                    <img
                      src={product.stockLogo}
                      alt="Product img"
                      className="size-10 rounded-full"
                    />
                    {product.stockName}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {product.stockSymbol}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    ${product.stockPrice.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {product.quantity}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {product.stockExchange}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    <button
                      onClick={() => handleUpdate(product.stockSymbol)}
                      className="text-indigo-400 hover:text-indigo-300 mr-2"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(product.stockSymbol)}
                      className="text-red-400 hover:text-red-300"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </motion.tr>
              ))}
            { isPending && <tr>
                <td
                  colSpan="6"
                  className="px-6 py-4 text-center text-sm text-gray-400"
                >
                  Loading ...
                </td>
              </tr> }
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default StocksTable;