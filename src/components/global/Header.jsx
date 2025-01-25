import { BellIcon, UserIcon } from "lucide-react";

const Header = ({ title }) => {
	return (
		<header className='flex justify- bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg border-b border-gray-700'>
			<div className='max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8'>
				<h1 className='text-2xl font-semibold text-gray-100'>{title}</h1>
			</div>
			<div className="flex justify-end items-center ">
				{/* ICONS */}
				<div className="flex space-x-4">
					{/* Notifications */}
					<button className="p-2 rounded-full hover:bg-gray-700 transition">
					<BellIcon className="h-6 w-6 text-gray-300" />
					</button>

					{/* User Profile */}
					<button className="p-2 rounded-full hover:bg-gray-700 transition">
					<UserIcon className="h-6 w-6 text-gray-300" />
					</button>
				</div>
	  		</div>
		</header>
	);
};
export default Header;
