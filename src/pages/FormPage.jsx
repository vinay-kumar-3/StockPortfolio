import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import Header from "../components/global/Header";
import AddForm from "../components/stocks/AddForm";



const FormPage = () => {

	return (
		<div className='flex-1 overflow-auto relative z-10'>
			<Header title='AddForms' />

			<main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
				<AddForm />	
			</main>
		</div>
	);
};
export default FormPage;
