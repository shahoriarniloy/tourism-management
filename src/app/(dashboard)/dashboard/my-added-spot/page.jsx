"use client";
import { useSession } from "next-auth/react";
import React, { useEffect, useState, useCallback } from "react";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { GrUpdate } from "react-icons/gr";
import Link from "next/link";
import Image from "next/image";
import Swal from "sweetalert2";
import DestinationDetailModal from "@/components/DestinationDetailModal";

const Page = () => {
  const session = useSession();
  const [spots, setSpots] = useState([]);
  const [showModal, setShowModal] = useState(false); // To control modal visibility
  const [selectedSpot, setSelectedSpot] = useState(null); // To store selected spot details

  const loadData = useCallback(async () => {
    if (session?.data?.user?.email) {
      const resp = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/dashboard/my-added-spot/api/${session?.data?.user?.email}`
      );
      const data = await resp.json();
      setSpots(data?.myAddedSpots);
    }
  }, [session?.data?.user?.email]);

  const handleDeleteItem = async (id) => {
    const deleted = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/dashboard/my-added-spot/api/spot/${id}`,
      {
        method: "DELETE",
      }
    );

    const resp = await deleted.json();

    if (resp?.response?.deletedCount > 0) {
      loadData();
    }

    Swal.fire({
      position: "top",
      icon: "success",
      title: "Successfully deleted",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  const handleShowDetails = (spot) => {
    setSelectedSpot(spot);
    setShowModal(true);  // Show the modal
  };

  const closeModal = () => {
    setShowModal(false);  // Close the modal
  };

  useEffect(() => {
    if (session?.data?.user?.email) {
      loadData();
    }
  }, [session?.data?.user?.email, loadData]);

  return (
    <div className="container mx-auto p-4">
      <div className="my-4 bg-gradient-to-r from-sky-500 to-sky-700 rounded-xl py-4 text-center text-lg text-white font-bold shadow-lg">
        <h2 className="mr-2">Here Are All Your Created Spots</h2>
      </div>

      <div className="overflow-x-auto p-4 md:p-10 bg-white rounded-lg shadow-lg">
        <table className="table-auto w-full">
          <thead className="text-white bg-gradient-to-r from-sky-500 to-sky-700">
            <tr>
              <th className="px-4 py-2 text-xs sm:text-sm">#</th>
              <th className="px-4 py-2 text-xs sm:text-sm">Name</th>
              <th className="px-4 py-2 text-xs sm:text-sm">Details</th>
              <th className="px-4 py-2 text-xs sm:text-sm hidden sm:table-cell">Update</th>
              <th className="px-4 py-2 text-xs sm:text-sm hidden sm:table-cell">Delete</th>
              <th className="px-4 py-2 text-xs sm:text-sm sm:hidden">Actions</th>
            </tr>
          </thead>
          <tbody>
            {spots.map((spot, index) => (
              <tr key={spot._id} className="hover:bg-gray-100">
                <td className="border px-4 py-2 text-center text-xs sm:text-sm">{index + 1}</td>
                <td className="border px-4 py-2 text-center text-xs sm:text-sm">{spot?.name}</td>

                <td className="border px-4 py-2 text-center text-xs sm:text-sm">
                  <button
                    onClick={() => handleShowDetails(spot)} // Show details when button is clicked
                    className="btn bg-sky-500 hover:bg-sky-400 text-white px-4 py-2 rounded-lg shadow-md"
                  >
                    Details
                  </button>
                </td>

                <td className="border px-4 py-2 text-center hidden sm:table-cell">
                  <Link href={`/dashboard/my-added-spot/update/${spot?._id}`}>
                    <button className="btn bg-sky-500 hover:bg-sky-400 text-white px-4 py-2 rounded-lg shadow-md">
                      <GrUpdate className="text-white text-xl font-bold" />
                    </button>
                  </Link>
                </td>
                <td className="border px-4 py-2 text-center hidden sm:table-cell">
                  <button
                    onClick={() => handleDeleteItem(spot?._id)}
                    className="btn bg-red-500 hover:bg-red-400 text-white px-4 py-2 rounded-lg shadow-md"
                  >
                    <RiDeleteBin6Fill className="text-white text-xl font-bold" />
                  </button>
                </td>

                <td className="border px-4 py-2 text-center sm:hidden">
                  <div className="flex justify-center space-x-2">
                    <Link href={`/dashboard/my-added-spot/update/${spot?._id}`}>
                      <button className="btn bg-sky-500 hover:bg-sky-400 text-white px-4 py-2 rounded-lg shadow-md">
                        <GrUpdate className="text-white text-xl font-bold" />
                      </button>
                    </Link>
                    <button
                      onClick={() => handleDeleteItem(spot?._id)}
                      className="btn bg-red-500 hover:bg-red-400 text-white px-4 py-2 rounded-lg shadow-md"
                    >
                      <RiDeleteBin6Fill className="text-white text-xl font-bold" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Conditionally render the modal if it's visible */}
      {showModal && selectedSpot && (
        <DestinationDetailModal spot={selectedSpot} closeModal={closeModal} />
      )}
    </div>
  );
};

export default Page;
