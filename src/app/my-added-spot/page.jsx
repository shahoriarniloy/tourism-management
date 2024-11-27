"use client";
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from "react";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { GrUpdate } from "react-icons/gr";
import Link from 'next/link';
import Image from 'next/image';

const Page = () => {

    const session = useSession();
const [spots, setSpots] = useState([])

    const loadData = async () => {
      const resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/my-added-spot/api/${session?.data?.user?.email}`);
      const data = await resp.json();
    
     setSpots(data?.myAddedSpots);
    };
  

    useEffect( () => {
loadData();
    }, [session])


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
              {spots.map((survey, index) => (
                <tr key={survey._id}>
                  <th>{index + 1}</th>
                  <td>
                    <Image alt={`image`} src={survey?.photoURL1} height={100} width={100} />
                  </td>
                  <td>{survey?.name}</td>
                  <td>{survey?.average}$</td>
              
                  <td>
                    <Link href={`/dashboard/update/${survey?._id}`} className="">
                      <button className="btn">
                        <GrUpdate className="text-green-500 text-xl font-bold" />
                      </button>
                    </Link>
                  </td>
                  <td>
                    <button
                      //  onClick={() => handleDeleteItem(survey)}
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