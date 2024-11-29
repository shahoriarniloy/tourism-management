"use client";  // Add this line at the top

import { useSession } from 'next-auth/react';
import React from 'react';
import Swal from 'sweetalert2';

const AddResortRoom = () => {
    const { data: session } = useSession();
    const user = session?.user;

    const handleAddResortRoom = (e) => {
        e.preventDefault();
        const form = e.target;

        const roomID = form.roomID.value;
        const roomName = form.roomName.value;
        const roomNo = form.roomNo.value;
        const roomType = form.roomType.value;
        const pricePerNight = form.pricePerNight.value;
        const capacity = form.capacity.value;
        const photoURL1 = form.photo1.value;
        const photoURL2 = form.photo2.value;
        const description = form.description.value;
        const email = user ? user?.email : '';

        const newRoom = {
            roomID, roomName, roomNo, roomType, pricePerNight, photoURL1, photoURL2, capacity, email, description
        }

        console.log(newRoom);

        fetch(`http://localhost:3000/dashboard/addResortRoom/api`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newRoom)
        })
            .then(res => res.json())
            .then(data => {
                const { insertedId } = data.result;
                if (insertedId) {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Resort Room added successfully",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
                e.target.reset();
            });
    };

    return (
        <div>
            <div className="font-[sans-serif]">
                <div className="bg-gradient-to-r from-blue-700 to-blue-300 w-full h-36"></div>
                <div className="-mt-20 mb-6 px-4">
                    <div className="mx-auto max-w-6xl shadow-lg p-8 relative bg-white rounded-lg">
                        <h2 className="text-xl text-gray-800 font-bold">Add Resort Room</h2>

                        <form
                            onSubmit={handleAddResortRoom}
                            className="grid grid-cols-1 md:grid-cols-2 gap-6 mx-auto"
                        >
                            {/* First column - Room Details */}
                            <div>
                                {/* Room ID and Room Name as side-by-side boxes */}
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text text-base text-black font-semibold">
                                                Room ID
                                            </span>
                                        </label>
                                        <input
                                            type="text"
                                            name="roomID"
                                            placeholder="Enter Your Room ID"
                                            className="input input-bordered w-full"
                                            required
                                        />
                                    </div>

                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text text-base text-black font-semibold">
                                                Room Name
                                            </span>
                                        </label>
                                        <select
                                            name="roomName"
                                            className="select select-bordered text-base w-full"
                                        >
                                            <option>Select Room Name</option>
                                            <option>Deluxe Suite</option>
                                            <option>Family Room</option>
                                        </select>
                                    </div>
                                </div>

                                {/* Room Type and Room No as side-by-side boxes */}
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text text-base text-black font-semibold">
                                                Room Type
                                            </span>
                                        </label>
                                        <select
                                            name="roomType"
                                            className="select select-bordered text-base w-full"
                                        >
                                            <option>Select Room Type</option>
                                            <option>Single</option>
                                            <option>Double</option>
                                            <option>Suite</option>
                                            <option>Villa</option>
                                        </select>
                                    </div>

                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text text-base text-black font-semibold">
                                                Room No
                                            </span>
                                        </label>
                                        <input
                                            type="text"
                                            name="roomNo"
                                            placeholder="Enter Room No"
                                            className="input input-bordered w-full"
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Price Per Night and Capacity as side-by-side boxes */}
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text text-base text-black font-semibold">
                                                Price Per Night
                                            </span>
                                        </label>
                                        <input
                                            type="number"
                                            name="pricePerNight"
                                            placeholder="Enter Price Per Night"
                                            className="input input-bordered w-full"
                                            required
                                        />
                                    </div>

                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text text-base text-black font-semibold">
                                                Capacity
                                            </span>
                                        </label>
                                        <input
                                            type="number"
                                            name="capacity"
                                            placeholder="Capacity"
                                            className="input input-bordered w-full"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Second column - Photos and User Info */}
                            <div>
                                {/* Photo URL 1 and Photo URL 2 as side-by-side boxes */}
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text text-base text-black font-semibold">
                                                Photo URL 1
                                            </span>
                                        </label>
                                        <input
                                            type="url"
                                            name="photo1"
                                            placeholder="Enter Room Photo URL"
                                            className="input input-bordered w-full"
                                            required
                                        />
                                    </div>

                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text text-base text-black font-semibold">
                                                Photo URL 2
                                            </span>
                                        </label>
                                        <input
                                            type="url"
                                            name="photo2"
                                            placeholder="Enter Room Spot Photo URL"
                                            className="input input-bordered w-full"
                                            required
                                        />
                                    </div>
                                </div>

                                {/* User Email input */}
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text text-base text-black font-semibold">
                                            User Email
                                        </span>
                                    </label>
                                    <input
                                        value={user ? user?.email : ''}
                                        readOnly
                                        type="email"
                                        name="email"
                                        placeholder=""
                                        className="input input-bordered w-full"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Description and Submit Button */}
                            <div className="md:col-span-2 space-y-6">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text text-base text-black font-semibold">
                                            Short Description
                                        </span>
                                    </label>
                                    <textarea
                                        placeholder="Short Description"
                                        name="description"
                                        className="textarea textarea-bordered w-full"
                                    ></textarea>
                                </div>
                                <input
                                    type="submit"
                                    value="Add Resort Room"
                                    className="btn w-full bg-sky-500 text-base text-white border-0 rounded-md"
                                />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddResortRoom;
