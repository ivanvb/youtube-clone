import React from 'react';

const DeleteIcon = ({ className }) => {
    return (
        <svg viewBox="0 0 24 24" className={`${className || ''} fill-current`}>
            <g>
                <path d="M14.5 3H9.5L8.5 4H5V6H19V4H15.5L14.5 3ZM16 9V19H8V9H16ZM6 7H18V19C18 20.1 17.1 21 16 21H8C6.90002 21 6 20.1 6 19V7Z" />
            </g>
        </svg>
    );
};

export default DeleteIcon;
