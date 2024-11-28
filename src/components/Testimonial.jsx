import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Rating from "react-rating";
import { IoIosStarOutline, IoIosStar } from "react-icons/io";
import { FaQuoteLeft } from "react-icons/fa";
import Image from "next/image"; 
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { FreeMode, Pagination } from "swiper/modules";

const Testimonial = () => {
  const staticReviews = [
    {
      _id: "1",
      username: "Alice Johnson",
      photoURL:
        "https://i.ibb.co/P6RfpHT/stylish-default-user-profile-photo-avatar-vector-illustration-664995-353.jpg",
      feedback:
        "Absolutely loved the serene environment and cozy rooms. The booking process was smooth, and the staff were incredibly helpful!",
      rating: 5,
      createdAt: "2024-11-20T12:34:56Z",
    },
    {
      _id: "2",
      username: "Mark Rivera",
      photoURL:
        "https://i.ibb.co/P6RfpHT/stylish-default-user-profile-photo-avatar-vector-illustration-664995-353.jpg",
      feedback:
        "The resort exceeded my expectations! Amazing service and the location was breathtaking. Booking was seamless!",
      rating: 4.5,
      createdAt: "2024-11-18T15:22:11Z",
    },
    {
      _id: "3",
      username: "Sophia Lee",
      photoURL:
        "https://i.ibb.co/P6RfpHT/stylish-default-user-profile-photo-avatar-vector-illustration-664995-353.jpg",
      feedback:
        "An unforgettable experience! The resort had all the amenities I needed, and the tour website made it so easy to book.",
      rating: 5,
      createdAt: "2024-11-15T09:00:00Z",
    },
  ];

  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [slidesPerPage, setSlidesPerPage] = useState(3);

  const getBrowserWidth = () => {
    setScreenWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", getBrowserWidth);
    return () => window.removeEventListener("resize", getBrowserWidth);
  }, []);

  useEffect(() => {
    if (screenWidth <= 640) {
      setSlidesPerPage(1);
    } else if (screenWidth <= 768) {
      setSlidesPerPage(2);
    } else {
      setSlidesPerPage(3);
    }
  }, [screenWidth]);

  return (
    <div className="bg-gradient-to-r from-blue-50 to-blue-100 py-16">
      <div className="container mx-auto">
        <h1 className="text-3xl font-semibold mb-12 text-center text-gray-800">
          What Our Guests Are Saying
        </h1>

        <Swiper
          slidesPerView={slidesPerPage}
          spaceBetween={30}
          freeMode
          pagination={{ clickable: true }}
          modules={[FreeMode, Pagination]}
        >
          {staticReviews.map((review) => (
            <SwiperSlide key={review._id}>
              <div className="bg-white w-full p-8 rounded-md shadow-lg">
                <Rating
                  emptySymbol={<IoIosStarOutline className="text-3xl" />}
                  fullSymbol={<IoIosStar className="text-3xl text-[#FFAA00]" />}
                  readonly
                  placeholderRating={review.rating}
                />

                <p className="text-gray-600 mt-4 h-[90px] overflow-y-auto">
                  “{review.feedback}”
                </p>

                <div className="flex justify-between items-center mt-8">
                  <div className="flex items-center gap-4">
                    <Image
                      src={review.photoURL}
                      alt={review.username}
                      width={48}
                      height={48}
                      className="rounded-full"
                    />
                    <div>
                      <h1 className="font-bold text-gray-800">{review.username}</h1>
                      <p className="text-gray-500 text-sm">
                        {new Date(review.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                  <FaQuoteLeft className="text-4xl text-gray-300" />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Testimonial;
