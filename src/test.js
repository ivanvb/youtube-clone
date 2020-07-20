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

		const dbEntry = await axios.delete('/api/delete-video?id=5f120b3c6826980cb020e608');
		console.log(dbEntry.data);
	}

	return (
		<div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
			<button style={{ border: '1px solid black' }} onClick={handleDeleteVideo}>
				Click to delete video
			</button>
		</div>
	);
}

export default Test;
