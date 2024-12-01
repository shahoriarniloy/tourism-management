'use client';
import { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useSession } from 'next-auth/react';


const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function Payment() {
    const { data: session } = useSession();

  const [roomName, setRoomName] = useState('');
  const [pricePerNight, setPricePerNight] = useState('');
  const [roomId, setRoomId] = useState('');
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setRoomName(params.get('roomName'));
    setPricePerNight(Number(params.get('pricePerNight')));
    setRoomId(params.get('roomId'));
  }, []);

  useEffect(() => {
    if (checkInDate && checkOutDate) {
      const checkIn = new Date(checkInDate);
      const checkOut = new Date(checkOutDate);
      const dateCount = Math.ceil((checkOut - checkIn) / (1000 * 3600 * 24)); 
      const price = pricePerNight * dateCount; 

      setTotalPrice(price);
    }
  }, [checkInDate, checkOutDate, pricePerNight]);

  const handlePayment = async () => {
    setLoading(true);
    const stripe = await stripePromise;

    const response = await fetch('/payment/api', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount: totalPrice, email: session?.user?.email }),
    });

    const data = await response.json();

    if (data.error) {
      console.error('Error:', data.error);
      setLoading(false);
      return;
    }

    const { error } = await stripe.redirectToCheckout({
      sessionId: data.id, 
    });

    if (error) {
      console.error('Stripe Checkout Error:', error.message);
    }
    setLoading(false);
  };

  return (
    <div className="mx-auto mb-4 flex justify-center">
  <div className="p-6 mt-24 rounded-md shadow-lg bg-white max-w-md w-full">
    <h1 className="text-3xl font-bold text-gray-800 mb-4">{roomName}</h1>
    <p className="text-lg text-gray-600">Price Per Night: <span className="font-semibold">${pricePerNight}</span></p>

    <div className="mt-6">
      <label className="block text-gray-700">Check-in Date:</label>
      <input
        type="date"
        value={checkInDate}
        onChange={(e) => setCheckInDate(e.target.value)}
        className="border border-gray-300 p-2 rounded w-full mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    <div className="mt-4">
      <label className="block text-gray-700">Check-out Date:</label>
      <input
        type="date"
        value={checkOutDate}
        onChange={(e) => setCheckOutDate(e.target.value)}
        className="border border-gray-300 p-2 rounded w-full mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    <div className="mt-6">
      <h2 className="text-xl font-semibold text-gray-800">Total Price: <span className="text-green-600">${totalPrice}</span></h2>
    </div>

    <button
      onClick={handlePayment}
      className="bg-blue-500 text-white rounded-md px-6 py-2 mt-6 w-full hover:bg-blue-600 transition duration-300 ease-in-out"
      disabled={loading}
    >
      {loading ? 'Processing...' : 'Proceed to Payment'}
    </button>
  </div>
</div>

  );
}
