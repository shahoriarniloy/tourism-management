import { NextResponse } from 'next/server';
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
    try {
        const { amount, email } = await req.json();

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: 'Room Booking',
                        },
                        unit_amount: amount * 100, 
                    },
                    quantity: 1,
                },
            ],
            customer_email: email,
            mode: 'payment',
            success_url: `${process.env.NEXT_PUBLIC_API_URL}/resorts`,
            cancel_url: `${process.env.NEXT_PUBLIC_API_URL}/`,
        });

        return NextResponse.json({ id: session.id });
    } catch (error) {
        console.error('Error creating Stripe session:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
