import { useState } from "react";
import { motion } from "framer-motion";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const revenueData = [
	{ month: "Jan", PortfolioValue: 4000, investment: 3800 },
	{ month: "Feb", PortfolioValue: 3000, investment: 3200 },
	{ month: "Mar", PortfolioValue: 5000, investment: 4500 },
	{ month: "Apr", PortfolioValue: 4500, investment: 4200 },
	{ month: "May", PortfolioValue: 6000, investment: 5500 },
	{ month: "Jun", PortfolioValue: 5500, investment: 5800 },
	{ month: "Jul", PortfolioValue: 7000, investment: 6500 },
];

const RevenueChart = () => {
	const [selectedTimeRange, setSelectedTimeRange] = useState("This Year");

	return (
		<motion.div
			className='bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-lg shadow-lg rounded-xl p-6 border border-gray-700 mb-8'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.2 }}
		>
			<div className='flex justify-between items-center mb-6'>
				<h2 className='text-xl font-semibold text-gray-100'>Portfolio value vs Investment</h2>
				<select
					className='bg-gray-700 text-white rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500'
					value={selectedTimeRange}
					onChange={(e) => setSelectedTimeRange(e.target.value)}
				>
					<option>This Week</option>
					<option>This Month</option>
					<option>This Quarter</option>
					<option>This Year</option>
				</select>
			</div>

			<div style={{ width: "100%", height: 400 }}>
				<ResponsiveContainer>
					<AreaChart data={revenueData}>
						<CartesianGrid strokeDasharray='3 3' stroke='#374151' />
						<XAxis dataKey='month' stroke='#9CA3AF' />
						<YAxis stroke='#9CA3AF' />
						<Tooltip
							contentStyle={{ backgroundColor: "rgba(31, 41, 55, 0.8)", borderColor: "#4B5563" }}
							itemStyle={{ color: "#E5E7EB" }}
						/>
						<Legend />
						<Area type='monotone' dataKey='PortfolioValue' stroke='#8B5CF6' fill='#8B5CF6' fillOpacity={0.3} />
						<Area type='monotone' dataKey='investment' stroke='#10B981' fill='#10B981' fillOpacity={0.3} />
					</AreaChart>
				</ResponsiveContainer>
			</div>
		</motion.div>
	);
};
export default RevenueChart;
