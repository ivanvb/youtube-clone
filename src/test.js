import React from 'react';
import axios from 'axios';

function Test() {
	async function handleLike(e) {
		e.preventDefault();

		const jsonHeader = {
			headers: {
				'Content-Type': 'application/json',
			},
		};
		const body = {
			video: '5f12065528baaf2690351490',
			user: '5f13c05b3a78ea05b95d9f27',
			action: 'dislike',
		};

		const dbEntry = await axios.post('/api/handle-likes', body, jsonHeader);
		console.log(dbEntry.data);
	}

	async function handleSubscribe(e) {
		e.preventDefault();

		const jsonHeader = {
			headers: {
				'Content-Type': 'application/json',
			},
		};
		const body = {
			creator: '5f13c07c3a78ea05b95d9f28',
			loggedUser: '5f13c05b3a78ea05b95d9f27',
			action: 'unsubscribe',
		};

		const dbEntry = await axios.post('/api/handle-subscriptions', body, jsonHeader);
		console.log(dbEntry.data);
	}

	return (
		<div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
			<button style={{ border: '1px solid black' }} onClick={handleSubscribe}>
				Click to subscribe/unsubscribe
			</button>
			<button style={{ border: '1px solid black' }} onClick={handleLike}>
				Click to like/dislike/whatev
			</button>
		</div>
	);
}

export default Test;
