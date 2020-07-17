import React from 'react';
import { useHistory } from 'react-router-dom';
import useForm from '../../hooks/useForm';

const SearchBar = ({ className }) => {
    const [form, setForm] = useForm({ search: '' });
    const history = useHistory();

    return (
        <form
            className={`w-full  ${className}`}
            autoComplete="off"
            autoCorrect="off"
            onSubmit={(e) => {
                e.preventDefault();
                history.push(`/search?q=${form.search}`);
            }}
        >
            <input
                className="w-full border p-1 px-3 rounded"
                placeholder="Search"
                name="search"
                value={form.search}
                onChange={(e) => {
                    setForm(e);
                }}
            />
        </form>
    );
};

export default SearchBar;
