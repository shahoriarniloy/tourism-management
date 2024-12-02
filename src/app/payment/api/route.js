import { NextResponse } from "next/server";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
    try {
        const { amount, email, roomId, packageId, checkInDate, checkOutDate } = await req.json();

        const successUrl = roomId
            ? `${process.env.NEXT_PUBLIC_API_URL}/paymentSuccess/roomBooking?session_id={CHECKOUT_SESSION_ID}&roomId=${roomId}`
            : `${process.env.NEXT_PUBLIC_API_URL}/paymentSuccess/packageBooking?session_id={CHECKOUT_SESSION_ID}&packageId=${packageId}`;
        const cancelUrl = `${process.env.NEXT_PUBLIC_API_URL}/`;

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: [
                {
                    price_data: {
                        currency: "usd",
                        product_data: {
                            name: "Room/Package Booking",
                            description: roomId || packageId,
                        },
                        unit_amount: amount * 100,
                    },
                    quantity: 1,
                },
            ],
            
            customer_email: email,
            mode: "payment",
            success_url: successUrl,
            cancel_url: cancelUrl,
            metadata: {
                checkInDate:checkInDate,
                checkOutDate:checkOutDate,
                
              },
              
        });
        console.log("Creating session with metadata:", {
            checkInDate,
            checkOutDate
          });

        return NextResponse.json({ id: session.id });
    } catch (error) {
        console.error("Error creating Stripe session:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
