import React from 'react';
import TitleSection from './TitleSection';
import Image from 'next/image';

const Facilities = () => {
    const facilities = [
        {
            image: "https://i.ibb.co.com/7KKBxs2/Spa-Wellness.jpg",
            name: "Spa-Wellness",
            description: "In a hotel, the spa and wellness facilities are where people go to exercise and have special treatments in order to improve their health. The spa and wellness facilities include a sauna and treatment rooms. The spa and wellness facilities include a sauna and gym."
        },
        {
            image: "https://i.ibb.co.com/k34tstD/Infinity-Pool.webp",
            name: "Infinity Pool ",
            description: "An infinity pool, also called infinity edge pool, zero edge pool, overflow pool or spillover pool, is a reflecting pool or swimming pool where the water flows over one or more edges, producing a visual effect of water with no boundary."
        },
        {
            image: "https://i.ibb.co.com/W52Jqpw/restaurant-juice-bar.jpg",
            name: "Restaurant & Juice Bar",
            description: "A juice bar refers to a small business that primarily sells a selection of different juice, which are usually freshly squeezed from a variety of fresh fruits and vegetables."
        }
    ];
    return (
        <section className="pt-12">
            <div className="text-center mb-8 px-4">
                <TitleSection mainHeader={"LUXARIOUS FECILITIES"} subHeader={"Explore Our Exclusive Resort Facilities"} />
            </div>

            <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 lg:px-16 md:px-8 px-4">
                {facilities.map((resort, index) => (

                    <div key={index} className="bg-white cursor-pointer rounded overflow-hidden shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] relative top-0 hover:-top-2 transition-all duration-300">
                        <Image width={600} height={600} src={resort.image} alt={resort.name} className="w-full h-[400px] object-cover" />
                        <div className="p-6">
                            <h3 className="text-xl font-bold text-gray-800">{resort.name}</h3>
                            <hr className="my-4" />
                            <p className="text-gray-400 text-sm">{resort.description}</p>
                        </div>
                    </div>


                ))}
            </div>
        </section>

    );
};

export default Facilities;




