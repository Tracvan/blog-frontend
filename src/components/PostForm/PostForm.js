


import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import axios from "axios";
import { CKEditor } from "@ckeditor/ckeditor5-react";
// import Editor from "../../../../blog-frontend/ckeditor5";
import Editor from 'ckeditor5-custom-build/build/ckeditor';
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "./Firebase"; // Adjust the path to your Firebase configuration
import { v4 } from "uuid";
import {useNavigate} from "react-router-dom";


const PostForm = ({ handleClose }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [content, setContent] = useState("");
    const navigate = useNavigate();

    const handleFileChange = async (event) => {
        setSelectedFile(event.target.files[0]);
    };
    const backToPost = () => {
        navigate("/posts")
    }
    const handleSubmitCreate = async (values) => {
        let imageUrl = "";
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
            .post("http://localhost:8080/api/posts", postData, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
            })
            .then((response) => {
                toast.success("Post created successfully");
                handleClose();
            }).then(
                navigate("/mypost")
        )
            .catch((error) => {
                toast.error("There was an error creating the post");
                console.error("There was an error creating the post!", error);
            });
    };

    return (
        <div className="fixed inset-0 z-9999 flex items-center justify-center bg-black bg-opacity-50 ">
            <div className="relative w-full max-w-screen-xl max-h-full bg-white rounded-lg shadow dark:bg-gray-700   ">
                <div className=" flex items-center justify-between p-4 border-b rounded-t dark:border-gray-600">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Create Post
                    </h3>
                    <button
                        type="button"
                        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                        onClick={backToPost}
                    >
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1l6 6m0 0l6 6M7 7l6-6M7 7l-6 6" />
                        </svg>
                        <span className="sr-only">Close modal</span>
                    </button>
                </div>
                <div className="overflow-y-auto max-h-screen p-4">
                    <Formik
                        initialValues={{
                            title: "",
                            description: "",
                            mode: "Publish",
                        }}
                        validationSchema={Yup.object({
                            title: Yup.string().required("Title is required"),
                            description: Yup.string(),
                            mode: Yup.string().oneOf(["Publish", "Private"], "Invalid mode"),
                        })}
                        onSubmit={handleSubmitCreate}
                    >
                        <Form className="space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="col-span-2">
                                    <label htmlFor="title" className="block text-sm font-medium text-gray-900 dark:text-white">Title</label>
                                    <Field
                                        as="textarea"
                                        name="title"
                                        autoComplete="off"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                    />
                                    <ErrorMessage name="title" component="span" className="text-red-500 text-sm" />
                                </div>
                                <div className="col-span-2">
                                    <label className="block text-sm font-medium text-gray-900 dark:text-white">Content</label>
                                    <div className="max-h-96 overflow-y-auto">
                                        <CKEditor
                                            editor={Editor}
                                            data="<p>Enter your content here</p>"
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
                                    {selectedFile && (
                                        <img src={URL.createObjectURL(selectedFile)} alt="Preview" className="mt-2 w-32 h-20 object-cover" />
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
                                    Submit
                                </button>
                                <button type="button" className="text-gray-700 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-300 border border-gray-300 rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-500 dark:focus:ring-gray-700" onClick={backToPost}>
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

export default PostForm;


