import React from 'react';

const ProgressBar = ({ className = '', percentage = 0 }) => {
    return (
        <div
            className={`${className} progress-bar text-red-600 rounded-lg bg-gray-400 relative overflow-x-hidden`}
        >
            <div
                className="fill bg-red-600 h-full w-full rounded-lg transition-transform duration-300"
                style={{ transform: `translateX(-${100 - percentage}%)` }}
            ></div>
        </div>
    );
};

export default ProgressBar;
