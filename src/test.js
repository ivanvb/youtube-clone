import React from 'react';
import axios from 'axios';

const jsonHeader = {
	headers: {
		'Content-Type': 'application/json',
	},
};

function Test() {
	async function handleDeleteVideo(e) {
		e.preventDefault();

		const dbEntry = await axios.get('/api/get-user-videos?id=5f13c07c3a78ea05b95d9f28&n=2&page=1');
		console.log(dbEntry.data);
	}

	return (
		<div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
			<button style={{ border: '1px solid black' }} onClick={handleDeleteVideo}>
				Click to search video
			</button>
		</div>
	);
}

export default Test;
