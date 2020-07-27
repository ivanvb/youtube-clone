import React, { useState } from 'react';
import axios from 'axios';

const jsonHeader = {
	headers: {
		'Content-Type': 'application/json',
	},
};

function Test() {
	const [token, setToken] = useState('');
	async function handleDeleteVideo(e) {
		e.preventDefault();
		const body = {
			email: 'email2@gmail.com',
			password: '123456',
		};
		const dbEntry = await axios.post('/api/login', body, jsonHeader);
		console.log(dbEntry.data);
		setToken(dbEntry.data.Token);
	}

	async function logout(e) {
		e.preventDefault();
		const dbEntry = await axios.post('/api/logout');
		console.log(dbEntry.data);
	}

	async function signUp(e) {
		e.preventDefault();
		const body = {
			email: 'testEmail35@outlook.com',
			password: '123444455',
		};
		const dbEntry = await axios.get('/api/get-user?key=5');
		console.log(dbEntry.data);
	}
	return (
		<div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
			<button style={{ border: '1px solid black' }} onClick={handleDeleteVideo}>
				Click to login
			</button>
			<button style={{ border: '1px solid black' }} onClick={logout}>
				Click to logout
			</button>
			<button style={{ border: '1px solid black' }} onClick={signUp}>
				Click to sign up
			</button>
		</div>
	);
}

export default Test;
