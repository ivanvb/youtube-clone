import React, { useEffect } from 'react';
import VideoForm from '../../components/VideoForm/index';
import useFetch from '../../hooks/useFetch';
import Loading from '../../components/Loading/index';
import { useHistory } from 'react-router-dom';

const EditVideo = (props) => {
    const [data, loading, error, utils] = useFetch(`/api/get-video?id=${props.match.params.id}`);
    const history = useHistory();
    useEffect(() => {
        utils.start();
    }, []);

    if (loading || data === null) {
        return <Loading />;
    } else {
        const initialState = {
            title: data.title,
            tags: data.tags.join(','),
            description: data.description,
        };
        return (
            <div className="mx-auto mt-8">
                <VideoForm
                    initialState={initialState}
                    handleSubmit={async (form) => {
                        form.tags = form.tags.split(',');
                        const res = await fetch('/api/edit-video', {
                            method: 'PATCH',
                            headers: {
                                'Content-type': 'application/json',
                            },
                            body: JSON.stringify({ body: form, id: props.match.params.id }),
                        });
                        alert('Video Edited');
                        history.push('/');
                    }}
                />
            </div>
        );
    }
};

export default EditVideo;
