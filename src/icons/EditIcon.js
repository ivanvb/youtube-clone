import React from 'react';

const EditIcon = ({ className }) => {
    return (
        <svg className={`${className || ''} fill-current`} viewBox="0 0 24 24">
            <g id="create_24px">
                <path d="M18.3687 3.29001L20.7087 5.63C21.0988 6.01999 21.0988 6.64999 20.7087 7.04001L18.8788 8.87L15.1288 5.12L16.9587 3.29001C17.1487 3.10001 17.3987 3 17.6588 3C17.9188 3 18.1688 3.09 18.3687 3.29001ZM2.99875 17.25V21H6.74875L17.8087 9.94L14.0587 6.19L2.99875 17.25ZM5.91876 19H4.99875V18.08L14.0587 9.01999L14.9788 9.94L5.91876 19Z" />
            </g>
        </svg>
    );
};

export default EditIcon;
