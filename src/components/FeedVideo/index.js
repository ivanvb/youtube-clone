import React from 'react';

const FeedVideo = ({
    className,
    img,
    channelName,
    title,
    views,
    time,
    description,
    duration,
    hideChannel,
}) => {
    return (
        <div className={`${className} relative`}>
            {hideChannel ? (
                ''
            ) : (
                <a href="#" className="flex items-center">
                    <img src={img} alt={channelName} className="h-10 w-10 rounded-full" />
                    <span className="ml-3 font-bold">{channelName}</span>
                </a>
            )}
            <a href="#" className="flex mt-2">
                <div className="relative h-24 w-48 md:h-32 md:w-64">
                    <img src={img} alt={title} className="h-24 w-48 md:h-32 md:w-64 object-cover" />
                    <span className="absolute bottom-0 py-1 px-1 my-2 mx-2 bg-black text-white text-xs rounded-sm right-0 opacity-75">
                        {duration}
                    </span>
                </div>
                <div className="ml-3 w-8/12">
                    <h3>{title}</h3>
                    <p className="text-xs text-gray-700">
                        <span>{views} views</span> • <span>{channelName}</span> •{' '}
                        <span>{time}</span>
                    </p>
                    <p className="text-gray-700 text-xs clamp-2 mt-2">{description}</p>
                </div>
            </a>
        </div>
    );
};

export default FeedVideo;
