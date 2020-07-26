import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
// run yarn build:css to generate this file if it does not exists.
import './css/tailwind/tailwind.build.css';
import { Provider } from 'react-redux';
import store from './redux/store';

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);
