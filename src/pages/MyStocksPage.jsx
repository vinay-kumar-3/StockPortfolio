import Header from "../components/global/Header";
import StocksTable from "../components/stocks/StocksTable";

const MyStocksPage = () => {

	return (
		<div className='flex-1 overflow-auto relative z-10'>
			<Header />

			<main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
				
				<StocksTable />
			</main>
		</div>
	);
};
export default MyStocksPage;