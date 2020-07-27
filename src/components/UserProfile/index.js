import React from 'react';
import Button from '../Button/index';
import VideoList from '../VideoList/index';

const UserProfile = ({
    channelName,
    subscribers,
    subscribed,
    img,
    videos,
    bgColor,
    className,
    isLoggedUser,
}) => {
    return (
        <div className={className}>
            <div className="h-48 w-full flex px-3 md:px-8" style={{ backgroundColor: bgColor }}>
                <img src={img} alt={channelName} className="h-32 w-32 self-center rounded-full" />
                <div className="ml-6 md:ml-4 flex flex-wrap flex-col md:flex-row w-auto justify-center md:items-center flex-grow">
                    <div className="text-white mb-4">
                        <h1 className="text-xl font-bold">{channelName}</h1>
                        <span className="text-sm">{subscribers} subscribers</span>
                    </div>
                    <div
                        className={`ml-0 md:ml-auto md:self-center ${
                            isLoggedUser ? 'invisible' : ''
                        }`}
                    >
                        <span className="tracking-wider text-red-600 font-bold uppercase cursor-pointer">
                            {subscribed ? 'Subscribed' : 'Subscribe'}
                        </span>
                    </div>
                </div>
            </div>
            <div className="mt-4 px-8">
                <h2 className="font-bold text-xl pb-0 mb-4">Videos</h2>
                <VideoList videos={videos} />
            </div>
        </div>
    );
};

export default UserProfile;
