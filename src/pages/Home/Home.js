import React, { useEffect } from 'react';
import VideoList from '../../components/VideoList/index';
import useFetch from '../../hooks/useFetch';
import Loading from '../../components/Loading/index';

const Home = () => {
    const [data, loading, error, utils] = useFetch('/api/get-videos?n=100&page=1');
    useEffect(() => {
        utils.start();
    }, []);

    console.log(data);

    if (loading || data === null) {
        return <Loading />;
    } else {
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
    }
};

export default Home;
