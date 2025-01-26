import Header from "../components/global/Header";
import OverviewCards from "../components/overview/OverviewCards";
import PortfolioDistributionChart from "../components/overview/PortfolioDistributionChart";
import RevenueChart from "../components/overview/RevenueChart";



const OverviewPage = () => {
	return (
		<div className='flex-1 overflow-auto relative z-10'>
			<Header />
			<main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
				
				<OverviewCards />

				{/* CHARTS */}
				<RevenueChart />
				<PortfolioDistributionChart />
			</main>
		</div>
	);
};
export default OverviewPage;
