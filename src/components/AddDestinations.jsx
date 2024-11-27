import { useSession } from 'next-auth/react';
import React from 'react';
import Swal from 'sweetalert2';

const AddDestinations = () => {

const {data:session} = useSession()
    const user = session?.user;


    console.log(user);

    const handleAddSpot = e => {
        e.preventDefault();
        const form = e.target;
        
        const name = form.name.value;
        const country = form.country.value;
        const location = form.location.value;
        const travel = form.travel.value;
        const photoURL1 = form.photo1.value;
        const photoURL2 = form.photo2.value;
        const average = form.average.value;
        const seasonality = form.seasonality.value;
        const total = form.total.value;
        const description = form.description.value;
        const email = user ? user?.email : '';
      
        
        const newSpot = {
        name,country,location, travel,  photoURL1, photoURL2, average,seasonality, total,email, description
        }
       
        
        // send data to the server
        fetch( `${process.env.NEXT_PUBLIC_API_URL}/addDestinations/api`, {
        method: 'POST',
        headers: {
        'content-type': 'application/json'
        },
        
        body: JSON.stringify(newSpot)
        
        })
        .then(res => res.json())
        .then(data => {
            const {insertedId} = data.result
            if(insertedId){
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Your work has been saved",
                    showConfirmButton: false,
                    timer: 1500
                });
              
                
        }
        e.target.reset()
        }
    )


        }
        


    return (
        <div className="px-4 md:px-0 my-12 max-w-[1280px] mx-auto">

          <div className=" mx-auto">
            <div className="text-center my-12 px-10 py-7 lg:px-28 lg:py-16 bg-[#eaeaea] lg:w-4/4 rounded-md mx-auto">
              <h2 className="text-5xl pb-7 text-black font-extrabold">
                Add a New Tourist Spot
              </h2>
              <p className="text-base leading-7 font-semibold text-black pb-5 w-2/3 mx-auto">
                Experience the allure of our newest tourist spot! Discover
                breathtaking landscapes, vibrant cultures, and unforgettable
                adventures. Join us on an exploration filled with wonder and
                excitement.
              </p>
              <form 
              onSubmit={handleAddSpot}
              className="grid grid-cols-1 md:grid-cols-2 gap-6  mx-auto">
                <div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text text-base text-black font-semibold">
                        Name
                      </span>
                    </label>
                    <input
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
                    
                    className="select select-bordered text-base w-full">
                      
                      <option  >
                        Select Country
                      </option>
                      <option >Bangladesh</option>
                      <option >Thailand</option>
                      <option >Indonesia</option>
                      <option >Malaysia</option>
                      <option >Vietnam</option>
                      <option >Cambodia</option>
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
                      name="travel"
                      placeholder="travel_time => like- 7 days
                    "
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
                      name="photo1"
                      placeholder="Enter Tourist spot Photo URL"
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
                      name="photo2"
                      placeholder="Enter Tourist spot Photo URL"
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
                      name="total"
                      placeholder="Enter totalVisitorsPerYear => like- 10000"
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
                    value={user ? user?.email : ''}
                    readOnly
                      type="email"
                      name="email"
                      placeholder=""
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
                      placeholder="Bio"
                      name="description"
                      className="textarea textarea-bordered row-span-2 w-full "
                    ></textarea>
                  </div>
                  <input
                    type="submit"
                   
                    value="Add Tourist Spot "
                    className="btn w-full bg-orange-600 text-base text-white border-0 rounded-md border-[#331A15]"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      );
};

export default AddDestinations;