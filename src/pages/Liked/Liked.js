import React, { useEffect } from 'react';
import VideoList from '../../components/VideoList/index';
import useFetch from '../../hooks/useFetch';
import Loading from '../../components/Loading/index';
import { useSelector } from 'react-redux';

const Liked = () => {
	const user = useSelector(state => state.user);
	const [data, loading, error, utils] = useFetch(
		`/api/get-liked-videos?id=${user.data._id}&n=10&page=1`
	);
	useEffect(() => {
		utils.start();
	}, []);

	if (loading) {
		return <Loading />;
	}

	let videos;
	if (data) {
		console.log(data);
		videos = data.Videos.map(video => {
			return {
				...video,
				className: 'mx-2 md:mx-0 mt-4',
				channelName: video.uploadingUser.username,
				img: video.uploadingUser.imageUrl,
			};
		});
	}

	return <div className='px-2 md:px-8 pb-8'>{data && <VideoList videos={videos} />}</div>;
};

export default Liked;
