import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const Nav = () => {
    const [isOpen, setIsOpen] = useState(false);

    const menuVariants = {
        hidden: { y: -80, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } }
    };

    const mobileMenuVariants = {
        hidden: { opacity: 0, y: -20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
        exit: { opacity: 0, y: -20, transition: { duration: 0.2 } }
    };

    return (
        <motion.nav
            className="bg-white shadow-md fixed top-0 left-0 w-full z-50"
            variants={menuVariants}
            initial="hidden"
            animate="visible"
        >
            <div className="container mx-auto flex justify-between items-center py-4 px-6">
                {/* লোগো */}
                <motion.h1
                    className="text-2xl font-bold text-green-700"
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    প্রফিট<span className="text-yellow-500">নেস্ট</span>
                </motion.h1>

                {/* ডেস্কটপ মেনু */}
                <ul className="hidden md:flex space-x-8 text-gray-700 font-medium">
                    {["হোম", "প্যাকেজ", "ডিপোজিট", "উইথড্র", "যোগাযোগ"].map((item) => (
                        <motion.li
                            key={item}
                            whileHover={{ scale: 1.1, color: "#16a34a" }}
                            transition={{ type: "spring", stiffness: 200 }}
                        >
                            {item}
                        </motion.li>
                    ))}
                </ul>

                {/* ডেস্কটপ বাটন */}
                <div className="hidden md:flex space-x-4">
                    <Link
                        to={'/login'}
                        className="px-4 py-2 border border-green-600 text-green-600 rounded hover:bg-green-600 hover:text-white transition"
                    >
                        লগইন
                    </Link>
                    <Link
                        to={"/sign_up"}
                        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
                    >
                        সাইন আপ
                    </Link>
                </div>

                {/* মোবাইল মেনু আইকন */}
                <div className="md:hidden text-2xl text-gray-700 cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <FaTimes /> : <FaBars />}
                </div>
            </div>

            {/* মোবাইল মেনু */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="md:hidden bg-white shadow-lg"
                        variants={mobileMenuVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                    >
                        <ul className="flex flex-col items-center space-y-4 py-4 text-gray-700 font-medium">
                            {["হোম", "প্যাকেজ", "ডিপোজিট", "উইথড্র", "যোগাযোগ"].map((item) => (
                                <motion.li
                                    key={item}
                                    whileHover={{ scale: 1.1, color: "#16a34a" }}
                                    transition={{ type: "spring", stiffness: 200 }}
                                >
                                    {item}
                                </motion.li>
                            ))}
                            <div className="flex space-x-4 pt-4">
                                <Link
                                    to={"/login"}
                                    className="px-4 py-2 border border-green-600 text-green-600 rounded hover:bg-green-600 hover:text-white transition"
                                >
                                    লগইন
                                </Link>
                                <Link
                                    to={"/sign_up"}
                                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
                                >
                                    সাইন আপ
                                </Link>
                            </div>
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
};

export default Nav;
