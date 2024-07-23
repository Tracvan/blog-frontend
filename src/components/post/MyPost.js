import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Post() {
    let [largestPosition, setLargestPosition] = useState(150);
    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const pageSize = 6;
    let [searchTerm, setSearchTerm] = useState('12312312321321');
    const searchPageSize  = 6;

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
    const handleLike = async (postId) =>{
        const newSize = (currentPage + 1) * 6
        const token = localStorage.getItem('token');
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        };
        try {
            const response = await axios.post(`http://localhost:8080/api/react/like?postId=${postId}&size=${newSize}`,null,config);
            const data = response.data;
            setPosts(data)
        } catch (error) {
            console.error("Error loading posts:", error);
        }
    }
    const handleUnlike = async (postId) =>{
        const newSize = (currentPage + 1) * 6
        const token = localStorage.getItem('token');
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        };
        try {
            const response = await axios.delete(`http://localhost:8080/api/react/like?postId=${postId}&size=${newSize}`,config);
            const data = response.data
            setPosts(prevState => data)
        } catch (error) {
            console.error("Error loading posts:", error);
        }
    }

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
            return
        }
        handleSearch();
        return;
    }, [searchTerm]);

    return (
        <div className="space-y-6 space-x-0">
            <form className="max-w-xl ml-180" onSubmit={handleSearch}>
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
            <div className="space-y-6 space-x-0">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {posts.map(post => (
                        <div key={post.id}
                             className="flex flex-col bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                            <img
                                className="object-cover w-full h-48 rounded-t-lg md:h-56"
                                src={post.image}
                                alt=""
                            />
                            <div className="flex flex-col justify-between p-4 leading-normal">
                                <a href={`/posts/${post.id}`} className="hover:underline">
                                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                        {post.title}
                                    </h5>
                                </a>
                                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                                    {post.description}
                                </p>
                                <div className="post-detail-main-content mb-3"
                                     dangerouslySetInnerHTML={{__html: post.content}}></div>
                                <div className="flex items-center mb-3">
                                    <img
                                        className="object-cover w-8 h-8 rounded-full"
                                        src={post.userAvatar}
                                        alt=""
                                    />
                                    <span
                                        className="ml-3 text-md text-gray-600 dark:text-gray-400">{post.username}</span>
                                    {post.isReacted ? (
                                        <div onClick={() => handleUnlike(post.id)}
                                             className="ml-3 flex items-center cursor-pointer">
                                            <svg className="h-6 w-6 text-blue-500" width="24" height="24"
                                                 viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none"
                                                 stroke-linecap="round" stroke-linejoin="round">
                                                <path stroke="none" d="M0 0h24v24H0z"/>
                                                <path
                                                    d="M7 11v8a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1v-7a1 1 0 0 1 1 -1h3a4 4 0 0 0 4 -4v-1a2 2 0 0 1 4 0v5h3a2 2 0 0 1 2 2l-1 5a2 3 0 0 1 -2 2h-7a3 3 0 0 1 -3 -3"/>
                                            </svg>
                                            <span className="ml-1">{post.reactQuantity}</span>
                                        </div>
                                    ) : (
                                        <div onClick={() => handleLike(post.id)}
                                             className="ml-3 flex items-center cursor-pointer">
                                            <svg className="h-6 w-6 text-gray-500" width="24" height="24"
                                                 viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none"
                                                 stroke-linecap="round" stroke-linejoin="round">
                                                <path stroke="none" d="M0 0h24v24H0z"/>
                                                <path
                                                    d="M7 11v8a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1v-7a1 1 0 0 1 1 -1h3a4 4 0 0 0 4 -4v-1a2 2 0 0 1 4 0v5h3a2 2 0 0 1 2 2l-1 5a2 3 0 0 1 -2 2h-7a3 3 0 0 1 -3 -3"/>
                                            </svg>
                                            <span className="ml-1">{post.reactQuantity}</span>
                                        </div>
                                    )}
                                </div>
                                <div
                                    className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                                    <span>{formatDate(post.time)}</span>
                                    <div className="flex items-center">
                                        <svg className="w-5 h-5 mr-1 text-gray-700 dark:text-gray-300"
                                             viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M3,6v9c0,1.105,0.895,2,2,2h9v5l5.325-3.804C20.376,17.446,21,16.233,21,14.942V6c0-1.105-0.895-2-2-2H5C3.895,4,3,4.895,3,6z"/>
                                        </svg>
                                        <span>{post.commentsDTO.length}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {hasMore && (
                <button className="ml-100"
                        id="load-more" onClick={() => setCurrentPage(prevPage => prevPage + 1)}>Load More</button>
            )}
        </div>
    );
}

export default Post;
