import React, { useEffect } from 'react';
import UserProfile from '../../components/UserProfile/index';
import { useSelector } from 'react-redux';
import useFetch from '../../hooks/useFetch';
import Loading from '../../components/Loading';

const Profile = (props) => {
    const [data, loading, error, utils] = useFetch(
        `/api/get-user-by-username?username=${props.match.params.username}`
    );
    useEffect(() => {
        utils.start();
    }, []);

    if (loading) {
        return <Loading />;
    }

    return (
        <div>
            {data && (
                <UserProfile
                    channelName={data.username}
                    subscribers={data.subscribers}
                    subscribed={false}
                    img={data.imageUrl}
                    videos={data.uploadedVideos
                        .map((video) => ({ ...video, hideChannel: true }))
                        .reverse()}
                    bgColor="#222"
                />
            )}
        </div>
    );
};

export default Profile;
