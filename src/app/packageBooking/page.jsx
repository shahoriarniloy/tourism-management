'use client';
import { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useSession } from 'next-auth/react';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function Payment() {
  const { data: session } = useSession();

  const [roomName, setRoomName] = useState('');
  const [packageId, setPackageId] = useState('');
  const [totalPrice, setTotalPrice] = useState('');
  const [duration, setDuration] = useState('');
  const [parsedDuration, setParsedDuration] = useState(0); 
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setRoomName(params.get('category'));
    setPackageId(params.get('id'));
    setDuration(params.get('duration'));
    setTotalPrice(Number(params.get('totalPrice')));
  }, []);

  useEffect(() => {
    
    if (duration) {
      const match = duration.match(/\d+/); 
      const daysOrNights = match ? parseInt(match[0], 10) : 0;
      setParsedDuration(daysOrNights);
    }
  }, [duration]);

  const handleCheckInDateChange = (event) => {
    const selectedDate = new Date(event.target.value);
    setCheckInDate(event.target.value);

    if (parsedDuration) {
      const checkOut = new Date(selectedDate);
      checkOut.setDate(checkOut.getDate() + parsedDuration);
      setCheckOutDate(checkOut.toISOString().split('T')[0]); 
    }
  };

  const handlePayment = async () => {
    if (!checkInDate) {
      alert('Please select a check-in date.');
      return;
    }

    setLoading(true);
    const stripe = await stripePromise;

    const response = await fetch('/payment/api', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        amount: totalPrice,
        email: session?.user?.email,
        packageId,
        checkInDate,
        checkOutDate,
      }),
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

        <div className="mt-4">
          <label htmlFor="checkInDate" className="block text-gray-700 font-medium mb-2">
            Check-in Date
          </label>
          <input
            type="date"
            id="checkInDate"
            value={checkInDate}
            onChange={handleCheckInDateChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {checkOutDate && (
          <div className="mt-4">
            <h2 className="text-lg text-gray-800">
              Check-out Date: <span className="text-green-600">{checkOutDate}</span>
            </h2>
          </div>
        )}

        <div className="mt-6">
          <h2 className="text-xl font-semibold text-gray-800">
            Total Price: <span className="text-green-600">${totalPrice}</span>
          </h2>
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
