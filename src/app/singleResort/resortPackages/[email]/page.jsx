import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';




const SingleResortPackages = () => {
    const router = useRouter();
  const [packages, setPackages] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); 
  const [email, setEmail] = useState(null);

  useEffect(() => {
    if (router.query?.email) {
      setEmail(router.query.email);
    }
  }, [router.query?.email]);
  

  useEffect(() => {
    console.log(email);
    if (email) {
      const fetchResortData = async () => {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/singleResort/api/${email}`
          );
          if (!response.ok) throw new Error("Failed to fetch resort data");
          const data = await response.json();
          console.log('resort',data);
          setPackages(data ?? null);
        } catch (error) {
          setError(error.message);  
          console.error("Error fetching resort data:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchResortData();
    }
  }, [email]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;  // Show error message if there's an error
  }

  if (!resort) {
    return <p>No resort information available.</p>;
  }



  return (
    <div className="mx-24 px-4 mb-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
  {packages.length > 0 ? (
    packages.map((p, index) => {
      
      const nights = parseInt(p?.duration?.split(" ")[2]) || 0; 
      const priceBreakdown = p?.pricePerNight * nights;

      return (

        
        <div
          key={index}
          className="room-card bg-white shadow-md rounded-md p-4 flex flex-col justify-between h-full"
        >
          <div>
            <div className="relative w-full h-32 md:h-48 lg:h-56">
              <Image
                src={p?.photoURL1}
                alt={p?.photoURL1}
                layout="fill"
                objectFit="cover"
                className="rounded-md"
              />
              <div className="absolute top-2 right-2 bg-gray-900 bg-opacity-75 text-white text-sm font-semibold rounded px-2 py-1">
                ${p?.totalPrice}
                <br />
                <span className="text-xs font-thin">
                <del>${priceBreakdown}</del>
                </span>
              </div>
            </div>
            <h1 className="text-lg font-semibold mt-2 text-sky-500">{p?.category}</h1>
            <h3 className="text-md mb-2 font-thin mt-2 text-gray-500">Ideal For: {p?.idealFor}</h3>
            <p className="text-gray-600">
              <em>{p?.shortDescription}</em>
            </p>
           
          </div>

          <Link href={`/packagesServices/${p?._id}`} className="mt-auto">
            <button className="btn bg-green-500 text-white w-full mt-4 py-2 px-4 rounded-md hover:bg-green-700 transition-colors duration-300">
              Explore This Package
            </button>
          </Link>
        </div>
      );
    })
  ) : (
    <p className="text-gray-600">No Packages available at the moment.</p>
  )}
</div>

  );
};

export default SingleResortPackages;
