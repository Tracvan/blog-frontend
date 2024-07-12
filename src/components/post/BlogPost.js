import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useParams} from "react-router-dom";

const BlogPost = () => {
    const { id } = useParams()
    const [post, setPost] = useState({});
    const [formData, setFormData] = useState({
        content: '',
        post_id: {id}
    });

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
            // console.log(response.data)
        } catch (error) {
            console.log(error);
        }
    };
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

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
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