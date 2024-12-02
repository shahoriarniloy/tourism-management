'use client'
import { Rating } from '@smastrom/react-rating';
import Image from 'next/image';
import React, { useState } from 'react';
import '@smastrom/react-rating/style.css';
import { stringify } from 'postcss';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const FeedbackForm = () => {
    const [image, setImage] = useState('/images/manlogo.jpg')
    const [rating, setRating] = useState(0);
    const { register, handleSubmit, formState: { errors } } = useForm();

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file); 
            setImage(imageUrl); 
        }
    };
 

    const onSubmit = async data => {
        const name = data.name;
        const message = data.message;
        // console.log(name, message, rating)

        const imageFile = data.photo[0];
        const formData = new FormData();
        formData.append("image", imageFile);

        const res = await axios.post(`https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_imagebb_Api_key}`, formData)

        const userURL = res.data.data.display_url;
        // console.log(userURL)
        const feeds = { name, message, rating, userURL }

        const resfeed = await fetch(`http://localhost:3000/about/feedback`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(feeds)
        })
        console.log(resfeed)
    }


    return (
        <div>
            <button className="btn fixed right-0 top-60 rounded-full border-3 border-sky-300 p-4" onClick={() => document.getElementById('my_modal_3').showModal()}>opinion</button>

            <dialog id="my_modal_3" className="modal">
                <div className="modal-box">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost text-black absolute right-2 top-2">✕</button>
                    </form>

                    <section className="p-0 dark:bg-gray-100 dark:text-gray-900">
                        <form noValidate="" onSubmit={handleSubmit(onSubmit)} className="container flex flex-col mx-auto space-y-12">

                            <fieldset className="grid grid-cols-4 gap-6 p-0 rounded-md shadow-sm dark:bg-gray-50 text-black">
                                <div className="space-y-2 col-span-full lg:col-span-1 border-r-2  border-sky-200 pr-2">
                                    <p className="font-medium">Your opinion</p>
                                    <p className="text-xs">Please review us</p>
                                </div>

                                <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
                                    <div className="col-span-full sm:col-span-3">
                                        <label htmlFor="username" className="text-sm text-left">Username</label>
                                        <input {...register("name", { required: true })} id="username" type="text" name="name" placeholder="Your name" className="w-full rounded-md focus:ring focus:ring-opacity-75 dark:text-gray-50 focus:dark:ring-violet-600 dark:border-gray-300 border p-2" />
                                    </div>

                                    <div className="col-span-full sm:col-span-3">
                                        <label htmlFor="website" className="text-sm">Ratting</label>
                                        <Rating
                                            className=''
                                            value={rating}
                                            onChange={setRating}
                                            isRequired
                                        />
                                    </div>

                                    <div className="col-span-full">
                                        <label htmlFor="bio" className="text-sm">Your message</label>
                                        <textarea {...register("message", { required: true })} id="bio" name="message" placeholder="Type your message" className="w-full rounded-md focus:ring focus:ring-opacity-75 dark:text-gray-50 focus:dark:ring-violet-600 dark:border-gray-300 border p-2"></textarea>
                                    </div>

                                    <div className="">
                                        <label htmlFor="bio" className="text-sm">Photo</label>
                                        <div className="flex items-center space-x-2">
                                            <Image src={image} width={50} height={50} alt="user" className="w-10 h-10 dark:bg-gray-500 rounded-full" />
                                            <input {...register("photo", { required: true })} type="file" name='photo' className="px-4 py-2 border rounded-md dark:border-gray-800"
                                                onChange={handleImageChange}
                                            />
                                        </div>
                                    </div>

                                </div>
                            </fieldset>
                            <button className='btn btn-outline text-sky-400 text-xl '>submit</button>
                        </form>
                    </section>

                </div>
            </dialog>

        </div>
    );
};

export default FeedbackForm;