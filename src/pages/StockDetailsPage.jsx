import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Header from "../components/global/Header";
import FlowChart from "../components/details/FlowChart";
import { fetchStockDetails, fetchQuote } from "../components/utils/api/stock-api";

const StockDetailsPage = () => {

  const { stockSymbol } = useParams();

  const [stockDetails, setStockDetails] = useState({});

  const [quote, setQuote] = useState({});

  useEffect(() => {
    const updateStockDetails = async () => {
      try {
        const result = await fetchStockDetails(stockSymbol);
        setStockDetails(result);
      } catch (error) {
        setStockDetails({});
        console.log(error);
      }
    };

    const updateStockOverview = async () => {
      try {
        const result = await fetchQuote(stockSymbol);
        setQuote(result); 
      } catch (error) {
        setQuote({});
        console.log(error);
      }
    };

    updateStockDetails();
    updateStockOverview();
  }, [stockSymbol]);

  return (
    <div className='flex-1 overflow-auto relative z-10'>
			<Header />
      <main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
        <FlowChart data ={stockDetails} quote={quote}/>
      </main>
    
    </div>
  );
};

export default StockDetailsPage;