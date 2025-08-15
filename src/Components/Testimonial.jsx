import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { motion } from "framer-motion";

const Testimonial = () => {
    const reviews = [
        {
            id: 1,
            name: "রহিম উদ্দিন",
            image: "https://i.pravatar.cc/150?img=1",
            comment:
                "প্রফিটনেস্ট সত্যিই অসাধারণ! আমি প্রতিদিন আয় করছি এবং সাপোর্ট টিম খুব দ্রুত সাড়া দেয়।",
            date: "১৪ আগস্ট ২০২৫",
            time: "১০:৩০ AM",
        },
        {
            id: 2,
            name: "সাবিনা আক্তার",
            image: "https://i.pravatar.cc/150?img=2",
            comment:
                "আমি প্রিমিয়াম প্যাকেজ নিয়েছি এবং আয় শুরু হয়ে গেছে। প্ল্যাটফর্মটি একদম ইউজার-ফ্রেন্ডলি।",
            date: "১৩ আগস্ট ২০২৫",
            time: "৪:১৫ PM",
        },
        {
            id: 3,
            name: "মো: আরিফুল ইসলাম",
            image: "https://i.pravatar.cc/150?img=3",
            comment:
                "ভিআইপি প্যাকেজ সত্যিই সেরা! প্রতিদিনের ইনকাম দেখে আমি খুবই খুশি।",
            date: "১২ আগস্ট ২০২৫",
            time: "৮:০০ PM",
        },
    ];

    return (
        <div className="w-full mx-auto  py-10 bg-gradient-to-r from-green-600 via-emerald-500 to-lime-500 h-full rounded-lg">
            {/* শিরোনাম */}
            <h2 className="text-3xl font-bold text-center text-white mb-6">
                আমাদের ব্যবহারকারীদের মতামত
            </h2>

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
                modules={[Autoplay, Pagination]}
                className="pb-10"
            >
                {reviews.map((review) => (
                    <SwiperSlide key={review.id}>
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            whileHover={{ scale: 1.03 }}
                            transition={{ duration: 0.4 }}
                            className="w-11/12 mx-auto bg-white rounded-2xl shadow-lg p-6 border border-green-100"
                        >
                            {/* ছবি এবং নাম */}
                            <div className="flex items-center gap-4 mb-4">
                                <img
                                    src={review.image}
                                    alt={review.name}
                                    className="w-16 h-16 rounded-full border-2 border-green-500 object-cover"
                                />
                                <div>
                                    <h3 className="text-lg font-bold text-gray-800">
                                        {review.name}
                                    </h3>
                                    <p className="text-sm text-gray-500">
                                        {review.date} • {review.time}
                                    </p>
                                </div>
                            </div>

                            {/* মন্তব্য */}
                            <p className="text-gray-700 leading-relaxed italic">
                                “{review.comment}”
                            </p>
                        </motion.div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default Testimonial;
