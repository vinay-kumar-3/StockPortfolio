import ProductsTable from "../components/stocks/ProductsTable";
import Header from "../components/global/Header";

const MyStocksPage = () => {

	return (
		<div className='flex-1 overflow-auto relative z-10'>
			<Header title='Products' />

			<main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
				
				<ProductsTable />	
			</main>
		</div>
	);
};
export default MyStocksPage;