import React from 'react';
import { Link } from 'react-router-dom';
import LikeIcon from '../../icons/LikeIcon';
import RecentIcon from '../../icons/RecentIcon';
import SubscriptionsIcon from '../../icons/SubscriptionsIcon';
import { useDispatch } from 'react-redux';
import { logOut } from '../../redux/user/user.actions';

const Sidenav = ({ isOpen, className }) => {
    const routes = [
        {
            name: 'Recent',
            link: '/',
            icon: <RecentIcon className="h-4 w-4" />,
        },
        {
            name: 'Subscriptions',
            link: '/',
            icon: <SubscriptionsIcon className="h-4 w-4" />,
        },
        {
            name: 'Liked Videos',
            link: '/',
            icon: <LikeIcon className="h-4 w-4" />,
        },
    ];

    const dispatch = useDispatch();

    function handleLogout() {
        dispatch(logOut());
    }
    return (
        <nav
            className={`transform mt-8 pt-2 ${className} ${
                isOpen ? 'translate-x-0' : '-translate-x-full'
            } md:translate-x-0 fixed md:fixed h-full w-5/12 md:w-2/12 bg-white transition duration-500 transition-transform z-10`}
        >
            <ul className="text-sm">
                {routes.map((route, i) => (
                    <li className="hover:bg-gray-200" key={i}>
                        <Link className="pl-4 py-2 flex items-center" to={route.link}>
                            {route.icon}
                            <span className="ml-2">{route.name}</span>
                        </Link>
                    </li>
                ))}
            </ul>
            <hr></hr>
            <ul className="text-sm">
                <li
                    className="hover:bg-gray-200 pl-4 py-2 flex items-center cursor-pointer"
                    onClick={handleLogout}
                >
                    <RecentIcon className="h-4 w-4" />
                    <span className="ml-2">Log Out</span>
                </li>
            </ul>
        </nav>
    );
};

export default Sidenav;
