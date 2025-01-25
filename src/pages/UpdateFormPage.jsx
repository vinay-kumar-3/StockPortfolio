import UpdateForm from "../components/stocks/UpdateForm";
import Header from "../components/global/Header";

const UpdateFormPage = () => {

	return (
		<div className='flex-1 overflow-auto relative z-10'>
			<Header title="h"/>

			<main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
				<UpdateForm />
			</main>
		</div>
	);
};
export default UpdateFormPage;