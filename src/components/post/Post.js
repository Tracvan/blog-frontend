import React, { useEffect, useState } from "react";
import axios from "axios";
import {Link} from "react-router-dom";

function Post() {
    let [largestPosition, setLargestPosition] = useState(150);
    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const pageSize = 5;


    const loadPosts = async (page, size) => {
        const token = localStorage.getItem('token');
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        };
        try {
            const response = await axios.get(`http://localhost:8080/api/posts/public?page=${page}&size=${size}`, config);
            const data = response.data;
            setPosts(prev => [...prev, ...data]);
            setHasMore(data.length === size);
        } catch (error) {
            console.error("Error loading posts:", error);
        }
    };


    useEffect(() => {
        handleScroll();
    }, []);
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

    useEffect(() => {
        loadPosts(currentPage, pageSize);
    }, [currentPage]);
    const formatDate = (dateString) => {
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-GB', options);
    };


    return (
        <div className="space-y-6 space-x-0 ">
            {posts.map((post) => (
                <div className="space-y-6">
                <Link key={post.id} to={`/posts/${post.id}`}
                      className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row  hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 extended-width relative ">
                    <img
                        className="object-cover w-9 max-h-30 rounded-t-lg h-50 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
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
                                className="object-cover w-8 h-8 rounded-full"
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
                </div>
            ))}
            {hasMore && (
                <button
                    id="load-more" onClick={() => setCurrentPage(prevPage => prevPage + 1)}>Load More</button>
            )}
        </div>
    );
}

export default Post;
