import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Clock = () => {
    const [now, setNow] = useState(new Date());

    useEffect(() => {
        const id = setInterval(() => setNow(new Date()), 1000);
        return () => clearInterval(id);
    }, []);

    // বাংলা লোকেলে সময় ও তারিখ
    const timeBn = now.toLocaleTimeString("bn-BD", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
    });

    const dateBn = now.toLocaleDateString("bn-BD", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    // শুভেচ্ছা
    const hour = now.getHours();
    const greeting =
        hour < 5
            ? "শুভ গভীর রাত"
            : hour < 12
                ? "শুভ সকাল"
                : hour < 17
                    ? "শুভ বিকাল"
                    : hour < 20
                        ? "শুভ সন্ধ্যা"
                        : "শুভ রাত্রি";

    return (
        <div className="w-full flex items-center justify-center py-10 px-4">
            <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full"
            >
                <div className="relative overflow-hidden rounded-2xl shadow-xl">
                    {/* ব্যাকড্রপ গ্রেডিয়েন্ট */}
                    <div className="absolute inset-0 bg-gradient-to-r from-green-600 via-emerald-500 to-lime-500 opacity-90" />
                    {/* গ্লাস কার্ড */}
                    <div className="relative bg-white/10 backdrop-blur-md p-6 sm:p-8">
                        {/* হেডার */}
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-white/90 text-lg sm:text-xl font-semibold tracking-wide">
                                ডিজিটাল ঘড়ি
                            </h2>
                            <span className="text-white/80 text-xs sm:text-sm px-2 py-1 rounded-full bg-white/10 border border-white/20">
                                {greeting}
                            </span>
                        </div>

                        {/* সময় */}
                        <div className="text-center mb-3 sm:mb-4">
                            <motion.div
                                key={timeBn}
                                initial={{ scale: 0.98, opacity: 0.8 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ duration: 0.2 }}
                                className="font-mono tracking-widest"
                            >
                                <span className="block text-4xl sm:text-5xl md:text-6xl font-bold text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.35)]">
                                    {timeBn}
                                </span>
                            </motion.div>
                        </div>

                        {/* তারিখ */}
                        <div className="text-center">
                            <span className="inline-block text-white/90 text-sm sm:text-base px-3 py-1 rounded-full bg-white/10 border border-white/20">
                                {dateBn}
                            </span>
                        </div>

                        {/* ফুটার ডেকরেশন */}
                        <div className="mt-6">
                            <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: "0%" }}
                                    animate={{ width: "100%" }}
                                    transition={{ duration: 1.2, repeat: Infinity }}
                                    className="h-full bg-white/60"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Clock;
