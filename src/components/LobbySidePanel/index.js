import React, { useState, useEffect } from 'react';
import words from '../../assets/words.json';
import { shuffleArray } from '../../util/index';

const shuffledWords = shuffleArray([...words]);

const LobbySidePanel = () => {
    const [position, setPosition] = useState(0);
    useEffect(() => {
        const interval = setInterval(() => {
            setPosition((prev) => (prev + 1) % words.length);
        }, 500);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="bg-gray-900 w-full h-0 md:h-full flex flex-col items-center justify-center">
            <h2 className="text-white font-bold -mb-4">See The Latest Videos About</h2>
            <p className="uppercase text-center text-white text-6xl font-black">
                {shuffledWords[position]}
            </p>
        </div>
    );
};

export default LobbySidePanel;
