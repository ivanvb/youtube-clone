import React from 'react';

const Button = ({ children, className, ...rest }) => {
    return (
        <button
            className={`bg-red-600 hover:bg-red-700 focus:bg-red-700 py-2 px-3 font-bold text-white rounded w-full ${className}`}
            {...rest}
        >
            {children}
        </button>
    );
};

export default Button;
