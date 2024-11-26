'use client';
import Image from 'next/image';
import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Plus } from 'lucide-react';

const faqs = [
  {
    question: 'What is included in the tour packages?',
    answer:
      'Our tour packages include accommodation, guided tours, transportation, and most meals. Specific inclusions vary by package, so please check the details for each tour.',
  },
  {
    question: 'How do I book a tour with Tourism?',
    answer:
      'You can book a tour through our website by selecting your desired package, choosing your travel dates, and completing the booking process. Alternatively, you can contact our customer support for assistance.',
  },
  {
    question: 'Do I need to pay a deposit?',
    answer:
      'Yes, a deposit is required to confirm your booking. The exact amount will depend on the package and will be clearly mentioned during the booking process.',
  },
  {
    question: 'Can I customize my tour itinerary?',
    answer:
      'Absolutely! We offer customizable tour packages to meet your preferences. Contact our support team to discuss your requirements and make changes to your itinerary.',
  },
  {
    question: 'What should I pack for my tour?',
    answer:
      'We recommend packing comfortable clothing, sturdy shoes, personal hygiene items, travel documents, and any medication you may need. For specific destinations, check our packing guide for climate-related suggestions.',
  },
  {
    question: 'What happens if I need to cancel or change my booking?',
    answer:
      'If you need to cancel or modify your booking, please contact us as soon as possible. Cancellation and change policies vary by package and timing, so review our terms or contact support for details.',
  },
];

const TourismSupport = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleClick = (index) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div className="mt-12 pt-12">
      <div className="flex justify-between flex-col md:flex-row max-w-[1280px] mx-auto gap-16">
        <div style={{ flex: 1 }}>
          <Image
            src="https://i.ibb.co/9Zk5qRD/full-shot-silhouettes-people-jumping-sunset-1.jpg"
            alt="Tourism view"
            width={600}
            height={900}
            style={{ width: '100%', height: '80%', objectFit: 'cover', borderTopRightRadius: '20%' }}
          />
        </div>

        <div style={{ flex: 1.5, }}>
          <h2 className="text-4xl lg:text-5xl font-extrabold leading-tight text-black mb-4" >
            FAQs
          </h2>
          <h1 className='text-xl text-sky-500'>Tourism Support</h1>
          <div
            className="h-fit border rounded-lg p-2 "
            style={{ marginTop: '20px' }}
          >
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                className={`overflow-hidden ${index !== faqs.length - 1 ? 'border-b' : ''}`}
                onClick={() => handleClick(index)}
              >
                <button
                  className={`p-3 px-2 w-full cursor-pointer text-md items-center transition-all font-thin  text-black flex gap-2`}
                >
                  <Plus
                    className={`${
                      activeIndex === index ? 'rotate-45' : 'rotate-0'
                    } transition-transform ease-in-out w-5 h-5  text-gray-900`}
                  />
                  {faq.question}
                </button>
                <AnimatePresence mode="sync">
                  {activeIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{
                        duration: 0.3,
                        ease: 'easeInOut',
                        delay: 0.14,
                      }}
                    >
                      <p
                        className={` text-gray-900 p-3 text-sm font-thin text-justify pt-0`}
                        style={{ width: '90%' }}
                      >
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourismSupport;
