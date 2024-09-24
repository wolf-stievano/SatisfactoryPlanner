"use client";

import { motion } from "framer-motion";

const Navbar: React.FC = () => {
        return (
                <nav className="w-full p-6" style={{ backgroundColor: '#333333', color: 'white' }}>
                        <div className="flex justify-between items-center">
                                <motion.h1
                                        initial={{ opacity: 0, y: -20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5 }}
                                        className="text-3xl font-bold"
                                >
                                        Satisfactory
                                </motion.h1>
                                <div className="flex items-center gap-5">
                                        <a
                                                className="font-medium text-white focus:outline-none hover:text-gray-300"
                                                href="#"
                                                aria-current="page"
                                        >
                                                Landing
                                        </a>
                                        <a
                                                className="font-medium text-white hover:text-gray-300 focus:outline-none"
                                                href="#"
                                        >
                                                Account
                                        </a>
                                        <a
                                                className="font-medium text-white hover:text-gray-300 focus:outline-none"
                                                href="#"
                                        >
                                                Work
                                        </a>
                                        <a
                                                className="font-medium text-white hover:text-gray-300 focus:outline-none"
                                                href="#"
                                        >
                                                Blog
                                        </a>
                                </div>
                        </div>
                </nav >
        );
};

export default Navbar
