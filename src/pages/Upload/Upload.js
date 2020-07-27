import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { getVideoDuration } from '../../util/index';
import ProgressBar from '../../components/ProgressBar/index';
import VideoForm from '../../components/VideoForm/index';

import axios from 'axios';

const Upload = () => {
    const user = useSelector((state) => state.user);
    const [uploadMetadata, setUploadMetadata] = useState({
        data: null,
        loading: false,
        error: null,
        loadingPercentage: null,
    });

    function handleUploadProgress(form, progressEvent) {
        setUploadMetadata((prev) => ({
            ...prev,
            loadingPercentage: Math.ceil((progressEvent.loaded / form.video.size) * 100),
        }));
    }

    async function handleUpload(form) {
        setUploadMetadata((prev) => ({
            ...prev,
            loading: true,
            error: null,
            loadingPercentage: null,
        }));

        const postHeaders = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const body = {
            title: form.title,
            tags: form.tags.split(','),
            description: form.description,
            likes: 0,
            dislikes: 0,
            views: 0,
            length: await getVideoDuration(form.video),
            uploadingUser: user.data._id,
            uploadDate: new Date(),
        };

        const res = await axios.post('/api/create-video/', body, postHeaders);
        const info = {
            fileName: res.data._id,
            fileType: 'mp4',
        };
        const putHeader = {
            headers: {
                'Content-Type': info.fileType,
            },
            onUploadProgress: (progressEvent) => {
                handleUploadProgress(form, progressEvent);
            },
        };
        const signedRequest = await axios.post('/api/signed-request', info, postHeaders);
        const result = signedRequest.data;
        await axios.put(result.signedRequest, form.video, putHeader);
        await axios.post('/api/transcode', info, postHeaders);
        setUploadMetadata((prev) => ({
            ...prev,
            loading: false,
            loadingPercentage: null,
        }));
    }

    return (
        <div className="h-full w-full relative">
            {uploadMetadata.loading && (
                <div className="h-full w-full absolute bg-white opacity-75 flex items-center justify-center flex-col">
                    <p>
                        Uploading your video. Please do <span className="font-bold">not</span> leave
                        this page.
                    </p>
                    <ProgressBar
                        className="w-48 h-4 m-12 mt-2"
                        percentage={uploadMetadata.loadingPercentage}
                    />
                </div>
            )}
            <div className="pt-4 px-2 md:px-8 pb-4">
                <VideoForm
                    handleSubmit={handleUpload}
                    initialState={{
                        video: '',
                        title: '',
                        tags: '',
                        description: '',
                    }}
                    video
                />
            </div>
        </div>
    );
};

export default Upload;
