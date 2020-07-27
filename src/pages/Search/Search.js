import React, { useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import VideoList from '../../components/VideoList/index';
import useFetch from '../../hooks/useFetch';
import Loading from '../../components/Loading/index';

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

const Search = () => {
    const queryParams = new URLSearchParams(useLocation().search);
    const [data, loading, error, utils] = useFetch(
        `/api/search-videos?key=${queryParams.get('q')}&n=1000&page=1`
    );

    useEffect(() => {
        utils.start();
    }, []);

    const query = queryParams.get('q');
    const history = useHistory();
    if (!query) {
        history.push('/');
    }
    if (loading || data === null) {
        return <Loading />;
    } else {
        console.log(data);
        return (
            <div className="pt-4 px-2 md:px-8">
                <p>
                    Showing results for <i>{queryParams.get('q')}</i>
                </p>
                <VideoList
                    className="mb-8"
                    videos={data.Videos.map((video) => ({
                        ...video,
                        channelName: video.uploadingUser.username,
                        img: video.uploadingUser.imageUrl,
                    }))}
                />
            </div>
        );
    }
};

export default Search;
