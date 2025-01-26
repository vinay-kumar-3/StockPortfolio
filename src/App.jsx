import { Route, Routes } from "react-router-dom";


import Sidebar from "./components/global/Sidebar";

import OverviewPage from "./pages/OverviewPage";
import MyStocksPage from "./pages/MyStocksPage";
import FormPage from "./pages/FormPage";
import UpdateFormPage from "./pages/UpdateFormPage";
import SettingsPage from "./pages/SettingsPage";

function App() {
	return (
		<div className='flex h-screen bg-gray-900 text-gray-100 overflow-hidden'>
			{/* BG */}
			<div className='fixed inset-0 z-0'>
				<div className='absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-80' />
				<div className='absolute inset-0 backdrop-blur-sm' />
			</div>

			<Sidebar />
			<Routes>
				<Route path='/' element={<OverviewPage />} />
				<Route path="/mystocks" element={<MyStocksPage />} />
				<Route path="/addform" element={<FormPage />} />
				<Route path="/addform/:stockSymbol" element={<UpdateFormPage />} />
				<Route path="/settings" element={<SettingsPage />} />
			</Routes>
		</div>
	);
}

export default App;
