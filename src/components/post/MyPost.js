import React, { useEffect, useState } from "react";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";


function Post() {
    let [largestPosition, setLargestPosition] = useState(150);
    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [hasMore, setHasMore] = useState(false);
    const pageSize = 5;
    let [searchTerm, setSearchTerm] = useState('h');
    const [currentPageSearch, setCurrentPageSearch] = useState(0);
    const searchPageSize  = 5;

    const loadPosts = async (page, size) => {
        const token = localStorage.getItem('token');
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        };
        try {
            const response = await axios.get(`http://localhost:8080/api/posts/users?page=${page}&size=${size}`, config);
            const data = response.data;
            setPosts(prev => [...prev, ...data]);
            setHasMore(data.length === size);
        } catch (error) {
            console.error("Error loading posts:", error);
        }
    };
    useEffect(() => {
        handleScroll();
    }, [currentPage]);
    const handleScroll =  () => {
        window.addEventListener('scroll', function() {
            var scrollPosition = window.pageYOffset;
            if (scrollPosition >= largestPosition) {
                console.log(scrollPosition)
                setTimeout(()=>{
                    setCurrentPage(prevPage => prevPage + 1)
                },1000)
                largestPosition += 200;
                setLargestPosition(largestPosition);

            }
        });
    };
    const formatDate = (dateString) => {
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-GB', options);
    };
    const handleSearch = async (event) => {
        if (event) event.preventDefault();

        const token = localStorage.getItem('token');
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        };

        try {
            const response = await axios.get(`http://localhost:8080/api/posts/users/search/?input=${searchTerm}`,config);
            setPosts(response.data)
            setHasMore(response.data.length === searchPageSize)
        } catch (error) {
            console.log('Error fetching search results:', error);
        }
    };
    useEffect(() => {
        loadPosts(currentPage, pageSize);
    }, [currentPage]);

    useEffect(() => {
        if (searchTerm == '') {
            setPosts([])
            setCurrentPage(0)
            loadPosts(0,5)
            return
        }
        handleSearch();
        return;
    }, [searchTerm]);

    return (
        <div className="space-y-6">
            <form className="max-w-xl  ml-180" onSubmit={handleSearch}>
                <div className="relative">
                    <button type="submit" className="absolute left-0 top-1/2 -translate-y-1/2">
                        <svg
                            className="fill-body hover:fill-primary dark:fill-bodydark dark:hover:fill-primary"
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M9.16666 3.33332C5.945 3.33332 3.33332 5.945 3.33332 9.16666C3.33332 12.3883 5.945 15 9.16666 15C12.3883 15 15 12.3883 15 9.16666C15 5.945 12.3883 3.33332 9.16666 3.33332ZM1.66666 9.16666C1.66666 5.02452 5.02452 1.66666 9.16666 1.66666C13.3088 1.66666 16.6667 5.02452 16.6667 9.16666C16.6667 13.3088 13.3088 16.6667 9.16666 16.6667C5.02452 16.6667 1.66666 13.3088 1.66666 9.16666Z"
                                fill=""
                            />
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M13.2857 13.2857C13.6112 12.9603 14.1388 12.9603 14.4642 13.2857L18.0892 16.9107C18.4147 17.2362 18.4147 17.7638 18.0892 18.0892C17.7638 18.4147 17.2362 18.4147 16.9107 18.0892L13.2857 14.4642C12.9603 14.1388 12.9603 13.6112 13.2857 13.2857Z"
                                fill=""
                            />
                        </svg>
                    </button>
                    <input
                        style={{border: 0}}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        type="text"
                        placeholder="Type to search..."
                        className="w-full bg-transparent pl-9 pr-4 text-black focus:outline-none dark:text-white xl:w-125"
                    />
                </div>
            </form>
            {posts.map((post) => (
                <Link key={post.id} to={`/posts/${post.id}`}
                      className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 extended-width relative">

                    <img
                        className="object-cover w-9 rounded-t-lg max-h-30 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
                        src={post.image}
                        alt=""
                    />
                    <div className="flex flex-col justify-between p-4 leading-normal">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                            {post.title}
                        </h5>
                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                            {post.description}
                        </p>
                        <div className="flex items-center">
                            <img
                                className=" object-cover w-8 h-8 rounded-full"
                                src={post.userAvatar}
                                alt=""
                            />
                            <span className="ml-3 text-md text-gray-600 dark:text-gray-400">{post.username}</span>
                        </div>
                    </div>
                    <span
                        className="absolute bottom-2 right-13 text-sm text-gray-500 dark:text-gray-400">{formatDate(post.time)}</span>
                    <svg
                        className="absolute w-6 h-5 bottom-2 right-6 text-gray-700 dark:text-gray-300"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M3,6v9c0,1.105,0.895,2,2,2h9v5l5.325-3.804C20.376,17.446,21,16.233,21,14.942V6c0-1.105-0.895-2-2-2H5C3.895,4,3,4.895,3,6z"
                        />
                    </svg>
                    <span className="absolute w-6 h-5 bottom-2 right-1 text-s text-gray-700 dark:text-gray-300">
                        {post.commentsDTO.length}
                    </span>
                </Link>
            ))}
            {hasMore && (
                <button
                    id="load-more" onClick={() => setCurrentPage(prevPage => prevPage + 1)}>Load More</button>
            )}
        </div>
    );
}

export default Post;
