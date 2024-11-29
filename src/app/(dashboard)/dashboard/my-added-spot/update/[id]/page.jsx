"use client";
import { useSession } from "next-auth/react";
import React, { useEffect, useState, useCallback } from "react";
import Swal from "sweetalert2";

const Page = ({ params }) => {
  const { data: session } = useSession();
  const user = session?.user;

  const [spot, setSpot] = useState({});
  const [loading, setLoading] = useState(true);
  const [id, setId] = useState(null);

  // Unwrap params using React.use()
  useEffect(() => {
    async function unwrapParams() {
      const resolvedParams = await params;
      setId(resolvedParams.id);
    }
    unwrapParams();
  }, [params]);

  const loadSpot = useCallback(async () => {
    if (!id) return;
    try {
      const spotDetail = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/dashboard/my-added-spot/api/spot/${id}`
      );
      const data = await spotDetail.json();
      console.log(data);
      setSpot(data?.data || {});
      setLoading(false);
    } catch (error) {
      console.error("Failed to load spot:", error);
      setLoading(false);
    }
  }, [id]);

  const handleUpdateSpot = async (event) => {
    event.preventDefault();

    const updateSpot = {
      name: event.target.name.value,
      country: event.target.country.value,
      location: event.target.location.value,
      travel: event.target.travel.value,
      photoURL1: event.target.photo1.value,
      photoURL2: event.target.photo2.value,
      average: event.target.average.value,
      seasonality: event.target.seasonality.value,
      total: event.target.total.value,
      description: event.target.description.value,
    };

    const resp = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/dashboard/my-added-spot/api/spot/${id}`,
      {
        method: "PATCH",
        body: JSON.stringify(updateSpot),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (resp.status === 200) {
      Swal.fire({
        position: "top",
        icon: "success",
        title: "Successfully Updated",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  useEffect(() => {
    loadSpot();
  }, [id, loadSpot]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="px-4 md:px-0 my-12 max-w-[1280px] mx-auto">
      <div className="mx-auto">
        <div className="text-center my-12 px-10 py-7 lg:px-28 lg:py-16  lg:w-4/4 rounded-md mx-auto">
          <h2 className="text-5xl pb-7 text-black font-extrabold">
            Update your Tourist Spot
          </h2>
          <p className="text-base leading-7 font-semibold text-black pb-5 w-2/3 mx-auto">
            Experience the allure of our newest tourist spot! Discover
            breathtaking landscapes, vibrant cultures, and unforgettable
            adventures. Join us on an exploration filled with wonder and
            excitement.
          </p>
          <form
            onSubmit={handleUpdateSpot}
            className="grid grid-cols-1 md:grid-cols-2 gap-6  mx-auto"
          >
            <div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-base text-black font-semibold">
                    Name
                  </span>
                </label>
                <input
                  defaultValue={spot?.name || ""}
                  type="text"
                  name="name"
                  placeholder="Enter Your Tourist Spot Name"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-base text-black font-semibold">
                    Country Name
                  </span>
                </label>
                <select
                  name="country"
                  defaultValue={spot?.country || ""}
                  className="select select-bordered text-base w-full"
                  required
                >
                  <option disabled>Select Country</option>
                  <option>Bangladesh</option>
                  <option>Thailand</option>
                  <option>Indonesia</option>
                  <option>Malaysia</option>
                  <option>Vietnam</option>
                  <option>Cambodia</option>
                </select>
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-base text-black font-semibold">
                    Location
                  </span>
                </label>
                <input
                  type="text"
                  defaultValue={spot?.location || ""}
                  name="location"
                  placeholder="Enter Your Spot Location"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-base text-black font-semibold">
                    Seasonality
                  </span>
                </label>
                <input
                  type="text"
                  defaultValue={spot?.seasonality || ""}
                  name="seasonality"
                  placeholder="Enter seasonality - like summer, winter"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-base text-black font-semibold">
                    Travel Time
                  </span>
                </label>
                <input
                  type="text"
                  defaultValue={spot?.travel || ""}
                  name="travel"
                  placeholder="Travel time, e.g., 7 days"
                  className="input input-bordered"
                  required
                />
              </div>
            </div>
            <div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-base text-black font-semibold">
                    Photo URL 1
                  </span>
                </label>
                <input
                  type="url"
                  defaultValue={spot?.photoURL1 || ""}
                  name="photo1"
                  placeholder="Enter Tourist Spot Photo URL"
                  className="input input-bordered"
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
                  defaultValue={spot?.photoURL2 || ""}
                  name="photo2"
                  placeholder="Enter Tourist Spot Photo URL"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-base text-black font-semibold">
                    Average Cost
                  </span>
                </label>
                <input
                  type="number"
                  defaultValue={spot?.average || ""}
                  name="average"
                  placeholder="Enter Spot Average Cost"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-base text-black font-semibold">
                    Total Visitors Per Year
                  </span>
                </label>
                <input
                  type="number"
                  defaultValue={spot?.total || ""}
                  name="total"
                  placeholder="Total visitors per year, e.g., 10000"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-base text-black font-semibold">
                    User Email
                  </span>
                </label>
                <input
                  type="email"
                  value={spot?.email || user?.email || ""}
                  readOnly
                  name="email"
                  className="input input-bordered"
                  required
                />
              </div>
            </div>
            <div className="md:col-span-2 space-y-6">
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-base text-black font-semibold">
                    Short Description
                  </span>
                </label>
                <textarea
                  placeholder="Enter description"
                  name="description"
                  className="textarea textarea-bordered row-span-2 w-full"
                  defaultValue={spot?.description || ""}
                ></textarea>
              </div>
              <input
                type="submit"
                value="Update Tourist Spot"
                className="btn w-full bg-sky-500 text-base text-white border-0 rounded-md border-[#331A15]"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Page;
