import React from 'react';
import { Link } from 'react-router-dom';
import { formatDuration, formatDate } from '../../util/index';
import { useSelector } from 'react-redux';
import DeleteIcon from '../../icons/DeleteIcon';
import EditIcon from '../../icons/EditIcon';

const FeedVideo = ({
    className,
    img,
    channelName,
    title,
    views,
    length,
    description,
    time,
    hideChannel,
    _id,
    uploadDate,
}) => {
    const user = useSelector((state) => state.user);
    return (
        <div className={`${className} relative w-full`}>
            {hideChannel ? (
                ''
            ) : (
                <Link to={`/profile/${channelName}`} className="flex items-center">
                    <img src={img} alt={channelName} className="h-10 w-10 rounded-full" />
                    <span className="ml-3 font-bold">{channelName}</span>
                </Link>
            )}
            <Link to={`/video/${_id}`} className={`flex ${hideChannel ? '' : 'mt-2'}`}>
                <div className="relative h-24 w-48 md:h-32 md:w-64">
                    <img
                        src={`https://d864jpdslrchw.cloudfront.net/${_id}/thumbnail-00001.png`}
                        alt={title}
                        className="h-24 w-48 md:h-32 md:w-64 object-cover"
                    />
                    <span className="absolute bottom-0 py-1 px-1 my-2 mx-2 bg-black text-white text-xs rounded-sm right-0 opacity-75">
                        {formatDuration(length)}
                    </span>
                </div>
                <div className="ml-3 w-8/12">
                    <h3>{title}</h3>
                    <p className="text-xs text-gray-700">
                        <span>{views} views</span> • <span>{channelName}</span> •{' '}
                        <span>{formatDate(uploadDate)}</span>
                    </p>
                    <p className="text-gray-700 text-xs clamp-2 mt-2">{description}</p>
                </div>
            </Link>
            {user.data.username === channelName && (
                <div className="flex absolute right-0 top-0 ">
                    <Link to={`/edit/${_id}`} className="mr-2">
                        <EditIcon className="h-6 w-6" />
                    </Link>
                    <button
                        onClick={() => {
                            fetch(`/api/delete-video?id=${_id}`, { method: 'DELETE' }).then(
                                alert('deleted')
                            );
                        }}
                    >
                        <DeleteIcon className="h-6 w-6" />
                    </button>
                </div>
            )}
        </div>
    );
};

export default FeedVideo;
