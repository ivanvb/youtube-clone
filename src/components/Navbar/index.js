import React from 'react';
import SearchBar from '../SearchBar/index';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="fixed flex justify-between items-center w-full bg-white pr-2 pl-8 md:pr-10 md:pl-10 py-2 shadow z-20">
            <Link to="/">Logo</Link>
            <SearchBar className="mx-2 md:mx-12 lg:mx-32" />
            <ul className="flex">
                <li className="mx-2">U</li>
                <li className="mx-2">P</li>
            </ul>
        </nav>
    );
};

export default Navbar;
