import React from 'react';
import Heading1 from '../../components/Heading1/index';
import InputField from '../../components/InputField/index';
import Button from '../../components/Button/index';
import LobbyContainer from '../../components/LobbyContainer/index';
import { Link } from 'react-router-dom';
import useForm from '../../hooks/useForm';
import { useDispatch, useSelector } from 'react-redux';
import { signUpUser } from '../../redux/user/user.actions';

const SignUpForm = () => {
    const [form, setForm] = useForm({ name: '', username: '', password: '', email: '' });
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);

    function handleSubmit(e) {
        e.preventDefault();
        dispatch(signUpUser(form));
    }

    return (
        <>
            <Heading1 className="text-gray-800 mb-20">Youtube Clone</Heading1>
            <p className="mb-4">Create a new account</p>
            <form onSubmit={handleSubmit} autoComplete="off">
                <InputField
                    name="name"
                    onChange={setForm}
                    value={form.name}
                    required={true}
                    type="text"
                    placeholder="Name"
                    className="mb-4"
                />
                <InputField
                    name="username"
                    onChange={setForm}
                    value={form.username}
                    required={true}
                    type="text"
                    placeholder="Username"
                    className="mb-4"
                />
                <InputField
                    name="email"
                    onChange={setForm}
                    value={form.email}
                    required={true}
                    type="email"
                    placeholder="Email"
                    className="mb-4"
                />
                <InputField
                    name="password"
                    onChange={(e) => {
                        setForm(e);
                    }}
                    value={form.password}
                    required={true}
                    type="password"
                    placeholder="Password"
                    className="mb-4"
                />
                <Button>Sign Up</Button>
            </form>
            <p className="absolute bottom-0 mb-6">
                Already have an account?{' '}
                <Link to="/login" className="font-bold">
                    Login
                </Link>
            </p>
        </>
    );
};

const Login = () => {
    return <LobbyContainer Form={SignUpForm} />;
};

export default Login;
