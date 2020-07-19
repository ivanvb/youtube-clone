import React from 'react';
import axios from 'axios';

const jsonHeader = {
	headers: {
		'Content-Type': 'application/json',
	},
};

function Test() {
	async function handleGetUserVideos(e) {
		e.preventDefault();

		const dbEntry = await axios.get('/api/get-videos?n=4&page=0');
		console.log(dbEntry.data);
	}

	async function handleEdit(e) {
		e.preventDefault();
		const body = {
			id: '5f12065528baaf2690351490',
			body: {
				likes: 100,
			},
		};

		const dbEntry = await axios.patch('/api/edit-video', body, jsonHeader);
		console.log(dbEntry.data);
	}
	return (
		<div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
			<button style={{ border: '1px solid black' }} onClick={handleGetUserVideos}>
				Click to see all videos
			</button>
			<button style={{ border: '1px solid black' }} onClick={handleEdit}>
				Click to Edit
			</button>
		</div>
	);
}

export default Test;
