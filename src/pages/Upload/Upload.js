import React, { useState } from 'react';
import InputField from '../../components/InputField/index';
import TextField from '../../components/TextField/index';
import Button from '../../components/Button/index';
import useForm from '../../hooks/useForm';
import { useSelector } from 'react-redux';
import { getVideoDuration } from '../../util/index';

import axios from 'axios';

const Upload = () => {
    const user = useSelector((state) => state.user);

    const [hasImage, setImage] = useState(false);
    const [form, setForm] = useForm({
        video: '',
        thumbnail: '',
        title: '',
        tags: '',
        description: '',
    });

    async function handleUpload(e) {
        e.preventDefault();
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

        const res = await axios.post('/api/create-video/', body, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log(res);
    }

    return (
        <div className="pt-4 px-2 md:px-8 pb-4">
            <form className="flex flex-wrap" onSubmit={handleUpload}>
                <div className="w-full md:w-5/12 pr-0 md:pr-4">
                    <div className="relative">
                        <img
                            src="https://avatars1.githubusercontent.com/u/33399537?s=400&v=4"
                            className={`h-64 w-full absolute ${hasImage ? 'z-20' : 'z-0'}`}
                        />
                        <input
                            type="file"
                            id="fileUpload"
                            name="video"
                            onChange={async (e) => {
                                setImage(true);
                                setForm(e);
                            }}
                        />
                        <label
                            className={`${hasImage ? 'z-10' : 'z-20'}`}
                            htmlFor="fileUpload"
                            id="labelFileUpload"
                            content="Upload the video"
                        ></label>
                    </div>
                    <div className="relative pt-2">
                        <img
                            src="https://avatars1.githubusercontent.com/u/33399537?s=400&v=4"
                            className={`h-64 w-full absolute ${hasImage ? 'z-20' : 'z-0'}`}
                        />
                        <input
                            type="file"
                            id="fileUpload"
                            name="thumbnail"
                            onChange={(e) => {
                                setImage(true);
                                setForm(e);
                            }}
                        />
                        <label
                            className={`${hasImage ? 'z-10' : 'z-20'}`}
                            htmlFor="fileUpload"
                            id="labelFileUpload"
                            content="Upload the video's thumbnail"
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
                    <Button className="mt-4">Submit</Button>
                </div>
            </form>
        </div>
    );
};

export default Upload;
