import React from 'react';

const InputField = ({ placeholder, className, ...rest }) => {
    return (
        <input
            placeholder={placeholder}
            className={`py-2 px-3 border-2 rounded w-full ${className}`}
            {...rest}
        />
    );
};

export default InputField;
