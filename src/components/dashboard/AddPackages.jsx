import { useSession } from 'next-auth/react';
import React from 'react';
import Swal from 'sweetalert2';

const AddPackages = () => {
  const { data: session } = useSession();
  const user = session?.user;

  const handleAddPackage = (e) => {
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

    const newPackage = {
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

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/dashboard/addPackages/api`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newPackage),
    })
      .then((res) => res.json())
      .then((data) => {
        const { insertedId } = data.result;
        if (insertedId) {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Package Added Successfully',
            showConfirmButton: false,
            timer: 1500,
          });
        }
        e.target.reset();
      });
  };

  return (
    <div className="px-4 md:px-0 mx-auto">
      <div className="mx-auto bg-white rounded-md p-8">
        <div className="text-center px-10 py-7 lg:px-6 lg:py-2 lg:w-4/4 rounded-md mx-auto">
          <h2 className="text-3xl pb-7 text-black font-extrabold">
            Add a New Package
          </h2>

          <form
            onSubmit={handleAddPackage}
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
                value="Add Package"
                className="btn w-full bg-sky-500 text-base text-white border-0 rounded-md border-[#331A15]"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddPackages;
