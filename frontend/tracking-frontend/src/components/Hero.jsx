import React from 'react';
import { NavLink } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

const Hero = () => {
  const slides = [
    {
      id: 1,
      image: 'https://img.daisyui.com/images/stock/photo-1625726411847-8cbb60cc71e6.webp',
      title: 'Fast and Reliable Deliveries',
      description: 'Delivering your packages safely and on time, every time.',
      cta1: 'Learn More',
      link: '/track'
    },
    {
      id: 2,
      image: 'https://img.daisyui.com/images/stock/photo-1609621838510-5ad474b7d25d.webp',
      title: 'Global Shipping Solutions',
      description: 'Reach anywhere in the world with our seamless shipping services.',
      cta1: 'Track Your Package',
      link: '/track'
    },
    {
      id: 3,
      image: 'https://img.daisyui.com/images/stock/photo-1414694762283-acccc27bca85.webp',
      title: 'Real-Time Package Tracking',
      description: 'Stay updated on your package\'s location at all times.',
      cta1: 'Track Now',
      link: '/track'
    },
  ];

  return (
    <div className="mt-14">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 10000 }}
        loop={true}
        className="w-full h-[300px]"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div
              className="relative w-full h-full"
              style={{
                backgroundImage: `url(${slide.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-white px-5 text-center">
                <h1 className="text-4xl font-bold">{slide.title}</h1>
                <p className="mt-3 text-lg">{slide.description}</p>
                <div className="mt-5">
                  <NavLink to={slide.link} className="bg-accent-100 rounded-md p-3">{slide.cta1}</NavLink>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Hero;
