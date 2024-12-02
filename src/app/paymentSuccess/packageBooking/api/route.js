


import { connectDB } from "@/lib/connectDB";
import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export async function GET(req) {
  const db = await connectDB();
  const bookingsCollection = await db.collection("bookings");
  const packagesCollection = await db.collection("packages");

  try {
    const url = new URL(req.url);
    const sessionId = url.searchParams.get('session_id');
    const packageId = url.searchParams.get('packageId');

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
        packageId: packageId,
        booking_type: "Package Booking"
      };



      const result = await bookingsCollection.insertOne(paymentData);
      const objectIdPackageId = new ObjectId(packageId);

   
      const packageUpdateResult = await packagesCollection.updateOne(
        { _id: objectIdPackageId },
        {
          $set: {
            status: "Booked",
            bookingInfo: {
              checkInDate: session.metadata.checkInDate,
              checkOutDate: session.metadata.checkOutDate,
              customerEmail: session.customer_email,
            },
          },
        },
        { upsert: false }
      );

      if (packageUpdateResult.modifiedCount === 0) {
        console.warn(`No package found with ID: ${packageId}`);
        return NextResponse.json({
          paymentData,
          warning: "Payment successful, but no package status updated",
        }, { status: 200 });
      }

      return NextResponse.json(paymentData, { status: 200 });
    } else {
      return NextResponse.json({ error: 'Payment not successful' }, { status: 400 });
    }
  } catch (error) {
    console.error('Error fetching payment info:', error);
    return NextResponse.json({ error: 'Error fetching payment info' }, { status: 500 });
  }
}
