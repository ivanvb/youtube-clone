import React from 'react';
import LobbySidePanel from '../LobbySidePanel/index';

const LobbyContainer = ({ Form }) => {
    return (
        <div className="md:flex h-full relative">
            <div className="md:w-2/5">
                <LobbySidePanel />
            </div>
            <div className="md:relative w-full md:w-3/5 px-8 md:px-20 pt-12">
                <Form />
            </div>
        </div>
    );
};

export default LobbyContainer;
