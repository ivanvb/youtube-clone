import React from 'react';

const Sidenav = ({ isOpen, className }) => {
    return (
        <nav
            className={`transform mt-8 pt-2 ${className} ${
                isOpen ? 'translate-x-0' : '-translate-x-full'
            } md:translate-x-0 fixed md:fixed h-full w-5/12 md:w-2/12 bg-white transition duration-500 transition-transform`}
        >
            <ul className="pl-6 text-sm">
                <li className="pt-2 cursor-pointer">Recent</li>
                <li className="pt-2 cursor-pointer">Subscriptions</li>
                <li className="pt-2 cursor-pointer">Liked Videos</li>
            </ul>
        </nav>
    );
};

export default Sidenav;
