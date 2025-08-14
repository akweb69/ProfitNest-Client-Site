import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { FaGoogle, FaUser, FaPhone, FaEnvelope, FaLock } from "react-icons/fa";
import axios from "axios";

import toast from "react-hot-toast";
import useAppContext from "../Context/useAppContext";
import { updateProfile } from "firebase/auth";
import useUsersData from "../Hooks/useUsersData";

const Sign_Up = () => {
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const { signUp, setUser, googleLogin } = useAppContext();
    const [loading, setLoading] = useState(false)
    const { data, refetch, isPending } = useUsersData()
    const [isNavigate, setIsNavigate] = useState(false)
    const navigate = useNavigate()
    if (isNavigate) {
        navigate("/home")
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        const { name, phone, email, password, confirmPassword } = formData;

        if (!name || !phone || !email || !password || !confirmPassword) {
            toast.error("সব ফিল্ড পূরণ করুন!");
            return;
        }

        // ফোন নম্বর ১১ ডিজিটের কিনা চেক
        if (!/^\d{11}$/.test(phone)) {
            toast.error("ফোন নম্বর অবশ্যই ১১ ডিজিটের হতে হবে!");
            return;
        }

        if (password !== confirmPassword) {
            toast.error("পাসওয়ার্ড মিলছে না!");
            return;
        }

        try {
            setLoading(true);

            const userCredential = await signUp(email, password);
            const user = userCredential.user;

            await updateProfile(user, {
                displayName: name,
            });

            setUser(user);
            // update database userdata--->
            const refferCode = Math.floor(Math.random() * 100000);
            const newUserData = {
                name,
                phone,
                email,
                password,
                package: [],
                balance: 300,
                income: 0,
                refferCode,
                level_1: [],
                level_2: [],
                reffer_income: 0,
                my_reffer_users: [],
                total_deposit: 0,
                total_withdraw: 0,
            };

            axios.post("http://localhost:5000/add_new_user", newUserData)
                .then(res => {
                    const data = res.data;
                    console.log(data);
                })
                .catch(error => {
                    toast.error("রেজিস্ট্রেশনে সমস্যা হয়েছে! অন্য ইমেইল ব্যাবহার করুন এই ইমেইলে রেজিস্টার করা আছে !");
                });

            toast.success("সফলভাবে রেজিস্ট্রেশন সম্পন্ন হয়েছে!");
            setIsNavigate(true)
        } catch (error) {
            toast.error("রেজিস্ট্রেশনে সমস্যা হয়েছে! অন্য ইমেইল ব্যাবহার করুন এই ইমেইলে রেজিস্টার করা আছে !");
        } finally {
            setLoading(false);
        }

        console.log(formData);
    };

    const handleLoginWithGoogle = async () => {
        try {
            setLoading(true);

            // Google sign-in popup
            const result = await googleLogin();
            const user = result.user;
            setUser(user);

            // User data তৈরি করলাম, যেটা ডাটাবেজে পাঠাবো
            const refferCode = Math.floor(Math.random() * 100000);
            const newUserData = {
                name: user?.displayName || "",
                phone: "",
                email: user?.email || "",
                password: "",
                package: [],
                balance: 300,
                income: 0,
                refferCode,
                level_1: [],
                level_2: [],
                reffer_income: 0,
                my_reffer_users: [],
                total_deposit: 0,
                total_withdraw: 0,
            };

            // ধরলাম তোমার কাছে ইউজার লিস্ট আছে 'data' নামের অ্যারে তে, আর 'isPending' লোডিং স্টেট
            if (!isPending && Array.isArray(data)) {
                const findUser = data.find(item => item.email === user.email);
                if (!findUser) {
                    await axios.post("http://localhost:5000/add_new_user", newUserData);
                    toast.success("নতুন ইউজার রেজিস্ট্রেশন সম্পন্ন হয়েছে!");
                    setIsNavigate(true)
                } else {
                    toast.success("গুগল দিয়ে সফলভাবে লগইন হয়েছে!");
                    setIsNavigate(true)
                }
            } else {
                // যদি data না থাকে বা isPending সত্য হয়, তাহলে সরাসরি লগইন সফল বার্তা দেখানো যাবে
                toast.success("গুগল দিয়ে সফলভাবে লগইন হয়েছে!");
                setIsNavigate('/home')
            }

        } catch (error) {
            toast.error("গুগল লগইনে সমস্যা হয়েছে!");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col-reverse md:flex-row ">
            {/* বাম পাশ - সাইন আপ ফর্ম */}
            <div className="flex-1 flex justify-center items-center bg-white p-8 shadow-lg">
                <motion.div
                    className="w-full max-w-md bg-white rounded-lg p-8"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">সাইন আপ করুন</h2>

                    <form onSubmit={handleSubmit}>
                        {/* পূর্ণ নাম */}
                        <div className="mb-4 relative">
                            <label className="block text-gray-700 mb-1">পুর্ণ নাম</label>
                            <div className="relative">
                                <FaUser className="absolute left-3 top-3 text-gray-400" />
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="আপনার পূর্ণ নাম লিখুন"
                                    className="w-full border border-gray-300 rounded pl-10 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                                    disabled={loading}
                                />
                            </div>
                        </div>

                        {/* ফোন নাম্বার */}
                        <div className="mb-4 relative">
                            <label className="block text-gray-700 mb-1">ফোন নাম্বার</label>
                            <div className="relative">
                                <FaPhone className="absolute left-3 top-3 text-gray-400" />
                                <input
                                    type="number"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="আপনার ফোন নাম্বার লিখুন"
                                    className="w-full border border-gray-300 rounded pl-10 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                                    disabled={loading}
                                />
                            </div>
                        </div>

                        {/* ইমেইল */}
                        <div className="mb-4 relative">
                            <label className="block text-gray-700 mb-1">ইমেইল</label>
                            <div className="relative">
                                <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="আপনার ইমেইল লিখুন"
                                    className="w-full border border-gray-300 rounded pl-10 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                                    disabled={loading}
                                />
                            </div>
                        </div>

                        {/* পাসওয়ার্ড */}
                        <div className="mb-4 relative">
                            <label className="block text-gray-700 mb-1">পাসওয়ার্ড</label>
                            <div className="relative">
                                <FaLock className="absolute left-3 top-3 text-gray-400" />
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="আপনার পাসওয়ার্ড লিখুন"
                                    className="w-full border border-gray-300 rounded pl-10 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                                    disabled={loading}
                                />
                            </div>
                        </div>

                        {/* পাসওয়ার্ড নিশ্চিত করুন */}
                        <div className="mb-6 relative">
                            <label className="block text-gray-700 mb-1">পাসওয়ার্ড নিশ্চিত করুন</label>
                            <div className="relative">
                                <FaLock className="absolute left-3 top-3 text-gray-400" />
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    placeholder="পাসওয়ার্ড আবার লিখুন"
                                    className="w-full border border-gray-300 rounded pl-10 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                                    disabled={loading}
                                />
                            </div>
                        </div>

                        {/* সাইন আপ বাটন */}
                        <button
                            type="submit"
                            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition mb-4 flex justify-center items-center"
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <span className="loading loading-bars loading-xs mr-2"></span> একাউন্ট তৈরি হচ্ছে...
                                </>
                            ) : (
                                "একাউন্ট তৈরি করুন"
                            )}
                        </button>
                    </form>

                    {/* গুগল দিয়ে সাইন আপ */}
                    <button
                        onClick={handleLoginWithGoogle}
                        className="w-full flex items-center justify-center border border-gray-300 py-2 rounded hover:bg-gray-100 transition mb-6"
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <span className="loading loading-bars loading-xs mr-2"></span> লগইন হচ্ছে...
                            </>
                        ) : (
                            <>
                                <FaGoogle className="mr-2 text-red-500" /> গুগল দিয়ে সাইন আপ
                            </>
                        )}
                    </button>


                    {/* ইতিমধ্যে একাউন্ট আছে? */}
                    <p className="text-center text-gray-600 text-sm">
                        ইতিমধ্যে একাউন্ট আছে?{" "}
                        <Link to="/" className="text-green-600 font-semibold hover:underline">
                            লগইন করুন
                        </Link>
                    </p>
                </motion.div>
            </div>

            {/* ডান পাশ - ওয়েবসাইট সম্পর্কে তথ্য */}
            <div className="flex-1 bg-green-50 flex flex-col justify-center items-center p-8">
                <motion.h1
                    className="text-4xl font-bold text-green-700 mb-4 text-center md:text-left"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    আজই <span className="text-yellow-500">ProfitNest</span>-এ যোগ দিন!
                </motion.h1>
                <motion.p
                    className="text-gray-600 max-w-md text-center"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    আমাদের সাথে যুক্ত হয়ে আপনার অনলাইন আয়ের যাত্রা শুরু করুন। নিরাপদ
                    লেনদেন, বিভিন্ন প্যাকেজ এবং নির্ভরযোগ্য সাপোর্ট — সবকিছু এক
                    প্ল্যাটফর্মে পাওয়া যাবে।
                </motion.p>
            </div>
        </div>
    );
};

export default Sign_Up;
