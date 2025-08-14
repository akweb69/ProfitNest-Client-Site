import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// Import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

const Slider = () => {
    const progressCircle = useRef(null);
    const progressContent = useRef(null);

    const onAutoplayTimeLeft = (s, time, progress) => {
        progressCircle.current.style.setProperty('--progress', 1 - progress);
        progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
    };

    const slides = [
        {
            id: 1,
            title: "আর্থিক সাফল্যের যাত্রা শুরু করুন",
            desc: "ProfitNest আপনাকে নিরাপদ বিনিয়োগের সুযোগ দেয়।",
            img: "https://i.ibb.co.com/yB62hMv6/1742767061369.jpg"
        },
        {
            id: 2,
            title: "আপনার লাভ এখন হাতের মুঠোয়",
            desc: "সহজ পদ্ধতিতে উপার্জন শুরু করুন।",
            img: "https://i.ibb.co.com/NtbH4mt/2149714407.jpg"
        },
        {
            id: 3,
            title: "নিরাপদ ও বিশ্বস্ত প্ল্যাটফর্ম",
            desc: "আমরা আপনার অর্থের নিরাপত্তা নিশ্চিত করি।",
            img: "https://i.ibb.co.com/RhBMWXJ/m3.jpg"
        }
    ];

    return (
        <div className="w-full p-4">
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                onAutoplayTimeLeft={onAutoplayTimeLeft}
                className="rounded-lg overflow-hidden"
            >
                {slides.map((slide) => (
                    <SwiperSlide key={slide.id}>
                        <div className="relative w-full h-[400px]">
                            <img
                                src={slide.img}
                                alt={slide.title}
                                className="w-full h-full object-cover"
                            />
                            {/* Overlay */}
                            <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-center text-white px-4">
                                <h2 className="text-3xl font-bold mb-2">{slide.title}</h2>
                                <p className="text-lg">{slide.desc}</p>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}

                {/* Autoplay progress indicator */}
                <div
                    className="autoplay-progress absolute bottom-4 right-4 bg-white p-2 rounded-full shadow-lg"
                    slot="container-end"
                >
                    <svg
                        className="w-10 h-10 text-green-500"
                        viewBox="0 0 48 48"
                        ref={progressCircle}
                    >
                        <circle
                            cx="24"
                            cy="24"
                            r="20"
                            stroke="currentColor"
                            strokeWidth="4"
                            fill="none"
                            strokeDasharray="125.6"
                            strokeDashoffset={`calc(125.6 * var(--progress))`}
                            style={{ transition: 'stroke-dashoffset 0.3s linear' }}
                        ></circle>
                    </svg>
                    <span
                        ref={progressContent}
                        className="absolute inset-0 flex justify-center items-center text-xs font-bold"
                    ></span>
                </div>
            </Swiper>
        </div>
    );
};

export default Slider;
