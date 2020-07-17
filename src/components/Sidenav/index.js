import React from 'react';
import { Link } from 'react-router-dom';

const Sidenav = ({ isOpen, className }) => {
    const routes = [
        {
            name: 'Recent',
            link: '/',
        },
        {
            name: 'Subscriptions',
            link: '/',
        },
        {
            name: 'Liked Videos',
            link: '/',
        },
    ];
    return (
        <nav
            className={`transform mt-8 pt-2 ${className} ${
                isOpen ? 'translate-x-0' : '-translate-x-full'
            } md:translate-x-0 fixed md:fixed h-full w-5/12 md:w-2/12 bg-white transition duration-500 transition-transform z-10`}
        >
            <ul className="text-sm">
                {routes.map((route, i) => (
                    <li className="py-2 hover:bg-gray-200" key={i}>
                        <Link className="pl-6 block" to={route.link}>
                            {route.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Sidenav;
