import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import axios from "axios";
import { CKEditor } from "@ckeditor/ckeditor5-react";
// import Editor from "../../../../blog-frontend/ckeditor5";
import Editor from 'ckeditor5-custom-build/build/ckeditor';
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "./Firebase"; // Adjust the path to your Firebase configuration
import { useParams, useNavigate } from "react-router-dom";
import { v4 } from "uuid";


const PostEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [content, setContent] = useState("");

        useEffect(() => {
            function hideError(e) {
                if (e.message === 'ResizeObserver loop completed with undelivered notifications.') {
                    const resizeObserverErrDiv = document.getElementById(
                        'webpack-dev-server-client-overlay-div'
                    );
                    const resizeObserverErr = document.getElementById(
                        'webpack-dev-server-client-overlay'
                    );
                    if (resizeObserverErr) {
                        resizeObserverErr.setAttribute('style', 'display: none');
                    }
                    if (resizeObserverErrDiv) {
                        resizeObserverErrDiv.setAttribute('style', 'display: none');
                    }
                }
            }
            window.addEventListener('error', hideError)
            return () => {
                window.addEventListener('error', hideError)
            }
        }, [])

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/posts/${id}`, {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                setPost(response.data);
                setContent(response.data.content);
            } catch (error) {
                toast.error("There was an error fetching the post");
                console.error("There was an error fetching the post!", error);
            }
        };

        fetchPost();
    }, [id]);

    const handleFileChange = async (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleSubmitEdit = async (values) => {
        let imageUrl = post.image;
        if (selectedFile) {
            const imageRef = ref(storage, `images/${selectedFile.name + v4()}`);
            const snapshot = await uploadBytes(imageRef, selectedFile);
            imageUrl = await getDownloadURL(snapshot.ref);
        }

        const postData = {
            title: values.title,
            content: content,
            description: values.description,
            mode_id: values.mode === "Publish" ? 1 : 2,
            image: imageUrl,
        };

        const token = localStorage.getItem("token");
        if (!token) {
            toast.error("You need to log in first");
            return;
        }

        axios
            .put(`http://localhost:8080/api/posts/${id}`, postData, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
            })
            .then((response) => {
                toast.success("Post updated successfully");
                navigate(`/posts/${id}`);
            })
            .catch((error) => {
                toast.error("There was an error updating the post");
                console.error("There was an error updating the post!", error);
            });
    };

    if (!post) {
        return <div>Loading...</div>;
    }

    return (
        <div className="max-h-242.5 fixed inset-0 z-9999 flex items-center justify-center bg-black bg-opacity-50">
            <div className="relative w-full max-w-4xl bg-white rounded-lg shadow dark:bg-gray-700">
                <div className="flex items-center justify-between p-4 border-b rounded-t dark:border-gray-600">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Edit Post
                    </h3>
                </div>
                <div className="overflow-y-auto max-h-screen p-4">
                    <Formik
                        initialValues={{
                            title: post.title,
                            description: post.description,
                            mode: post.mode_id === 1 ? "Publish" : "Private",
                        }}
                        validationSchema={Yup.object({
                            title: Yup.string().required("Title is required"),
                            description: Yup.string(),
                            mode: Yup.string().oneOf(["Publish", "Private"], "Invalid mode"),
                        })}
                        onSubmit={handleSubmitEdit}
                    >
                        <Form className="space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="col-span-2">
                                    <label htmlFor="title" className="block text-sm font-medium text-gray-900 dark:text-white">Title</label>
                                    <Field
                                        as="textarea"
                                        name="title"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                        autoComplete="off"
                                    />
                                    <ErrorMessage name="title" component="span" className="text-red-500 text-sm" />
                                </div>
                                <div className="col-span-2 overflow-y-auto " style={{maxHeight : 150}}>
                                    <label className="block text-sm font-medium text-gray-900 dark:text-white">Content</label>
                                    <div>
                                        <CKEditor
                                            editor={Editor}
                                            data={content}
                                            onReady={(editor) => {
                                                console.log("Editor is ready to use!", editor);
                                            }}
                                            onChange={(event, editor) => {
                                                setContent(editor.getData());
                                            }}
                                        />
                                    </div>
                                    <ErrorMessage name="content" component="span" className="text-red-500 text-sm" />
                                </div>
                                <div className="col-span-2">
                                    <label htmlFor="description" className="block text-sm font-medium text-gray-900 dark:text-white">Description</label>
                                    <Field
                                        as="textarea"
                                        name="description"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                        autoComplete="off"
                                    />
                                </div>
                                <div className="col-span-2">
                                    <label className="block text-sm font-medium text-gray-900 dark:text-white">Select Image</label>
                                    <input
                                        id="image"
                                        name="image"
                                        type="file"
                                        onChange={handleFileChange}
                                        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                                        autoComplete="off"
                                    />
                                    {selectedFile ? (
                                        <img src={URL.createObjectURL(selectedFile)} alt="Preview" className="mt-2 w-32 h-20 object-cover" />
                                    ) : (
                                        <img src={post.image} alt="Current" className="mt-2 w-32 h-20 object-cover" />
                                    )}
                                </div>
                                <div className="col-span-2">
                                    <label htmlFor="mode" className="block text-sm font-medium text-gray-900 dark:text-white">Mode</label>
                                    <Field as="select" name="mode" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white">
                                        <option value="Publish">Publish</option>
                                        <option value="Private">Private</option>
                                    </Field>
                                </div>
                            </div>
                            <div className="flex justify-end space-x-4">
                                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                    Update
                                </button>
                                <button type="button" className="text-gray-700 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-300 border border-gray-300 rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-500 dark:focus:ring-gray-700" onClick={() => navigate(`/posts/${id}`)}>
                                    Cancel
                                </button>
                            </div>
                        </Form>
                    </Formik>
                </div>
            </div>
        </div>
    );
};

export default PostEdit;
