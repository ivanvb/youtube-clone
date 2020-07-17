import React, { useState, useEffect } from 'react';

function Test() {
	const [data, setData] = useState(null);
	const [quality, setQuality] = useState('480p');
	const [link, setLink] = useState();
	const [image, setImage] = useState();
	const [result, setResult] = useState();

	useEffect(() => {
		async function fetchData() {
			const fetchedData = await fetch('/api/');
			const json = await fetchedData.json();
			setData(json.hello);
		}
		fetchData();
	}, []);

	useEffect(() => {
		setLink(`http://d864jpdslrchw.cloudfront.net/a/a.mp4`);
	}, [quality]);

	const handleChange = event => {
		setImage(event.target.files[0]);
	};

	function getBase64(file, cb) {
		let reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = function () {
			cb(reader.result);
		};
		reader.onerror = function (error) {
			console.log('Error: ', error);
		};
	}
	async function handleClick(e) {
		e.preventDefault();

		console.log(image);

		getBase64(image, res => {
			setResult(res);
		});

		console.log(result);
		/*const formData = new FormData();
		formData.append('image', image);

		formData.append('1', '1');
		formData.append('2', '2');
		/*
		formData.append("position", form.position);
		formData.append("description", form.description);
		formData.append("type", form.type);
		formData.append("email", form.email);
		formData.append("howToApply", form.instructions);
		formData.append("category", categoryName[0]._id);
		formData.append("createdBy", user._id);

		const x = await fetch('/api/upload', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/octet-stream',
			},
			body: formData,
		});
		const y = await x.body;
		console.log(y);*/
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
				src='http://d864jpdslrchw.cloudfront.net/d/Thumbnail00001.png'
			/>
			<h4>Upload your video: </h4>

			<button onClick={handleClick}>Submit</button>
		</div>
	);
}

export default Test;
