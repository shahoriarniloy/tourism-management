"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const BookedRooms = () => {
  const [bookedRooms, setBookedRooms] = useState([]);
  const [bookedPackages, setBookedResorts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { data: session, status } = useSession();

  const resortEmail = session?.user?.email;

  useEffect(() => {
    const fetchResort = async () => {
      if (status === "loading" || !resortEmail) return;

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/dashboard/bookings/api/${resortEmail}`
        );
        const data = await response.json();

        if (response.ok) {
          setBookedRooms(data?.bookedRooms);
          setBookedResorts(data?.bookedPackages);
        } else {
          console.error("Error fetching booked rooms:", data.error);
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchResort();
  }, [status, resortEmail]);

  const handleRoomCheckout = async (roomId) => {
    setLoading(true); 
  
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/dashboard/bookings/checkout/room/api/${roomId}`, 
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ roomId: roomId, resortEmail: resortEmail }) 
        }
      );
  
      const data = await response.json();
  
      if (response.ok) {
        console.log("Checkout successful:", data);
        setBookedRooms(data?.bookedRooms); 
        setBookedResorts(data?.bookedPackages); 
      } else {
        console.error("Error checking out room:", data.error);
      }
    } catch (error) {
      console.error("Error during room checkout:", error);
    } finally {
      setLoading(false); 
    }
  };


  const handlePackageCheckout = async (packageId) => {
    setLoading(true); 
  
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/dashboard/bookings/checkout/package/api/${packageId}`, 
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ packageId: packageId, resortEmail: resortEmail }) 
        }
      );
  
      const data = await response.json();
  
      if (response.ok) {
        console.log("Checkout successful:", data);
        setBookedRooms(data?.bookedRooms); 
        setBookedResorts(data?.bookedPackages); 
      } else {
        console.error("Error checking out package:", data.error);
      }
    } catch (error) {
      console.error("Error during package checkout:", error);
    } finally {
      setLoading(false); 
    }
  };
  

  if (loading) return <p>Loading...</p>;

  return (
    <div className="overflow-x-auto">
        <h1 className="text-3xl from-neutral-content leading-tight text-center mt-8 m-4">Room Bookings</h1>
      <table className="min-w-full table-auto">
        <thead className="bg-sky-500 text-white">
          <tr>
            <th className="px-4 py-2 border-b">Room No</th>
            <th className="px-4 py-2 border-b">Customer Email</th>
            <th className="px-4 py-2 border-b">Check-in Date</th>
            <th className="px-4 py-2 border-b">Check-out Date</th>
            <th className="px-4 py-2 border-b">Action</th>
          </tr>
        </thead>
        <tbody>
          {bookedRooms?.length === 0 ? (
            <tr>
              <td colSpan="5" className="px-4 py-2 text-center">No booked rooms found</td>
            </tr>
          ) : (
            bookedRooms?.map((room) => (
              <tr key={room._id}>
                <td className="px-4 py-2 border-b">{room.roomNo}</td>
                <td className="px-4 py-2 border-b">{room.bookingInfo.customerEmail}</td>
                <td className="px-4 py-2 border-b">{room.bookingInfo.checkInDate}</td>
                <td className="px-4 py-2 border-b">{room.bookingInfo.checkOutDate}</td>
                <td className="px-4 py-2 border-b">
                  <button
                    onClick={() => handleRoomCheckout(room._id)}
                    className="bg-sky-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  >
                    Checkout
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <h1 className="text-3xl from-neutral-content leading-tight text-center mt-8 m-4">Packages Bookings</h1>

      
      
      <table className="min-w-full table-auto">
        <thead className="bg-sky-500 text-white">
          <tr>
            <th className="px-4 py-2 border-b">Package</th>
            <th className="px-4 py-2 border-b">Customer Email</th>
            <th className="px-4 py-2 border-b">Check-in Date</th>
            <th className="px-4 py-2 border-b">Check-out Date</th>
            <th className="px-4 py-2 border-b">Action</th>
          </tr>
        </thead>
        <tbody>
          {bookedPackages?.length === 0 ? (
            <tr>
              <td colSpan="5" className="px-4 py-2 text-center">No booked rooms found</td>
            </tr>
          ) : (
            bookedPackages?.map((packages) => (
              <tr key={packages._id}>
                <td className="px-4 py-2 border-b">{packages.category}</td>
                <td className="px-4 py-2 border-b">{packages.bookingInfo.customerEmail}</td>
                <td className="px-4 py-2 border-b">{packages.bookingInfo.checkInDate}</td>
                <td className="px-4 py-2 border-b">{packages.bookingInfo.checkOutDate}</td>
                <td className="px-4 py-2 border-b">
                  <button
                    onClick={() => handlePackageCheckout(packages._id)}
                    className="bg-sky-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  >
                    Checkout
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default BookedRooms;
