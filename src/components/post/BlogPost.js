import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";
import {toast, ToastContainer} from "react-toastify";
import Header from "../Header/Header";

const BlogPost = () => {
    const { id } = useParams()
    const [post, setPost] = useState({});
    const [formData, setFormData] = useState({
        content: '',
        post_id: {id}
    });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate()
    const [isOwnPost, setIsOwnPost] = useState(true);


    const dropDownMenu = () => {
        setIsOpen(!isOpen);
    }

    useEffect(() => {
        fetchPosts();
    }, [{id}]);

    const fetchPosts = async () => {
        const token = localStorage.getItem('token');
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        };
        try {
            const response = await axios.get(`http://localhost:8080/api/posts/${id}`, config);
            setPost(response.data);
        } catch (error) {
            console.log(error);
        }
    };
    const checkOwnser = () => {
        if(post.isOwner){
            setIsOwnPost(true)
        }else{
            setIsOwnPost(false)
        }
    }
    useEffect(() => {
        checkOwnser()
    }, [post]);
    const formatDate = (dateString) => {
        const options = {day: '2-digit', month: '2-digit', year: 'numeric'};
        return new Date(dateString).toLocaleDateString('en-GB', options);
    };
    if(!post){
        return <div>Loading....</div>
    }
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));

    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        const token = localStorage.getItem('token');
        try {
            const response = await axios.post('http://localhost:8080/api/comments',{
                    content: formData.content,
                    post_id : id
                 },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
            console.log("Comment has been posted")
            setFormData({
                content: '',
                post_id: id,
            })
        }
        catch (error) {
            console.log(error)
            console.log(formData.post_id)
            console.log(formData.content)
            console.log({
                content: formData.content,
                post_id : formData.post_id
            })
        }
    };
    const deletePost = async () => {
        const token = localStorage.getItem('token');
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        };
        try {
            const response = await axios.delete(`http://localhost:8080/api/posts/${id}`, config);
            toast.success('Post deleted successfully');
            setTimeout(() =>{
                navigate("/users/mypost")
            },1500)

        } catch (error) {
            console.log(error);
        }
    }
    // const showChoice = () =>{
    //     if(post.username = )
    //     setIsOwnPost(true)
    // }
    return (
        <div className="max-w-4xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
            <ToastContainer />
            {isOwnPost && (
            <button onClick={dropDownMenu} id="dropdownMenuIconHorizontalButton"
                    data-dropdown-toggle="dropdownDotsHorizontal"
                    className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-600 ml-203"
                    type="button">
                <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                     fill="currentColor" viewBox="0 0 16 3">
                    <path
                        d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z"/>
                </svg>
            </button>
            )}
            <div
                id="dropdownDotsHorizontal"
                className={`z-10 ${isOpen ? "" : "hidden"} z-40 absolute  bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600 ml-171.5` }>
                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200"
                    aria-labelledby="dropdownMenuIconHorizontalButton">
                    <li>
                        <div
                           className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Edit post</div>
                    </li>
                    <li>
                        <div onClick={() => setIsModalOpen(true)}
                           className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Delete post</div>
                    </li>

                </ul>
                {isModalOpen && (
                    <div id="popup-modal" tabindex="-1" className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50">
                        <div className="relative p-4 w-full max-w-md max-h-full">
                            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                                <button type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" onClick={() => setIsModalOpen(false)}>
                                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                    </svg>
                                    <span className="sr-only">Close modal</span>
                                </button>
                                <div className="p-4 md:p-5 text-center">
                                    <svg className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                                    </svg>
                                    <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to delete this post?</h3>
                                    <button onClick={deletePost} type="button" className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center">
                                        Yes, I'm sure
                                    </button>
                                    <button onClick={() => setIsModalOpen(false)} type="button" className="py-2.5 px-5 ml-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">No, cancel</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
                {post.title}
            </h1>

            {/* Thông tin người dùng và thời gian */}
            <div className="flex items-center mb-4">
                <img
                    src={post.userAvatar}
                    alt="Avatar"
                    className="w-10 h-10 rounded-full mr-3"
                />
                <div>
                    <p className="font-semibold text-gray-700 dark:text-gray-300">{post.username}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400"> {formatDate(post.time)}</p>
                </div>
            </div>

            {/* Hình ảnh chính */}
            <img
                src={post.image}
                alt="Blog cover"
                className="w-full h-64 object-cover rounded-lg mb-6"
            />

            {/* Nội dung */}
            <div className="prose dark:prose-invert max-w-none mb-8">
                <p>
                    {post.content}
                </p>
            </div>


            {/* Phần bình luận */}
            <div>
                <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Comments</h2>
                {post.commentsDTO?.map((comment) =>
                    <div key={comment.id} className="space-y-4 mt-3">

                        <div className="flex space-x-4">
                            <img
                                src={comment.userAvatar}
                                alt="Commenter avatar"
                                className="w-10 h-10 rounded-full"
                            />
                            <div>
                                <p className="font-semibold text-gray-700 dark:text-gray-300">{comment.username}</p>
                                <p className="text-gray-600 dark:text-gray-400">
                                    {comment.content}
                                </p>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{formatDate(comment.time)}</p>
                            </div>
                        </div>

                        {/* Thêm các bình luận khác ở đây */}
                        <div className="my-4 border-b border-gray-200 dark:border-gray-700"></div>
                    </div>
                )}
            </div>
            <form onSubmit={handleSubmit} className=" w-full bg-white rounded-lg border p-2 mx-auto mt-20">
                <div className="px-3 mb-2 mt-2">
                    <textarea name="content" placeholder="comment" onChange={handleChange} value={formData.content}
                              className="w-full bg-gray-100 rounded border border-gray-400 leading-normal resize-none h-20 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white"></textarea>
                </div>
                <div className="w-full flex justify-end px-4">
                    <input type="submit" className=" px-2.5 py-1.5 rounded-md text-white text-sm bg-indigo-500"
                           value="Comment"/>
                </div>
            </form>
        </div>
    );
};

export default BlogPost;