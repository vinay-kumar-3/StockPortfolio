import { BellIcon, UserIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Header = () => {
	const navigate = useNavigate();
	return (
		<header className='flex justify-between bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg border-b border-gray-700'>
			<div className='max-w-7xl py-4 px-4 sm:px-6 lg:px-8'>
				<img src="https://capx.live/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.839a2952.png&w=256&q=75" width="100px" alt="Capx logo" />
			</div>
			<div className="flex justify-end items-center mx-5">
				{/* ICONS */}
				<div className="flex space-x-4">
					{/* Notifications */}
					<button className="p-2 rounded-full hover:bg-gray-700 transition">
					<BellIcon className="h-6 w-6 text-gray-300" />
					</button>

					{/* User Profile */}
					<button className="p-2 rounded-full hover:bg-gray-700 transition">
					<UserIcon className="h-6 w-6 text-gray-300" 
					 onClick={() => navigate("/settings")}/>
					</button>
				</div>
	  		</div>
		</header>
	);
};
export default Header;
