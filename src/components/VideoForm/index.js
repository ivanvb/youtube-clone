import React from 'react';
import useForm from '../../hooks/useForm';
import InputField from '../InputField/index';
import TextField from '../TextField/index';
import Button from '../Button/index';
import { isFormInvalid } from '../../util/index';

const VideoForm = ({ handleSubmit, initialState, video, edit }) => {
    const [form, setForm] = useForm(initialState);
    return (
        <form
            className="flex flex-wrap"
            onSubmit={(e) => {
                e.preventDefault();
                handleSubmit(form);
            }}
        >
            {video && (
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
            )}
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
                    {edit ? 'Upload' : 'Edit'}
                </Button>
            </div>
        </form>
    );
};

export default VideoForm;
