import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import LikeIcon from '../../icons/LikeIcon';
import useFetch from '../../hooks/useFetch';
import Loading from '../../components/Loading/index';

const Video = (props) => {
    const videoId = props.match.params.id;
    const [openDescription, setOpenDescription] = useState(false);
    const [quality, setQuality] = useState(360);
    const [video, videoIsLoading, videoError, videoUtils] = useFetch(
        `/api/get-video?id=${videoId}`
    );
    const [, , error, watchUtils] = useFetch(`/api/watch-video`);

    useEffect(() => {
        videoUtils.start();
        watchUtils.start({
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: videoId }),
        });
    }, []);

    if (videoIsLoading || video === null) {
        return <Loading />;
    } else {
        return (
            <div className="px-2 md:px-16 mb-8">
                <video
                    src={`https://d864jpdslrchw.cloudfront.net/${videoId}/${quality}p.mp4`}
                    controls
                    className="w-full h-48 md:h-96 mt-4 my-2 object-contain bg-black"
                />
                <h1 className="font-bold mb-2 text-xl">{video.title}</h1>
                <div className="flex items-center mt-4">
                    <Link to={`/profile/${video.uploadingUser.username}`}>
                        <img
                            src={video.uploadingUser.imageUrl}
                            className="h-16 w-16 rounded-full"
                        />
                    </Link>
                    <div className="ml-4">
                        <h2 className="font-bold">{video.uploadingUser.username}</h2>
                        <p className="text-xs">{video.uploadingUser.subscribers} subscribers</p>
                        <p className="text-xs text-red-600 uppercase">Subscribe</p>
                    </div>
                    <div className="flex ml-auto text-sm">
                        <span className="mx-2 flex align-baseline">
                            <LikeIcon className="h-4 w-4 mt-1 mr-2" />
                            {video.likes}
                        </span>
                        <span className="mx-2 flex ml-auto text-sm">
                            <LikeIcon className="h-4 w-4 mt-1 mr-2 transform rotate-180" />
                            {video.dislikes}
                        </span>
                    </div>
                </div>
                <h3 className="font-bold mt-4">Description</h3>
                <div className="mt-2">
                    <p className={`${openDescription ? '' : 'clamp-2'} text-sm`}>
                        {video.description}
                    </p>
                    <p
                        className="text-center font-bold mt-4 cursor-pointer"
                        onClick={() => {
                            setOpenDescription((prev) => !prev);
                        }}
                    >
                        Show {openDescription ? 'less' : 'more'}
                    </p>
                </div>
            </div>
        );
    }
};

export default Video;
