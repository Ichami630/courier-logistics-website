import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination, Autoplay } from 'swiper/modules';

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: 'John Doe',
      role: 'Entrepreneur',
      image: 'https://img.daisyui.com/images/stock/photo-1625726411847-8cbb60cc71e6.webp',
      feedback:
        'This courier service is incredible! My packages are always delivered on time with utmost care.',
    },
    {
      id: 2,
      name: 'Jane Smith',
      role: 'Small Business Owner',
      image: 'https://img.daisyui.com/images/stock/photo-1609621838510-5ad474b7d25d.webp',
      feedback:
        'The customer service is excellent. They always respond quickly and ensure smooth delivery.',
    },
    {
      id: 3,
      name: 'David Wilson',
      role: 'Frequent Shipper',
      image: 'https://img.daisyui.com/images/stock/photo-1414694762283-acccc27bca85.webp',
      feedback:
        'Reliable and efficient! I highly recommend their services to anyone looking for a trustworthy courier.',
    },
  ];

  return (
    <div className="bg-gray-100 py-12">
      <div className="container mx-auto px-5 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">What Our Clients Say</h2>
        <Swiper
          modules={[Pagination, Autoplay]}
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000 }}
          loop={true}
          className="max-w-4xl mx-auto"
          spaceBetween={30}
        >
          {testimonials.map((testimonial) => (
            <SwiperSlide key={testimonial.id}>
              <div className="bg-white shadow-lg p-6 rounded-lg flex flex-col items-center">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-20 h-20 rounded-full mb-4"
                />
                <p className="text-gray-600 italic mb-4">"{testimonial.feedback}"</p>
                <h4 className="font-semibold text-gray-800">{testimonial.name}</h4>
                <p className="text-sm text-gray-500">{testimonial.role}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Testimonials;
