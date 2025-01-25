import { ArrowBigDownDash, ArrowBigUpDashIcon, Coins, DollarSign, HandCoins } from "lucide-react";
import { motion } from "framer-motion";
import Header from "../components/global/Header";
import OverviewCards from "../components/overview/OverviewCards";
import RevenueChart from "../components/overview/RevenueChart";
import CategoryDistributionChart from "../components/overview/CategoryDistributionChart";


const OverviewPage = () => {
	return (
		<div className='flex-1 overflow-auto relative z-10'>
			<Header title='Overview' />
			<main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
				{/* STATS */}
				{/* <motion.div
					className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8'
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 1 }}
				>
					<StatCard name='Earnings' icon={DollarSign} value='$12,345' color='#6366F1' />
					<StatCard name='Investment' icon={HandCoins} value='1,234' color='#F59E0B' />
					<StatCard name='Profit' icon={ArrowBigUpDashIcon} value='567' color='#10B981' />
					<StatCard name='Loss' icon={ArrowBigDownDash} value='12.5%' color='#EF4444' />
				</motion.div> */}
				<OverviewCards />

				{/* CHARTS */}
				<RevenueChart />
				<CategoryDistributionChart />
			</main>
		</div>
	);
};
export default OverviewPage;
