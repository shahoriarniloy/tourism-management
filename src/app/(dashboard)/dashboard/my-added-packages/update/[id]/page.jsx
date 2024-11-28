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
      const packageDetail = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/dashboard/my-added-packages/api/packages/${id}`
      );
      const data = await packageDetail.json();
      console.log(data);
      setSpot(data?.data || {});
      setLoading(false);
    } catch (error) {
      console.error("Failed to load Package Data:", error);
      setLoading(false);
    }
  }, [id]);

  const handleUpdatePackage = async (e) => {
    e.preventDefault();


    const form = e.target;

    const category = form.category.value;
    const pricePerNight = form.pricePerNight.value;
    const inclusions = form.inclusions.value;
    const duration = form.duration.value;
    const activities = form.activities.value;
    const idealFor = form.idealFor.value;
    const country = form.country.value;
    const totalPrice = form.totalPrice.value;
    const shortDescription = form.shortDescription.value;
    const photoURL1 = form.photo1.value;
    const photoURL2 = form.photo2.value;
    const email = form.email.value;


    const updateSpot = {
      category,
      pricePerNight,
      inclusions,
      duration,
      activities,
      idealFor,
      country,
      totalPrice,
      shortDescription,
      photoURL1,
      photoURL2,
      email,
    };

    const resp = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/dashboard/my-added-packages/api/packages/${id}`,
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
            Update your Package
          </h2>
          <p className="text-base leading-7 font-semibold text-black pb-5 w-2/3 mx-auto">
           
          </p>
          <form
          onSubmit={handleUpdatePackage}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 mx-auto"
          >
            {/* Left Column */}
            <div>
              {/* Package Category */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-base text-black font-semibold">
                    Package Category
                  </span>
                </label>
                <select
                defaultValue={spot?.category || ""}
                  name="category"
                  className="select select-bordered text-base w-full"
                  required
                >
                  <option>Select Category</option>
                  <option>Luxury Package</option>
                  <option>Adventure Package</option>
                  <option>Relaxation Package</option>
                  <option>Family Fun Package</option>
                  <option>Cultural Experience Package</option>
                </select>
              </div>

              {/* Price Per Night */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-base text-black font-semibold">
                    Price Per Night
                  </span>
                </label>
                <input
                  defaultValue={spot?.pricePerNight || ""}
                  type="number"
                  name="pricePerNight"
                  placeholder="Enter Price Per Night (e.g., $500)"
                  className="input input-bordered"
                  required
                />
              </div>
               {/* Total Price */}
               <div className="form-control">
                <label className="label">
                  <span className="label-text text-base text-black font-semibold">
                    Total Price
                  </span>
                </label>
                <input
                                  defaultValue={spot?.totalPrice || ""}

                  type="number"
                  name="totalPrice"
                  placeholder="Enter Total Price (e.g., $2000)"
                  className="input input-bordered"
                  required
                />
              </div>

          

              {/* Duration */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-base text-black font-semibold">
                    Duration
                  </span>
                </label>
                <input
                                                  defaultValue={spot?.duration || ""}

                  type="text"
                  name="duration"
                  placeholder="Enter Duration (e.g., 3 days, 2 nights)"
                  className="input input-bordered"
                  required
                />
              </div>

              {/* Country */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-base text-black font-semibold">
                    Country
                  </span>
                </label>
                <input
                defaultValue={spot?.country || ""}
                  type="text"
                  name="country"
                  placeholder="Enter Country Name"
                  className="input input-bordered"
                  required
                />
              </div>
                {/* Email */}
                <div className="form-control">
                <label className="label">
                  <span className="label-text text-base text-black font-semibold">
                    Email
                  </span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  className="input input-bordered"
                  defaultValue={user?.email || ''}
                  required
                  readOnly
                />
              </div>


             
            </div>

            {/* Right Column */}
            <div>
                 {/* Photo URL 1 */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-base text-black font-semibold">
                    Photo URL 1
                  </span>
                </label>
                <input
                                  defaultValue={spot?.photoURL1 || ""}

                  type="url"
                  name="photo1"
                  placeholder="Enter First Photo URL"
                  className="input input-bordered"
                  required
                />
              </div>
 {/* Photo URL 2 */}
 <div className="form-control">
                <label className="label">
                  <span className="label-text text-base text-black font-semibold">
                    Photo URL 2
                  </span>
                </label>
                <input
                                                  defaultValue={spot?.photoURL2 || ""}

                  type="url"
                  name="photo2"
                  placeholder="Enter Second Photo URL"
                  className="input input-bordered"
                  required
                />
              </div>
              


              {/* Ideal For */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-base text-black font-semibold">
                    Ideal For
                  </span>
                </label>
                <input
                                                  defaultValue={spot?.idealFor || ""}

                  type="text"
                  name="idealFor"
                  placeholder="Enter Ideal For (e.g., couples, families)"
                  className="input input-bordered"
                  required
                />
              </div>

             

    {/* Inclusions */}
    <div className="form-control">
                <label className="label">
                  <span className="label-text text-base text-black font-semibold">
                    Inclusions
                  </span>
                </label>
                <textarea
                                                  defaultValue={spot?.inclusions || ""}

                  name="inclusions"
                  placeholder="Enter inclusions (e.g., spa, meals, etc.)"
                  className="textarea textarea-bordered w-full"
                  required
                ></textarea>
              </div>
            
              {/* Activities */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-base text-black font-semibold">
                    Activities
                  </span>
                </label>
                <textarea
                                                                  defaultValue={spot?.activities || ""}

                  name="activities"
                  placeholder="Enter activities (e.g., scuba diving, yoga)"
                  className="textarea textarea-bordered w-full"
                  required
                ></textarea>
              </div>
             
              {/* Short Description */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-base text-black font-semibold">
                    Short Description
                  </span>
                </label>
                <textarea
                defaultValue={spot?.shortDescription || ""}
                  name="shortDescription"
                  placeholder="Enter a brief description of the package"
                  className="textarea textarea-bordered w-full"
                  required
                ></textarea>
              </div>
            </div>

            {/* Submit Button */}
            <div className="md:col-span-2 space-y-6">
              <input
                type="submit"
                value="Update Package"
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
