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
  const [spots, setSpots] = useState([]);

  const loadData = useCallback(async () => {
    if (session?.data?.user?.email) {
      const resp = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/my-added-spot/api/${session?.data?.user?.email}`
      );
      const data = await resp.json();
      setSpots(data?.myAddedSpots);
    }
  }, [session?.data?.user?.email]);

  const handleDeleteItem = async (id) => {
    const deleted = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/my-added-spot/api/spot/${id}`,
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

  useEffect(() => {
    if (session?.data?.user?.email) {
      loadData();
    }
  }, [session?.data?.user?.email, loadData]);

  console.log(spots);

  return (
    <div className="container mx-auto p-4">
      <div className="my-4 bg-gradient-to-r from-sky-500 to-sky-700 rounded-xl  py-4 text-center text-lg text-white font-bold shadow-lg">
        <h2 className="mr-2">Here Are All Your Created Spots</h2>
      </div>

      <div className="overflow-x-auto p-4 md:p-10 bg-white rounded-lg shadow-lg">
        <table className="table-auto w-full">
          <thead className="text-white bg-gradient-to-r from-sky-500 to-sky-700">
            <tr>
              <th className="px-4 py-2">#</th>
              <th className="px-4 py-2">Images</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Price</th>
              <th className="px-4 py-2">Update</th>
              <th className="px-4 py-2">Delete</th>
            </tr>
          </thead>
          <tbody>
            {spots.map((spot, index) => (
              <tr key={spot._id} className="hover:bg-gray-100">
                <td className="border px-4 py-2 text-center">{index + 1}</td>
                <td className="border px-4 py-2 text-center">
                  <Image
                    alt={`image`}
                    src={spot?.photoURL1}
                    height={100}
                    width={100}
                    className="rounded-lg"
                  />
                </td>
                <td className="border px-4 py-2 text-center">{spot?.name}</td>
                <td className="border px-4 py-2 text-center">{spot?.average}$</td>
                <td className="border px-4 py-2 text-center">
                  <Link href={`/my-added-spot/update/${spot?._id}`} className="">
                    <button className="btn bg-sky-500 hover:bg-sky-400 text-white px-4 py-2 rounded-lg shadow-md">
                      <GrUpdate className="text-white text-xl font-bold" />
                    </button>
                  </Link>
                </td>
                <td className="border px-4 py-2 text-center">
                  <button
                    onClick={() => handleDeleteItem(spot?._id)}
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
