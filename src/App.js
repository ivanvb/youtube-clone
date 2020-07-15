import React, { useState, useEffect } from 'react';

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
    return <div>{<p>{data || 'Loading . . .'}</p>}</div>;
}

export default App;
