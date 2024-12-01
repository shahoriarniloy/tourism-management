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
import Logo from "./Logo";

const Testimonial = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [slidesPerPage, setSlidesPerPage] = useState(3);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/about/api`
        );
        if (!resp.ok) {
          throw new Error("Failed to fetch testimonials");
        }
        const data = await resp.json();
        setTestimonials(data?.testimonials || []);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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

  if (loading) {
    return (
      <div className="h-screen w-full flex justify-center">
        <Logo />
      </div>
    );
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

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
          {testimonials.map((review) => (
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
