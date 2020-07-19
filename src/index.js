import React from 'react';
import ReactDOM from 'react-dom';
import Test from './test';
// run yarn build:css to generate this file if it does not exists.
import './css/tailwind/tailwind.build.css';

ReactDOM.render(
	<React.StrictMode>
		<Test />
	</React.StrictMode>,
	document.getElementById('root')
);
