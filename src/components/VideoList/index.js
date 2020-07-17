import React from 'react';
import FeedVideo from '../FeedVideo/index';

const VideoList = ({ videos, className }) => {
    return (
        <div className={`${className}`}>
            {videos.map((video, i) => (
                <>
                    <FeedVideo {...video} key={i} />
                    {i < videos.length - 1 ? <hr className="my-4"></hr> : ''}
                </>
            ))}
        </div>
    );
};

export default VideoList;
