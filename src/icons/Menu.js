import React from 'react';

const Menu = ({ className }) => {
    return (
        <svg
            className={`${className || ''} fill-current`}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
        >
            <g>
                <path d="M3 8V6H21V8H3ZM3 13H21V11H3V13ZM3 18H21V16H3V18Z" />
            </g>
        </svg>
    );
};

export default Menu;
