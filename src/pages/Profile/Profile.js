import React from 'react';
import UserProfile from '../../components/UserProfile/index';
import { useSelector } from 'react-redux';

const Profile = () => {
    const user = useSelector((state) => state.user);

    return (
        <div>
            <UserProfile
                {...user.data}
                videos={user.data.uploadedVideos
                    .map((video) => ({
                        ...video,
                        hideChannel: true,
                    }))
                    .reverse()}
                channelName={user.data.username}
                img={user.data.imageUrl}
                bgColor="#222"
                isLoggedUser={true}
            />
        </div>
    );
};

export default Profile;
