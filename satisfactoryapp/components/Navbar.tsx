"use client";

import Image from "next/image";

const Navbar: React.FC = () => {
        return (
                <nav className="w-full p-6" style={{ backgroundColor: '#333333', color: 'white' }}>
                        <div className="flex justify-between items-center">
                                <div className="w-1/4 max-w-[300px] h-auto relative">
                                        <Image
                                                src="/Title.png"
                                                alt="Title Image"
                                                layout="responsive"
                                                width={300}
                                                height={64}
                                                objectFit="contain"
                                        />
                                </div>
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
