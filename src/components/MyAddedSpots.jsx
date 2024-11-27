"use-client";
import Link from "next/link";
import React, { useEffect } from "react";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { GrUpdate } from "react-icons/gr";
import { useSession } from "next-auth/react";
const MyAddedSpots = () => {
  const session = useSession();
  const loadData = async () => {
    const resp = await fetch(`http://localhost:3000/my-added-spot/api/${session?.data?.user?.email}`);
    const data = await resp.json();
    console.log(data);
    return data?.myAddedSpots;
  };

//   useEffect(() => {
//     loadData();
//   }, [session])

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

              <th>Name</th>
              <th>Category</th>
              <th>Images</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          {/* <tbody>
            {surveys.map((survey, index) => (
              <tr key={survey._id}>
                <th>{index + 1}</th>

                <td>{survey?.title}</td>
                <td>{survey?.category}</td>
                <td>{survey.deadline}</td>
                <td>
                  <Link to={`/dashboard/update/${survey?._id}`} className="">
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
          </tbody> */}
        </table>
      </div>
    </div>
  );
};

export default MyAddedSpots;
