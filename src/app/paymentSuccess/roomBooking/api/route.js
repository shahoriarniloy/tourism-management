// import { connectDB } from "@/lib/connectDB";
// import { NextResponse } from "next/server";

// export const POST = async (req) => {
//   const db = await connectDB();
//   const bookingsCollection = await db.collection("bookings");

//   try {
//     const { email, amount, roomId } = await req.json();

   


//       let bookingData = {
//         customer_email: email,
//         amount: amount / 100, 
//         status: "paid",
//         RoomID:roomId,
//         paymentStatus: session.payment_status, 
//         bookingDate: new Date(),
//         bookingType: "Room Booking", 
//       };

     

//       const result = await bookingsCollection.insertOne(bookingData);

//       return NextResponse.json(
//         { message: "Booking Added Successfully!", result },
//         { status: 201 }
//       );
    
//   } catch (error) {
//     console.error("Error adding Booking:", error);
//     return NextResponse.json(
//       { error: "Failed to add the booking." },
//       { status: 500 }
//     );
//   }
// };


import { connectDB } from "@/lib/connectDB";

import { NextResponse } from 'next/server';
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export async function GET(req) {
    const db = await connectDB();
  const bookingsCollection = await db.collection("bookings");
  try {
    const url = new URL(req.url);
    const sessionId = url.searchParams.get('session_id'); 
    const roomId = url.searchParams.get('roomId'); 

    if (!sessionId) {
      return NextResponse.json({ error: 'Session ID is required' }, { status: 400 });
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status === 'paid') {
      const paymentIntent = await stripe.paymentIntents.retrieve(session.payment_intent);
      
      const paymentData = {
        sessionId: session.id,
        customerEmail: session.customer_email,
        amount: paymentIntent.amount_received / 100, 
        currency: paymentIntent.currency,
        paymentStatus: session.payment_status,
        paymentMethod: paymentIntent.payment_method_types,
        roomId:roomId,
        booking_type: "Room Booking"
        
      };


            const result = await bookingsCollection.insertOne(paymentData);

      return NextResponse.json(paymentData, { status: 200 });
    } else {
      return NextResponse.json({ error: 'Payment not successful' }, { status: 400 });
    }
  } catch (error) {
    console.error('Error fetching payment info:', error);
    return NextResponse.json({ error: 'Error fetching payment info' }, { status: 500 });
  }
}
