
const Headline = () => {
    return (
        <div className="bg-green-50 border border-green-200 shadow-sm py-2 mt-2 ">
            <div className=" flex items-center w-11/12 mx-auto">
                {/* Notice Button */}
                <span className="bg-red-500 text-white px-4 py-1 rounded-full text-sm font-semibold mr-4 shadow-md">
                    নোটিশ
                </span>

                {/* Marquee Text */}
                <marquee
                    behavior="scroll"
                    direction="left"
                    scrollamount="4"
                    className="text-gray-700 font-medium"
                >
                    📢 প্রফিটনেস্ট-এ স্বাগতম! আজই আপনার অ্যাকাউন্ট খুলুন এবং আয়ের যাত্রা শুরু করুন। 🔥
                    প্রতিদিনের লগইন বোনাস উপভোগ করুন এবং নতুন বন্ধুদের রেফার করে আয় বাড়ান।
                    💰 নিরাপদ ডিপোজিট ও দ্রুত উইথড্র সেবা পাচ্ছেন ২৪/৭।
                </marquee>
            </div>
        </div>
    );
};

export default Headline;
