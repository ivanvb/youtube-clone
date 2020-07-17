import React from 'react';

const Heading1 = ({ className, children }) => {
    return <h1 className={`${className} text-2xl font-bold`}>{children}</h1>;
};

export default Heading1;
