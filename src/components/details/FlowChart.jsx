import { useState,useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

import ChartFilter from "./ChartFilter";
import { fetchHistoricalData } from "../utils/api/stock-api";
import {
	createDate,
	convertUnixTimestampToDate,
  } from "../utils/helpers/date-helper";
  import { chartConfig } from "../constants/config";
  

const FlowChart = ({data,quote}) => {
	const [filter, setFilter] = useState("1W");
    const { stockSymbol } = useParams();
    
    const [historicalData, setHistoricalData] = useState([]);
    
    const formatData = (data) => {
		return data.results.map((item) => {
		  return {
			value: item.c.toFixed(2),  // Format closing price to 2 decimal places
			date: convertUnixTimestampToDate(item.t), // Convert timestamp to date
		  };
		});
	};
      
      
    
    useEffect(() => {
		const getDateRange = () => {
		  const { days, weeks, months, years } = chartConfig[filter];
	
		  const endDate = new Date();
		  const startDate = createDate(endDate, -days, -weeks, -months, -years);

		  const formattedEndDate = convertUnixTimestampToDate(endDate);
		  const formattedStartDate = convertUnixTimestampToDate(startDate);

		  return { formattedStartDate, formattedEndDate };
		};
	
		const updateChartData = async () => {
		  try {
			const { formattedStartDate, formattedEndDate } = getDateRange();
			const resolution = chartConfig[filter].resolution;
			const result = await fetchHistoricalData(
			  stockSymbol,
			  resolution,
			  formattedStartDate,
			  formattedEndDate
			);
			setHistoricalData(formatData(result));
		  } catch (error) {
			setHistoricalData([]);
			console.log(error);
		  }
		};
	
		updateChartData();
	  }, [stockSymbol, filter]);


	return (
		<motion.div
			className='bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-lg shadow-lg rounded-xl p-6 border border-gray-700 mb-8'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.2 }}
		>
			<div className='flex justify-between items-center mb-6 gap-1'>
				<div className="flex gap-2">
					<img
						src={data.logo}
						alt="Product img"
						className="size-8 rounded-full"
						/>
					<h2 className='text-xl font-semibold text-gray-100'>{data.name}</h2>
				</div>
				
				<ul className="flex absolute top-2 right-2 z-40">
					{Object.keys(chartConfig).map((item) => (
					<li key={item}>
						<ChartFilter
						text={item}
						active={filter === item}
						onClick={() => {
							setFilter(item);
						}}
						/>
					</li>
					))}
				</ul>
			</div>

			<div className="flex flex-col gap-2 ml-6 mb-6">
				<span className="text-2xl xl:text-4xl 2xl:text-5xl flex items-center">
					{quote.pc}
					<span className="text-xs xl:text-sm 2xl:text-base text-neutral-400 m-2 mb-0">
						{data.currency}
					</span>
				</span>
				<span
						className={`text-lg xl:text-xl 2xl:text-2xl ${
							quote.d > 0 ? "text-green-500" : "text-red-500"
						}`}
						>
						{quote.d > 0 ?"+":"-"} {quote.d} <span>({quote.dp}%)</span>
				</span>
			</div>

			<div style={{ width: "100%", height: "400px" }}>
				<ResponsiveContainer>
					<AreaChart data={historicalData}>
						<CartesianGrid strokeDasharray='3 3' stroke='#374151' />
						<XAxis dataKey='date' stroke='#9CA3AF' />
						<YAxis stroke='#9CA3AF' />
						<Tooltip
							contentStyle={{ backgroundColor: "rgba(31, 41, 55, 0.8)", borderColor: "#4B5563" }}
							itemStyle={{ color: "#E5E7EB" }}
						/>
						<Legend />
						<Area type='monotone' dataKey='value' stroke='#8B5CF6' fill='#8B5CF6' fillOpacity={0.3} />
					</AreaChart>
				</ResponsiveContainer>
			</div>
		</motion.div>
	);
};
export default FlowChart;
