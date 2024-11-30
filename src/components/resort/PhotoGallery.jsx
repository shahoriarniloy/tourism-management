import React from 'react';
import TitleSection from './TitleSection';
import Image from 'next/image';

const PhotoGallery = () => {
    return (
        <section className="pt-12 lg:mx-24  lg:px-4 px-2">
            <div className="text-center mb-8 ">
                <TitleSection mainHeader={"EXCITING GALLERY"} subHeader={"Explore Unforgettable Experiences"} />
            </div>
            <div className="container grid grid-cols-2 gap-4 mx-auto md:grid-cols-4  ">
                <Image width={600} height={600} src={"https://i.ibb.co.com/F5tTtdq/Sunset-Beach-Resort.jpg"} alt="" className="w-full h-full col-span-2 row-span-2 rounded shadow-sm min-h-96 md:col-start-3 md:row-start-1 dark:bg-gray-500 aspect-square" data-aos="fade-up" data-aos-duration="3000" />

                <Image width={600} height={600} alt="" className="w-full h-full rounded shadow-sm min-h-48 dark:bg-gray-500 aspect-square" src={"https://i.ibb.co.com/MMKP16Z/Mountain-Retreat.jpg"} />
                <Image width={600} height={600} alt="" className="w-full h-full rounded shadow-sm min-h-48 dark:bg-gray-500 aspect-square" src={"https://i.ibb.co.com/z7KmBDX/Tropical-Oasis.jpg"} />
                <Image width={600} height={600} alt="" className="w-full h-full rounded shadow-sm min-h-48 dark:bg-gray-500 aspect-square" src={"https://i.ibb.co.com/DGm7XHP/Island-Escape-Resort.jpg"} />
                <Image width={600} height={600} alt="" className="w-full h-full rounded shadow-sm min-h-48 dark:bg-gray-500 aspect-square" src={"https://i.ibb.co.com/xjgb6J1/Desert-Mirage-Resort.jpg"} />
                <Image width={600} height={600} alt="" className="w-full h-full rounded shadow-sm min-h-48 dark:bg-gray-500 aspect-square" src={"https://i.ibb.co.com/k34tstD/Infinity-Pool.webp"} />
                <Image width={600} height={600} alt="" className="w-full h-full rounded shadow-sm min-h-48 dark:bg-gray-500 aspect-square" src={"https://i.ibb.co.com/W52Jqpw/restaurant-juice-bar.jpg"} />
                <Image width={600} height={600} alt="" className="w-full h-full rounded shadow-sm min-h-48 dark:bg-gray-500 aspect-square" src={"https://i.ibb.co.com/7KKBxs2/Spa-Wellness.jpg"} />
                <Image width={600} height={600} alt="" className="w-full h-full rounded shadow-sm min-h-48 dark:bg-gray-500 aspect-square" src={"https://i.ibb.co.com/MMKP16Z/Mountain-Retreat.jpg"} />
                <Image width={600} height={600} src={"https://i.ibb.co.com/T40W0KB/Savannah-Hills-Resort.jpg"} alt="" className="w-full h-full col-span-2 row-span-2 rounded shadow-sm min-h-96 md:col-start-1 md:row-start-3 dark:bg-gray-500 aspect-square" />

            </div>

        </section>
    );
};

export default PhotoGallery;