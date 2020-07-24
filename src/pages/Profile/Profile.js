import React from 'react';
import UserProfile from '../../components/UserProfile/index';
import { useSelector } from 'react-redux';

const video = {
    img: 'https://avatars1.githubusercontent.com/u/33399537?s=400&v=4',
    channelName: 'Channel 01',
    title: 'Very good video',
    views: '129k',
    time: '1 hour ago',
    description:
        'Ullamco cillum reprehenderit laboris qui exercitation velit Lorem aliquip reprehenderit sint deserunt. Ullamco laboris est non aliquip aliquip officia sint ipsum non ipsum. Excepteur deserunt minim ipsum mollit veniam ea laboris quis veniam. Eu amet do irure mollit ut sit ipsum deserunt enim.',
    duration: '11:04',
    className: 'mt-4',
    hideChannel: true,
};

const Profile = () => {
    const user = useSelector((state) => state.user);
    const data = {
        channelName: 'Channel 02',
        subscribers: 12,
        subscribed: true,
        img: 'https://avatars1.githubusercontent.com/u/33399537?s=400&v=4',
        videos: new Array(5).fill(0).map((_) => video),
        bgColor: '#222',
    };

    return (
        <div>
            <UserProfile
                {...user.data}
                videos={data.videos}
                channelName={user.data.username}
                img={user.data.imageUrl}
                bgColor="#222"
            />
        </div>
    );
};

export default Profile;
