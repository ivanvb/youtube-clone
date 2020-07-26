import React from 'react';
import SearchBar from '../SearchBar/index';
import { Link } from 'react-router-dom';
import AppLogo from '../../assets/app-logo.svg';
import UploadIcon from '../../icons/UploadIcon';
import { useSelector } from 'react-redux';

const Navbar = () => {
    const user = useSelector((state) => state.user);
    console.log(user.data.imageUrl);
    return (
        <nav className="fixed flex justify-between items-center w-full bg-white pr-2 pl-8 md:pr-10 md:pl-10 py-2 shadow z-20">
            <Link to="/">
                <img src={AppLogo} />
            </Link>
            <SearchBar className="mx-2 md:mx-12 lg:mx-32" />
            <ul className="flex">
                <Link to="/upload" className="mr-3">
                    <UploadIcon />
                </Link>
                <Link to="/profile" className="h-6 w-6 rounded-full overflow-hidden">
                    <img src={user.data.imageUrl} className="h-full w-full" />
                </Link>
            </ul>
        </nav>
    );
};

export default Navbar;
