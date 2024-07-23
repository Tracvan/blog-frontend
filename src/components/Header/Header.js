import { Link, useNavigate } from "react-router-dom";
import LogoIcon from '../../images/logo/logo-icon.svg';
import DarkModeSwitcher from "./DarkModeSwitcher";
import DropdownNotification from "./DropdownNotification";
import DropdownMessage from "./DropdownMessage";
import DropdownUser from "./DropdownUser";
import { useState, useEffect } from "react";
import axios from "axios";

const Header = (props) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const usersPerPage = 20;
    const navigate = useNavigate();
    const [role, setRole] = useState();
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() =>{
        var userRole = localStorage.getItem("authorize")
        setRole(userRole);
        console.log(role)
        if(role === "ROLE_ADMIN"){
            setIsAdmin(true);
        }
    },[])

    const handleSearch = async (event) => {
        if (event) event.preventDefault();

        const token = localStorage.getItem('token');
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        };

        try {
            const response = await axios.get(`http://localhost:8080/api/search/${searchTerm}?page=${currentPage}&size=${usersPerPage}`, config);
            setSearchResults(response.data.users);
            setTotalPages(response.data.totalPages);
        } catch (error) {
            console.log('Error fetching search results:', error);
        }
    };

    useEffect(() => {
        if (searchTerm) {
            handleSearch();
        }
    }, [currentPage, searchTerm]);


    const formatDate = (dateString) => {
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-GB', options);
    };

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <header className="sticky top-0 z-999 flex w-full bg-white drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none">
            <div className="flex flex-grow items-center justify-between px-4 py-4 shadow-2 md:px-6 2xl:px-11">
                <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
                    {/* <!-- Hamburger Toggle BTN --> */}
                    <button
                        aria-controls="sidebar"
                        onClick={(e) => {
                            e.stopPropagation();
                            props.setSidebarOpen(!props.sidebarOpen);
                        }}
                        className="z-99999 block rounded-sm border border-stroke bg-white p-1.5 shadow-sm dark:border-strokedark dark:bg-boxdark lg:hidden"
                    >
                        <span className="relative block h-5.5 w-5.5 cursor-pointer">
                            <span className="du-block absolute right-0 h-full w-full">
                                <span
                                    className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-150 duration-200 ease-in-out dark:bg-white ${
                                        !props.sidebarOpen && 'delay-400 !w-full'
                                    }`}
                                ></span>
                                <span
                                    className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-200 duration-200 ease-in-out dark:bg-white ${
                                        !props.sidebarOpen && '!w-full delay-500'
                                    }`}
                                ></span>
                            </span>
                            <span className="absolute right-0 h-full w-full rotate-45">
                                <span
                                    className={`absolute left-2.5 top-0 block h-full w-0.5 rounded-sm bg-black delay-300 duration-200 ease-in-out dark:bg-white ${
                                        !props.sidebarOpen && '!h-0 !delay-[0]'
                                    }`}
                                ></span>
                                <span
                                    className={`delay-400 absolute left-0 top-2.5 block h-0.5 w-full rounded-sm bg-black duration-200 ease-in-out dark:bg-white ${
                                        !props.sidebarOpen && '!h-0 !delay-200'
                                    }`}
                                ></span>
                            </span>
                        </span>
                    </button>
                    {/* <!-- Hamburger Toggle BTN --> */}
                    <Link className="block flex-shrink-0 lg:hidden" to="/posts">
                        <img src={LogoIcon} alt="Logo" />
                    </Link>
                </div>

                <div className="hidden sm:block">
                    {isAdmin && (
                        <div>
                        <a href={"/admin/users"} className="mr-20">User Management</a>
                        <a href={"/admin/posts"} className={"mr-20"}>Post Management</a>
                        </div>
                    )}

                    {/* Show search results dropdown */}
                    {searchTerm && searchResults.length > 0 && (
                        <div className="absolute mt-2 w-full bg-white border border-gray-200 dark:bg-gray-800 dark:border-gray-700 rounded-md shadow-lg max-h-60 overflow-y-auto z-50">
                            <table className="w-full leading-normal bg-transparent">
                                <thead>
                                <tr>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-100 uppercase tracking-wider bg-transparent">
                                        Username
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-100 uppercase tracking-wider bg-transparent">
                                        Created At
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-100 uppercase tracking-wider bg-transparent">
                                        Avatar
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-100 uppercase tracking-wider bg-transparent">
                                        Full Name
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-100 uppercase tracking-wider bg-transparent">
                                        Status
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-100 uppercase tracking-wider bg-transparent">
                                        Actions
                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                {searchResults.map((user) => (
                                    <tr key={user.username} className="bg-transparent">
                                        <td className="px-5 py-5 border-b border-gray-200 bg-transparent text-sm">
                                            <p className="text-gray-100 whitespace-no-wrap">{user.username}</p>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-transparent text-sm">
                                            <p className="text-gray-100 whitespace-no-wrap">{formatDate(user.createdAt)}</p>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-transparent text-sm">
                                            <img src={user.avatar} alt="avatar" className="h-10 w-10 rounded-full object-cover" />
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-transparent text-sm">
                                            <p className="text-gray-100 whitespace-no-wrap">{user.fullName}</p>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-transparent text-sm">
                            <span
                                className={`relative inline-block px-3 py-1 font-semibold leading-tight ${
                                    user.status === 'active' ? 'text-green-900' : 'text-red-900'
                                }`}
                            >
                                <span
                                    aria-hidden
                                    className={`absolute inset-0 ${
                                        user.status === 'active' ? 'bg-green-200' : 'bg-red-200'
                                    } opacity-50 rounded-full`}
                                ></span>
                                <span className="relative">{user.status}</span>
                            </span>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-transparent text-sm">
                                            <Link
                                                to={`/users/${user.username}`}
                                                className="text-indigo-600 hover:text-indigo-900"
                                            >
                                                Edit
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                            <div className="pagination flex justify-center gap-2 mt-2">
                                {[...Array(totalPages).keys()].map(pageNumber => (
                                    <button
                                        key={pageNumber + 1}
                                        onClick={() => paginate(pageNumber + 1)}
                                        className={`page-item ${currentPage === pageNumber + 1 ? 'active' : ''}`}
                                    >
                                        {pageNumber + 1}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                </div>

                <div className="flex items-center gap-3 2xsm:gap-7">
                    <ul className="flex items-center gap-2 2xsm:gap-4">
                        <DarkModeSwitcher />
                        <DropdownNotification />
                        <DropdownMessage />
                        <DropdownUser />
                    </ul>
                </div>
            </div>
        </header>
    );
};

export default Header;
