import React, { useState, useEffect } from 'react';
import Login from './pages/Login/Login';

function App() {
    const [data, setData] = useState(null);

    useEffect(() => {
        async function fetchData() {
            const fetchedData = await fetch('/api/');
            const json = await fetchedData.json();
            setData(json.hello);
        }
        fetchData();
    }, []);
    return <Login />;
}

export default App;
