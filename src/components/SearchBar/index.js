import React from 'react';

const SearchBar = ({ className }) => {
    return <input className={`w-full border p-1 px-3 rounded ${className}`} placeholder="Search" />;
};

export default SearchBar;
