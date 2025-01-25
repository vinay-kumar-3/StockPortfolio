import { motion } from "framer-motion";
import { DollarSign, Coins, ArrowBigUp, ArrowBigDown, ArrowDownRight, ArrowUpRight } from "lucide-react";

const overviewData = [
	{ name: "Revenue", value: "$1,234,567", change: 12.5, icon: DollarSign , color:'#6366F1'},
	{ name: "Investment", value: "45,678", change: 8.3, icon: Coins ,  color:'#F59E0B'},
	{ name: "Profits", value: "9,876", change: -3.2, icon: ArrowBigUp , color:'#10B981'},
	{ name: "Loss", value: "1,234,567", change: 15.7, icon: ArrowBigDown ,color:'#EF4444' },
];

const OverviewCards = () => {
	return (
		<div className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8'
			 whileHover={{ y: -5, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)" }}
		>
			{overviewData.map((item, index) => (
				<motion.div
					key={item.name}
					className='bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-lg shadow-lg
            rounded-xl p-6 border border-gray-700
          '
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: index * 0.1 }}
					whileHover={{ y: -5, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)" }}
				>
					<div className='flex items-center justify-between'>
						<div>
							<h3 className='text-sm font-medium text-gray-400'>{item.name}</h3>
							<p className='mt-1 text-xl font-semibold text-gray-100'>{item.value}</p>
						</div>

						<div
							className={`p-3 rounded-full bg-opacity-20 ${
								item.color === "#10B981"
								  ? "bg-green-500"
								  : item.color === "#EF4444"
								  ? "bg-red-500"
								  : "bg-inherit"
							  }`}
							  

						>
							<item.icon className='size-6' color={item.color} />
						</div>
					</div>
					<div
						className={`
              mt-4 flex items-center ${item.change >= 0 ? "text-green-500" : "text-red-500"}
            `}
					>
						{item.change >= 0 ? <ArrowUpRight size='20' /> : <ArrowDownRight size='20' />}
						<span className='ml-1 text-sm font-medium'>{Math.abs(item.change)}%</span>
						<span className='ml-2 text-sm text-gray-400'>vs last period</span>
					</div>
				</motion.div>
			))}
		</div>
	);
};
export default OverviewCards;
