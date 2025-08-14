import React from "react";
import { motion } from "framer-motion";
import { FaCrown, FaMoneyBillWave, FaClock, FaGift } from "react-icons/fa";

const Packages = () => {
    const packages = [
        {
            id: "১",
            name: "স্টার্টার প্যাকেজ",
            price: "৳ 1,000",
            validity: "৩০ দিন",
            dailyIncome: "৳ ৫০",
            vip: true,
        },
        {
            id: "২",
            name: "বেসিক প্যাকেজ",
            price: "৳ 3,000",
            validity: "৩০ দিন",
            dailyIncome: "৳ ১৫০",
            vip: true,
        },
        {
            id: "৩",
            name: "প্রিমিয়াম প্যাকেজ",
            price: "৳ 5,000",
            validity: "৩০ দিন",
            dailyIncome: "৳ ৩০০",
            vip: true,
        },
        {
            id: "৪",
            name: "ভিআইপি গোল্ড প্যাকেজ",
            price: "৳ 10,000",
            validity: "৬০ দিন",
            dailyIncome: "৳ ৭০০",
            vip: true,
        },
        {
            id: "৫",
            name: "ডায়মন্ড প্যাকেজ",
            price: "৳ 20,000",
            validity: "৯০ দিন",
            dailyIncome: "৳ ১৫০০",
            vip: true,
        },
        {
            id: "৬",
            name: "প্লাটিনাম প্যাকেজ",
            price: "৳ 50,000",
            validity: "১৮০ দিন",
            dailyIncome: "৳ ৪০০০",
            vip: true,
        },
    ];

    return (
        <div className="w-11/12 mx-auto py-6">
            {/* heading */}
            <h1 className="text-3xl font-bold text-center text-green-700 mb-6">
                আমাদের প্যাকেজ সমূহ
            </h1>

            <div className="md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 space-y-4 md:space-y-0">
                {packages.map((pkg) => (
                    <motion.div
                        key={pkg.id}
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.4 }}
                        className="bg-white rounded-xl shadow-lg p-6 border border-green-100 relative overflow-hidden"
                    >
                        {/* VIP Badge */}
                        {pkg.vip && (
                            <div className="absolute top-3 right-3 bg-yellow-400 text-white px-3 py-1 rounded-full flex items-center text-sm font-bold shadow-md">
                                <FaCrown className="mr-1" /> ভিআইপি-{pkg.id}
                            </div>
                        )}

                        {/* Package Name */}
                        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2 mb-3">
                            <FaGift className="text-green-500" /> {pkg.name}
                        </h2>

                        {/* Price */}
                        <p className="text-2xl font-bold text-green-600 mb-2 flex items-center gap-2">
                            <FaMoneyBillWave /> {pkg.price}
                        </p>

                        {/* Validity */}
                        <p className="text-gray-600 mb-1 flex items-center gap-2">
                            <FaClock /> মেয়াদ: {pkg.validity}
                        </p>

                        {/* Daily Income */}
                        <p className="text-gray-600 mb-4 flex items-center gap-2">
                            💰 দৈনিক আয়: {pkg.dailyIncome}
                        </p>

                        {/* Buy Button */}
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
                        >
                            প্যাকেজ কিনুন
                        </motion.button>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default Packages;
