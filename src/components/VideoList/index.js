import React from 'react';
import FeedVideo from '../FeedVideo/index';

const VideoList = ({ videos, className }) => {
    return (
        <div className={`${className}`}>
            {videos.map((video, i) => (
                <React.Fragment key={i}>
                    <FeedVideo {...video} />
                    {i < videos.length - 1 ? <hr className="my-4"></hr> : ''}
                </React.Fragment>
            ))}
        </div>
    );
};

export default VideoList;
