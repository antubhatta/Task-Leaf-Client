
import { FaCalendar, FaHouse, FaSheetPlastic } from "react-icons/fa6";
import { NavLink, Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import logo from '../assets/icon/logoipsum-245.svg';

const Dashboard = () => {
  return (
    <div className="flex">
      {/* sidebar of dashboard */}
      <div className="w-64 min-h-screen bg-gradient-to-r from-teal-500 to-teal-700 text-white glass shadow-xl">
        <div className="flex flex-col items-center justify-center mt-10">
          <img src={logo} alt="Logo" className="h-16 w-16 mb-2" />
          <Link to="/" className="text-lg md:text-xl lg:text-2xl font-bold">
            <p className="text-blue-700">AgileTaskHub</p>
          </Link>
        </div>
        <h2 className="text-center mb-10 text-2xl font-bold">Dashboard</h2>
        <div className="divider"></div>

        <ul className="menu menu-dropdown-show p-4">
          <li className="flex p-2">
            <NavLink to="/dashboard/userhome" className="flex items-center">
              <FaHouse className="text-2xl mr-2" />Employee Home
            </NavLink>
          </li>
          <li className="flex p-2">
            <NavLink to="/dashboard/createtask" className="flex items-center">
              <FaCalendar className="text-2xl mr-2" />Create New Task
            </NavLink>
          </li>
          <li className="flex p-2">
            <NavLink to="/dashboard/tasklist" className="flex items-center">
              <FaSheetPlastic className="text-2xl mr-2" />Task List
            </NavLink>
          </li>
          <li className="flex p-2">

                    <NavLink to='/'><FaHouse className="text-2xl" /> Home</NavLink>
                </li>
        </ul>
      </div>

      {/* dashboard content */}
      <div className="flex-1 bg-gradient-to-r from-gray-800 to-gray-900 glass p-10 text-white">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;
