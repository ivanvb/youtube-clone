import React, { useEffect } from 'react';
import VideoList from '../../components/VideoList/index';
import useFetch from '../../hooks/useFetch';
import Loading from '../../components/Loading/index';

const url = 'https://avatars1.githubusercontent.com/u/33399537?s=400&v=4';
const Home = () => {
    const [data, loading, error, utils] = useFetch('/api/get-videos?n=10&page=1');
    useEffect(() => {
        utils.start();
    }, []);

    const video = {
        img: url,
        channelName: 'Channel 01',
        className: 'mx-2 md:mx-0 mt-4',
        title: 'Very good video',
        views: '129k',
        time: '1 hour ago',
        description:
            'Ullamco cillum reprehenderit laboris qui exercitation velit Lorem aliquip reprehenderit sint deserunt. Ullamco laboris est non aliquip aliquip officia sint ipsum non ipsum. Excepteur deserunt minim ipsum mollit veniam ea laboris quis veniam. Eu amet do irure mollit ut sit ipsum deserunt enim.',
        duration: '11:04',
    };

    if (loading) {
        return <Loading />;
    }

    let videos;
    if (data) {
        videos = data.videos.map((video) => {
            return {
                ...video,
                className: 'mx-2 md:mx-0 mt-4',
                channelName: video.uploadingUser.username,
                img: video.uploadingUser.imageUrl,
            };
        });
    }

    return <div className="px-2 md:px-8 pb-8">{data && <VideoList videos={videos} />}</div>;
};

export default Home;
