import { useState, useEffect } from 'react';

export default function useFetch(url) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [init, setInit] = useState(null);

    useEffect(() => {
        async function makeRequest() {
            setLoading(true);
            const req = await fetch(url, init);
            if (req.status === 400) {
                const { error } = await req.json();
                setError(error);
            } else {
                const data = await req.json();
                setData({ ...data });
            }
            setLoading(false);
        }

        init && makeRequest();
    }, [init]);

    return [
        data,
        loading,
        error,
        {
            start: (params) => {
                setInit({ ...params });
            },
        },
    ];
}
