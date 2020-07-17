import { useState } from 'react';

const useForm = (initialState) => {
    const [form, setForm] = useState(initialState);

    return [
        form,
        (e) => {
            const { target } = e;
            setForm((prev) => {
                return {
                    ...prev,
                    [target.name]: target.value,
                };
            });
        },
    ];
};

export default useForm;
