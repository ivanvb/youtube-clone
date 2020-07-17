import React, { useState } from 'react';
const metadata = {
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    channelImg: 'https://avatars1.githubusercontent.com/u/33399537?s=400&v=4',
    channelName: 'Channel 01',
    subscribers: 12,
    likes: 8,
    dislikes: 0,
    likeStatus: 'liked',
    description:
        'Proident tempor laborum exercitation aliquip sint aliquip fugiat. Dolor cillum qui consectetur commodo nisi enim id qui incididunt Lorem et tempor ex quis. Incididunt aliquip sit ea dolore tempor duis ea. Do nisi Lorem et sit commodo anim ad Lorem deserunt. Anim nisi est aliquip ea officia esse eiusmod sit enim. Quis cupidatat adipisicing culpa laborum. Pariatur tempor elit velit dolore duis. Laboris exercitation nulla ad commodo excepteur consequat exercitation dolore nostrud laborum proident dolore.',
};

const {
    videoUrl,
    channelImg,
    channelName,
    subscribers,
    likes,
    dislikes,
    likeStatus,
    description,
} = metadata;
const Video = () => {
    const [openDescription, setOpenDescription] = useState(false);
    return (
        <div className="px-2 md:px-16 mb-8">
            <video
                src={videoUrl}
                controls
                className="w-full h-48 md:h-96 h-64 mt-4 my-2 object-contain bg-black"
            />
            <div className="flex items-center mt-4">
                <img src={channelImg} className="h-16 w-16 rounded-full" />
                <div className="ml-4">
                    <h2 className="font-bold">{channelName}</h2>
                    <p className="text-xs">{subscribers} subscribers</p>
                    <p className="text-xs text-red-600 uppercase">Subscribe</p>
                </div>
                <div className="flex ml-auto">
                    <span className="mx-2">{likes} Likes</span>
                    <span className="mx-2">{dislikes} Dislikes</span>
                </div>
            </div>
            <h3 className="font-bold mt-4">Description</h3>
            <div className="mt-2">
                <p className={`${openDescription ? '' : 'clamp-2'} text-sm`}>{description}</p>
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
};

export default Video;
