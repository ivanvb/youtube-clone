import React from 'react';
import SearchBar from '../SearchBar/index';
import { Link } from 'react-router-dom';
import AppLogo from '../../assets/app-logo.svg';
import UploadIcon from '../../icons/UploadIcon';

const Navbar = () => {
    return (
        <nav className="fixed flex justify-between items-center w-full bg-white pr-2 pl-8 md:pr-10 md:pl-10 py-2 shadow z-20">
            <Link to="/">
                <img src={AppLogo} />
            </Link>
            <SearchBar className="mx-2 md:mx-12 lg:mx-32" />
            <ul className="flex">
                <Link to="/" className="mr-3">
                    <UploadIcon />
                </Link>
                <Link to="/profile" className="h-6 w-6 rounded-full overflow-hidden">
                    <img
                        src="https://avatars1.githubusercontent.com/u/33399537?s=400&v=4"
                        className="h-full w-full"
                    />
                </Link>
            </ul>
        </nav>
    );
};

export default Navbar;
