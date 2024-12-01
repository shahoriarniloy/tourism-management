

"use client";
import { useEffect, useState } from 'react';

const SuccessPage = () => {
    const [paymentData, setPaymentData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const sessionId = urlParams.get('session_id'); 
        const packageId = urlParams.get('packageId'); 

        if (sessionId) {
            fetch(`/paymentSuccess/packageBooking/api?session_id=${sessionId}&packageId=${packageId}`)
                .then((res) => res.json())
                .then((data) => {
                    setLoading(false);
                    if (data.error) {
                        console.error(data.error);
                    } else {
                        setPaymentData(data);
                    }
                })
                .catch((error) => {
                    setLoading(false);
                    console.error('Error fetching payment info:', error);
                });
        }
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex justify-center">
  <div className="mt-24 border-2 shadow-lg rounded-md mx-36 my-36 p-8 bg-white max-w-lg w-full">
    {paymentData ? (
      <>
        <h1 className="text-3xl font-bold text-green-600 mb-4">Payment Successful!</h1>
        <em><p className="text-lg text-gray-700 mb-4">Thank you for your booking.</p></em>
        <em><p className="text-lg text-gray-700">Amount: <span className="font-semibold">${paymentData.amount}</span></p></em>
        <em><p className="text-lg text-gray-700">Status: <span className="font-semibold">{paymentData.paymentStatus}</span></p></em>
        <em><p className="text-lg text-gray-700">Customer Email: <span className="font-semibold">{paymentData.customerEmail}</span></p></em>
      </>
    ) : (
      <p className="text-lg text-red-600">Something went wrong with your payment. Please try again later.</p>
    )}
  </div>
</div>

    );
};

export default SuccessPage;

