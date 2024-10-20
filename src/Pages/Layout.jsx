import { useEffect, useState } from 'react';
import Icon from '../Components/Icon';
import { faChartPie, faChartLine, faTableList, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { Link, Routes, Route, useNavigate } from 'react-router-dom';
import CreateTask from './CreateTask';
import TaskList from './TaskList';
import Dashboard from './Dashboard';
import LogoImage from "../assets/Logo/Logo.png";
import { UserProvider } from '../store/userContext';
import EditTask from './EditTask';
import Avathar from '../Components/Avathar';
import OverAll from './OverAll';


const Layout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const [selectedMenu, setSelectedMenu] = useState('Dashboard');
    const navigate = useNavigate();
    const token = localStorage.getItem('TOKEN');
    const userId = localStorage.getItem('USER_ID');
    const urlPath = window.location.pathname;

    const menuItems = [
        { id: 'dashboard', name: 'Dashboard', icon: faChartPie, href: '/home/dashboard' },
        { id: 'task', name: 'Create Task', icon: faPenToSquare, href: '/home/createtask' },
        { id: 'list', name: 'Task List', icon: faTableList, href: '/home/tasklist' },
        { id: 'overall', name: 'Overall', icon: faChartLine, href: '/home/overall' },
    ];

    useEffect(() => {
        if (!token || !userId) {
            navigate('/');
        }
    }, [token,userId])

    useEffect(()=>{
        if(urlPath === '/home/dashboard'){
            setSelectedMenu("Dashboard")
        }
    },[urlPath])

    const handleMenu = (item) => {
        setSelectedMenu(item)
    }


    return (
        <>
            <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200">
                <div className="px-3 py-3 lg:px-5 lg:pl-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center justify-start rtl:justify-end">
                            <button
                                onClick={() => setSidebarOpen(!sidebarOpen)}
                                aria-controls="logo-sidebar"
                                type="button"
                                className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
                            >
                                <span className="sr-only">Open sidebar</span>
                                <svg
                                    className="w-6 h-6"
                                    aria-hidden="true"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        clipRule="evenodd"
                                        fillRule="evenodd"
                                        d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                                    />
                                </svg>
                            </button>
                            <a href="/home/dashboard" className="flex ms-2 md:me-24">
                                <img
                                    src={LogoImage}
                                    className="h-8 me-3"
                                    alt="FlowBite Logo"
                                />
                                <span className="self-center text-xl font-bold sm:text-2xl whitespace-nowrap text-black-100">Project Tracker</span>
                            </a>
                        </div>
                        <div className="flex items-center">
                            <div className="flex items-center ms-3">
                                <div>
                                    <button
                                        type="button"
                                        onClick={() => setUserMenuOpen(!userMenuOpen)}
                                        className="flex text-sm bg-gray-100 rounded-full focus:ring-4 focus:ring-gray-300"
                                        aria-expanded={userMenuOpen}
                                        data-dropdown-toggle="dropdown-user"
                                    >
                                        <Avathar/>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            <aside
                id="logo-sidebar"
                className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} bg-white border-r border-gray-200 sm:translate-x-0`}
                aria-label="Sidebar"
            >
                <div className="h-full px-3 pb-4 overflow-y-auto bg-white">
                    <ul className="space-y-2 font-medium">
                        {menuItems.map((item) => (
                            <li key={item.id} onClick={() => handleMenu(item.name)} className='hover:bg-gray-200 rounded-lg'>
                                <Link
                                    style={{
                                        backgroundColor: selectedMenu === item.name ? '#C5C6D0' : 'initial',
                                        color: selectedMenu === item.name ? 'white' : 'initial'
                                    }}

                                    to={item.href}
                                    className="flex items-center p-2 text-gray-700 rounded-lg hover:bg-gray-100 group"
                                >
                                    <Icon icon={item.icon} />
                                    <span className="ms-3">{item.name}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </aside >

            <main className="p-0 sm:ml-64 mt-16 lg:mt-14 md:mt-14">
                <UserProvider>
                    <Routes>
                        <Route index element={<Dashboard />} />
                        <Route path="dashboard" element={<Dashboard />} />
                        <Route path="tasklist" element={<TaskList />} />
                        <Route path="createtask" element={<CreateTask />} />
                        <Route path="overall" element={<OverAll />} />
                        <Route path="editTask/:id" element={<EditTask />} />
                    </Routes>
                </UserProvider>
            </main>

        </>
    );
};

export default Layout;