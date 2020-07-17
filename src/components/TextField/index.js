import React from 'react';

const TextField = ({ className, lines, ...rest }) => {
    return (
        <textarea
            className={`${className || ''} w-full border rounded py-2 px-3`}
            rows={lines}
            {...rest}
        />
    );
};

export default TextField;
