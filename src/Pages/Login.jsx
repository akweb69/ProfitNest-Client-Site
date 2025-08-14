import { motion } from "framer-motion";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import useAppContext from "../Context/useAppContext";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [isNavigate, setIsNavigate] = useState(false)
    const navigate = useNavigate()
    if (isNavigate) {
        navigate("/home")
    }

    const { login, googleLogin, setUser } = useAppContext();

    // Handle normal login with email and password
    const handleLogin = async () => {
        if (!email || !password) {
            toast.error("ইমেইল এবং পাসওয়ার্ড সঠিকভাবে বসান");
            return;
        }
        try {
            setLoading(true);
            const userCredential = await login(email, password);
            const user = userCredential.user;
            setUser(user);
            toast.success("সফলভাবে লগইন হয়েছে!");
            setIsNavigate(true)
        } catch (error) {
            console.error(error);
            toast.error("লগইন করতে সমস্যা হয়েছে, দয়া করে সঠিক তথ্য দিন।");
        } finally {
            setLoading(false);
        }
    };

    // Handle login with Google
    const handleGoogleLogin = async () => {
        try {
            setLoading(true);
            const result = await googleLogin();
            const user = result.user;
            setUser(user);
            toast.success("গুগল দিয়ে সফলভাবে লগইন হয়েছে!");
            setIsNavigate(true)
        } catch (error) {
            console.error(error);
            toast.error("গুগল লগইনে সমস্যা হয়েছে!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col md:flex-row">
            {/* বাম পাশ - ওয়েবসাইট সম্পর্কে তথ্য */}
            <div className="flex-1 bg-green-50 flex flex-col justify-center items-center p-8">
                <motion.h1
                    className="text-4xl font-bold text-green-700 mb-4 text-center md:text-left"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    স্বাগতম <span className="text-yellow-500">ProfitNest</span>-এ
                </motion.h1>
                <motion.p
                    className="text-gray-600 max-w-md text-center"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    ProfitNest হলো একটি অনলাইন আয়ের প্ল্যাটফর্ম যেখানে আপনি বিভিন্ন প্যাকেজ কিনে লাভ অর্জন করতে পারবেন। আপনার আর্থিক যাত্রাকে আরও সহজ ও নিরাপদ করতে আমরা আছি আপনার সাথে।
                </motion.p>
            </div>

            {/* ডান পাশ - লগইন ফর্ম */}
            <div className="flex-1 flex justify-center items-center bg-white p-8 shadow-lg">
                <motion.div
                    className="w-full max-w-md bg-white rounded-lg p-8"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">লগইন করুন</h2>

                    {/* ইমেইল */}
                    <label className="block text-gray-700 mb-1">ইমেইল</label>
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        placeholder="আপনার ইমেইল লিখুন"
                        className="w-full border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-green-500"
                        disabled={loading}
                    />

                    {/* পাসওয়ার্ড */}
                    <label className="block text-gray-700 mb-1">পাসওয়ার্ড</label>
                    <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        placeholder="আপনার পাসওয়ার্ড লিখুন"
                        className="w-full border border-gray-300 rounded px-3 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                        disabled={loading}
                    />

                    {/* পাসওয়ার্ড ভুলে গেছেন? */}
                    <div className="text-right mb-4">
                        <Link to="/forgot-password" className="text-green-600 text-sm hover:underline">
                            পাসওয়ার্ড ভুলে গেছেন?
                        </Link>
                    </div>

                    {/* লগইন বাটন */}
                    <button
                        onClick={handleLogin}
                        className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition mb-4 flex justify-center items-center"
                        disabled={loading}
                    >
                        {loading ? "লগইন করা হচ্ছে..." : "লগইন"}
                    </button>

                    {/* গুগল দিয়ে লগইন */}
                    <button
                        onClick={handleGoogleLogin}
                        className="w-full flex items-center justify-center border border-gray-300 py-2 rounded hover:bg-gray-100 transition mb-6"
                        disabled={loading}
                    >
                        <FaGoogle className="mr-2 text-red-500" /> গুগল দিয়ে লগইন
                    </button>

                    {/* একাউন্ট নেই? */}
                    <p className="text-center text-gray-600 text-sm">
                        একাউন্ট নেই?{" "}
                        <Link to="/signup" className="text-green-600 font-semibold hover:underline">
                            সাইন আপ করুন
                        </Link>
                    </p>
                </motion.div>
            </div>
        </div>
    );
};

export default Login;
