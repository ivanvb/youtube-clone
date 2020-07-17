import React, { useState } from 'react';
import Navbar from '../Navbar/index';
import Sidenav from '../Sidenav/index';

const Home = ({ children }) => {
    const [open, setOpen] = useState(false);

    return (
        <div className="relative w-full h-full">
            <Navbar />
            <div
                className="fixed left-0 ml-4 block md:hidden mt-3 cursor-pointer z-30"
                onClick={() => {
                    setOpen((prev) => !prev);
                }}
            >
                X
            </div>
            <div className="flex h-full">
                <Sidenav isOpen={open} className="mt-12 bg-white shadow-md" />
                <div
                    className="w-full ml-auto md:w-10/12 h-full bg-white-100 pt-12"
                    onClick={() => {
                        if (open) {
                            setOpen(false);
                        }
                    }}
                >
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Home;
