import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Test() {
	const [data, setData] = useState(null);
	const [quality, setQuality] = useState('480p');
	const [link, setLink] = useState();
	const [image, setImage] = useState();

	useEffect(() => {
		async function fetchData() {
			const fetchedData = await fetch('/api/');
			const json = await fetchedData.json();
			setData(json.hello);
		}
		fetchData();
	}, []);

	useEffect(() => {
		setLink(`http://d864jpdslrchw.cloudfront.net/5f1210ddd747e90a04f705ce/${quality}.mp4`);
	}, [quality]);

	const handleChange = event => {
		setImage(event.target.files[0]);
	};

	async function handleClick(e) {
		e.preventDefault();

		console.log(image);
		const jsonHeader = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		const body = {
			title: 'Final Final Sample Video',
			description: 'My Description4',
			tags: ['Funny', 'Comedy', 'Vlog'],
			likes: 502,
			dislikes: 155,
			length: 750,
			uploadDate: new Date(),
			views: 3589,
		};

		const dbEntry = await axios.post('/api/create-video', body, jsonHeader);

		const dbResult = dbEntry.data;

		const info = {
			fileName: dbResult._id,
			fileType: image.name.split('.')[1],
		};
		const putHeader = {
			headers: {
				'Content-Type': info.fileType,
			},
		};

		const signedRequest = await axios.post('/api/signed-request', info, jsonHeader);

		const result = signedRequest.data;
		console.log(result);

		const putObject = await axios.put(result.signedRequest, image, putHeader);

		const s3Result = putObject.data;
		console.log(s3Result);

		const transcode = await axios.post('/api/transcode', info, jsonHeader);

		const transcodedResult = transcode.data;
		console.log(transcodedResult);
	}
	return (
		<div>
			{<p>{data || 'Loading . . .'}</p>}
			<h2>hola</h2>
			<video style={{ height: '40%', width: '40%' }} controls src={link} />
			<p>quality: </p>
			<button
				onClick={() => {
					quality === '480p' ? setQuality('720p') : setQuality('480p');
				}}>
				Change quality
			</button>
			<p>link: {link}</p>
			<img
				style={{ height: '40%', width: '40%' }}
				alt='test-image'
				src='http://d864jpdslrchw.cloudfront.net/5f1210ddd747e90a04f705ce/thumbnail-00001.png'
			/>
			<h4>Upload your video: </h4>
			<input style={{ display: 'block' }} onChange={handleChange} type='file' accept='video/mp4' />
			<button style={{ display: 'block' }} onClick={handleClick}>
				Submit
			</button>
		</div>
	);
}

export default Test;
