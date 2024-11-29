import Image from 'next/image';
import React from 'react';





const getPackages = async () => { 

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/packagesServices/api/get-all`)
    const data = await res.json();
    return data?.packages;
  
  }
const Packages = async () => {

    const packages = await getPackages() || [];

    console.log(packages);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {
                packages?.map(p => {
                    <div key={p?._id} className=" ">
                    {/* <Image
                      src={p?.photoURL1}
                      alt={` logo`}
                      layout="fill"
                      objectFit="cover"
                      className="w-full h-full"
                      width={100}
                      height={100}
                    /> */}
                    {/* <div className=" w-36 h-36 absolute bottom-[-40px] left-1/2 transform -translate-x-1/2">
                      <Image
                        src={p?.photoURL2}
                        alt={`Profile`}
                        layout="fill"
                        objectFit="cover"
                        className="w-full h-full rounded-full border-4 border-sky-500"
                      />
                    </div> */}

                    <h1>fhasdfhasdhl</h1>
                  </div>
                })
            }
        </div>
    );
};

export default Packages;