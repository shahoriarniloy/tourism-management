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
  }, [session?.data?.user?.email, loadData]);  // Explicitly include session's email and loadData as dependencies

  console.log(spots);

  return (
    <div>
      <div className="my-4 bg-[#333333] rounded-xl mt-12 py-4 text-center text-lg text-orange-500 font-bold">
        <h2 className="mr-2">Here Is Your Created All Spots</h2>
      </div>

      <div className="overflow-x-auto p-4 md:p-10">
        <table className="table table-zebra">
          <thead className="text-white bg-orange-500">
            <tr>
              <th>#</th>
              <th>Images</th>
              <th>Name</th>
              <th>Price</th>

              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {spots.map((spot, index) => (
              <tr key={spot._id}>
                <th>{index + 1}</th>
                <td>
                  <Image
                    alt={`image`}
                    src={spot?.photoURL1}
                    height={100}
                    width={100}
                  />
                </td>
                <td>{spot?.name}</td>
                <td>{spot?.average}$</td>

                <td>
                  <Link href={`/my-added-spot/update/${spot?._id}`} className="">
                    <button className="btn">
                      <GrUpdate className="text-green-500 text-xl font-bold" />
                    </button>
                  </Link>
                </td>
                <td>
                  <button
                    onClick={() => handleDeleteItem(spot?._id)}
                    className="btn"
                  >
                    <RiDeleteBin6Fill className="text-red-500 text-xl font-bold" />
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
