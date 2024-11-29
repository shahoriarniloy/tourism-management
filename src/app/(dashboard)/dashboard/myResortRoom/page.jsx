"use client";
import { useSession } from "next-auth/react";
import React, { useEffect, useState, useCallback } from "react";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { GrUpdate } from "react-icons/gr";
import Link from "next/link";
import Image from "next/image";
import Swal from "sweetalert2";

const Page = () => {
    const session = useSession();
    const [resortRoom, setResortRoom] = useState([]);

    const loadData = useCallback(async () => {
        if (session?.data?.user?.email) {
            const resp = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/dashboard/myResortRoom/api/${session?.data?.user?.email}`
            );
            const data = await resp.json();
            setResortRoom(data?.myAddedResortRoom);
        }
    }, [session?.data?.user?.email]);

    const handleDeleteItem = async (id) => {
        // Show confirmation dialog
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                // Proceed with deletion if confirmed
                try {
                    const deleted = await fetch(
                        `${process.env.NEXT_PUBLIC_API_URL}/dashboard/myResortRoom/api/resortRoom/${id}`,
                        {
                            method: "DELETE",
                        }
                    );
    
                    if (!deleted.ok) {
                        throw new Error('Failed to delete the resort room');
                    }
    
                    const resp = await deleted.json();
    
                    // If deletion is successful, reload the data and show success message
                    if (resp?.response?.deletedCount > 0) {
                        loadData();  // Reload the list of resort rooms
    
                        // Show success confirmation
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your resort room has been deleted.",
                            icon: "success"
                        });
                    } else {
                        // Show warning if no room was deleted
                        Swal.fire({
                            title: "No Room Found",
                            text: "The resort room could not be found or deleted.",
                            icon: "warning"
                        });
                    }
                } catch (error) {
                    console.error(error);
                    // Show error if something goes wrong
                    Swal.fire({
                        title: "Error",
                        text: "Something went wrong while deleting the resort room.",
                        icon: "error"
                    });
                }
            }
        });
    };
    

    useEffect(() => {
        if (session?.data?.user?.email) {
            loadData();
        }
    }, [session?.data?.user?.email, loadData]);



    return (
        <div className="container mx-auto p-4">
            <div className="my-4 bg-gradient-to-r from-sky-500 to-sky-700 rounded-xl  py-4 text-center text-lg text-white font-bold shadow-lg">
                <h2 className="mr-2">Here Are All Your Created Resort Room</h2>
            </div>

            <div className="overflow-x-auto p-4 md:p-10 bg-white rounded-lg shadow-lg">
                <table className="table-auto w-full">
                    <thead className="text-white bg-gradient-to-r from-sky-500 to-sky-700">
                        <tr>
                            <th className="px-4 py-2">#</th>
                            <th className="px-4 py-2">Images</th>
                            <th className="px-4 py-2">Room Category</th>
                            <th className="px-4 py-2">Total Price</th>
                            <th className="px-4 py-2">Update</th>
                            <th className="px-4 py-2">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {resortRoom.map((room, index) => (
                            <tr key={room._id} className="hover:bg-gray-100">
                                <td className="border px-4 py-2 text-center">{index + 1}</td>
                                <td className="border px-4 py-2 text-center">
                                    <Image
                                        alt={`image`}
                                        src={room?.photoURL1}
                                        height={100}
                                        width={100}
                                        className="rounded-lg"
                                    />
                                </td>
                                <td className="border px-4 py-2 text-center">{room?.roomType}</td>
                                <td className="border px-4 py-2 text-center">{room?.pricePerNight}$</td>
                                <td className="border px-4 py-2 text-center">
                                    <Link href={`/dashboard/myResortRoom/update/${room?._id}`} className="">
                                        <button className="btn bg-sky-500 hover:bg-sky-400 text-white px-4 py-2 rounded-lg shadow-md">
                                            <GrUpdate className="text-white text-xl font-bold" />
                                        </button>
                                    </Link>
                                </td>
                                <td className="border px-4 py-2 text-center">
                                    <button
                                        onClick={() => handleDeleteItem(room?._id)}
                                        className="btn bg-red-500 hover:bg-red-400 text-white px-4 py-2 rounded-lg shadow-md"
                                    >
                                        <RiDeleteBin6Fill className="text-white text-xl font-bold" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Page;
