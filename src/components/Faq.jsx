import Image from 'next/image';
import React from 'react';

const TourismSupport = () => {
  return (
    <div className="bg-bg-1 pt-12">
      <div className="flex justify-between flex-col md:flex-row max-w-[1280px] mx-auto gap-16">
        {/* Left Section: Image */}
        <div style={{ flex: 1 }}>
          <Image
            src="/images/faq.png"
            alt="Tourism view"
            width={1000}
            height={900}
            style={{ width: '100%', height: '80%', objectFit: 'cover', borderTopRightRadius: '20%' }}
          />
        </div>

        {/* Right Section: FAQ */}
        <div style={{ flex: 1.5, padding: '20px' }}>
          <h2 className="text-xl text-red-600" style={{ marginBottom: '10px' }}>
            FAQs
          </h2>
          <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#222' }}>Tourism Support</h1>
          <div style={{ marginTop: '20px' }}>
            {/* FAQ Items */}
            {[
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
            ].map((faq, index) => (
              <details key={index} style={{ marginBottom: '15px' }}>
                <summary
                  style={{
                    cursor: 'pointer',
                    fontSize: '18px',
                    fontWeight: '500',
                    padding: '10px',
                    borderRadius: '8px',
                  }}
                >
                  {faq.question}
                </summary>
                {faq.answer && (
                  <p style={{ marginTop: '10px', paddingLeft: '15px', color: '#555' }}>{faq.answer}</p>
                )}
              </details>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourismSupport;
