
"use client"
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const SuccessPage = () => {
    const router = useRouter();
    const { session_id } = router.query;  

    useEffect(() => {
        if (session_id) {
            fetch(`/paymentSuccess/roomBooking/api`)
                .then((res) => res.json())
                .then((data) => {
                    if (data.message) {
                        console.log(data.message); 
                    }
                })
                .catch((error) => console.error(error));
        }
    }, [session_id]);

    return (
        <div>
            <h1>Payment Successful!</h1>
            <p>Thank you for your booking.</p>
        </div>
    );
};

export default SuccessPage;
