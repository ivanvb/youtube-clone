import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import LikeIcon from '../../icons/LikeIcon';
import useFetch from '../../hooks/useFetch';
import Loading from '../../components/Loading/index';
import { getNetworkSpeed } from '../../util/index';
import { useSelector } from 'react-redux';

const networkSpeedMap = {
    '2g': 360,
    '3g': 480,
    '4g': 720,
};

const networkSpeed = getNetworkSpeed();

const Video = (props) => {
    const videoId = props.match.params.id;
    const [openDescription, setOpenDescription] = useState(false);
    const [quality, setQuality] = useState(networkSpeed ? networkSpeedMap[networkSpeed] : 360);
    const [playingTime, setPlayingTime] = useState(0);
    const videoElement = useRef();
    const user = useSelector((state) => state.user);

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

    useEffect(() => {
        if (videoElement.current) {
            videoElement.current.currentTime = playingTime || 0;
            videoElement.current.play();
        }
    }, [playingTime]);

    if (videoIsLoading || video === null) {
        return <Loading />;
    } else {
        return (
            <div className="px-2 md:px-16 mb-8">
                <video
                    src={`https://d864jpdslrchw.cloudfront.net/${videoId}/${quality}p.mp4`}
                    controls
                    className="w-full h-48 md:h-96 mt-4 my-2 object-contain bg-black"
                    ref={videoElement}
                />
                <div className="flex items-center">
                    <h1 className="font-bold mb-2 text-xl flex-grow">{video.title}</h1>
                    {[720, 480, 360].map((videoQuality, i) => {
                        return (
                            <React.Fragment key={i}>
                                <label htmlFor={`${videoQuality}p`}>{videoQuality}p</label>
                                <input
                                    checked={quality === videoQuality}
                                    className="mx-2"
                                    id={`${videoQuality}p`}
                                    type="radio"
                                    name="quality"
                                    onChange={(e) => {
                                        setQuality(videoQuality);
                                        setPlayingTime(videoElement.current.currentTime);
                                    }}
                                />
                            </React.Fragment>
                        );
                    })}
                </div>
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
                    <div className="flex flex-wrap ml-auto text-sm">
                        <span className="ml-2 w-full">{video.views} Views</span>
                        <span className="mx-2 flex align-baseline cursor-pointer">
                            <LikeIcon
                                className="h-4 w-4 mt-1 mr-2"
                                onClick={async (e) => {
                                    fetch('/api/handle-likes', {
                                        method: 'POST',
                                        headers: {
                                            'Content-Type': 'application/json',
                                        },
                                        body: JSON.stringify({
                                            action: 'like',
                                            user: user.data._id,
                                            video: videoId,
                                        }),
                                    });
                                }}
                            />
                            {video.likes}
                        </span>
                        <span className="mx-2 flex ml-4 lg:ml-auto text-sm cursor-pointer">
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
