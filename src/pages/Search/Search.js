import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import VideoList from '../../components/VideoList/index';

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
    const query = queryParams.get('q');
    const history = useHistory();
    if (!query) {
        history.push('/');
    }
    return (
        <div className="pt-4 px-2 md:px-8">
            <p>
                Showing results for <i>{queryParams.get('q')}</i>
            </p>
            <VideoList className="mb-8" videos={new Array(16).fill(0).map((_) => video)} />
        </div>
    );
};

export default Search;
