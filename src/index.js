import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
// run yarn build:css to generate this file if it does not exists.
import './css/tailwind/tailwind.build.css';

ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById('root')
);
