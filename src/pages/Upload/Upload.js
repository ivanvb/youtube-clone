import React, { useState, useRef, useEffect } from 'react';
import InputField from '../../components/InputField/index';
import TextField from '../../components/TextField/index';
import Button from '../../components/Button/index';
import useForm from '../../hooks/useForm';
import { useSelector } from 'react-redux';
import { getVideoDuration, isFormInvalid } from '../../util/index';
import ProgressBar from '../../components/ProgressBar/index';

import axios from 'axios';

const Upload = () => {
    const user = useSelector((state) => state.user);
    const [uploadMetadata, setUploadMetadata] = useState({
        data: null,
        loading: false,
        error: null,
        loadingPercentage: null,
    });
    const formElement = useRef();

    const [form, setForm] = useForm({
        video: '',
        title: '',
        tags: '',
        description: '',
    });

    function handleUploadProgress(progressEvent) {
        setUploadMetadata((prev) => ({
            ...prev,
            loadingPercentage: Math.ceil((progressEvent.loaded / form.video.size) * 100),
        }));
    }

    async function handleUpload(e) {
        e.preventDefault();
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
            onUploadProgress: handleUploadProgress,
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
                <form className="flex flex-wrap" onSubmit={handleUpload} ref={formElement}>
                    <div className="w-full md:w-5/12 pr-0 md:pr-4">
                        <div className="relative">
                            <input
                                type="file"
                                id="fileUpload"
                                name="video"
                                required={true}
                                onChange={async (e) => {
                                    setForm(e);
                                }}
                            />
                            <label
                                htmlFor="fileUpload"
                                id="labelFileUpload"
                                content={`${
                                    form.video === '' ? 'Select a video' : `${form.video.name}`
                                }`}
                            ></label>
                        </div>
                    </div>
                    <div className="w-full md:w-7/12 mt-4 md:mt-0">
                        <InputField
                            required={true}
                            placeholder="Title"
                            className="w-full"
                            name="title"
                            value={form.title}
                            onChange={setForm}
                        />
                        <TextField
                            required={true}
                            className="mt-4"
                            placeholder="Tags"
                            lines={7}
                            name="tags"
                            value={form.tags}
                            onChange={setForm}
                        />
                        <TextField
                            required={true}
                            className="mt-4"
                            placeholder="Description"
                            lines={7}
                            name="description"
                            value={form.description}
                            onChange={setForm}
                        />
                        <Button disabled={isFormInvalid(form)} className="mt-4">
                            Upload
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Upload;
