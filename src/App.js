import React, { useState, useEffect } from 'react';

function App() {
	const [data, setData] = useState(null);
	const [quality, setQuality] = useState('480p');
	const [link, setLink] = useState();

	useEffect(() => {
		async function fetchData() {
			const fetchedData = await fetch('/api/');
			const json = await fetchedData.json();
			setData(json.hello);
		}
		fetchData();
	}, []);

	useEffect(() => {
		setLink(`http://d864jpdslrchw.cloudfront.net/d/d-${quality}.mp4`);
	}, [quality]);

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
				src='http://d864jpdslrchw.cloudfront.net/d/Thumbnail00001.png'
			/>
		</div>
	);
}

export default App;
