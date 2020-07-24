import React from 'react';
import Heading1 from '../../components/Heading1/index';
import InputField from '../../components/InputField/index';
import Button from '../../components/Button/index';
import LobbyContainer from '../../components/LobbyContainer/index';
import { Link } from 'react-router-dom';
import useForm from '../../hooks/useForm';
import { useSelector, useDispatch } from 'react-redux';
import { loginUser } from '../../redux/user/user.actions';
import Loading from '../../components/Loading/index';

const LoginForm = () => {
    const [form, setForm] = useForm({ email: '', password: '' });
    const dispatch = useDispatch();
    function handleSubmit(e) {
        e.preventDefault();
        dispatch(loginUser(form));
    }

    return (
        <>
            <Heading1 className="text-gray-800 mb-20">Youtube Clone</Heading1>
            <p className="mb-4">Login with your existing account</p>
            <form autoComplete="off" onSubmit={handleSubmit}>
                <InputField
                    required={true}
                    name="email"
                    value={form.email}
                    onChange={(e) => setForm(e)}
                    type="email"
                    placeholder="Email"
                    className="mb-4"
                />
                <InputField
                    required={true}
                    name="password"
                    value={form.password}
                    onChange={(e) => setForm(e)}
                    type="password"
                    placeholder="Password"
                    className="mb-4"
                />
                <Button>Login</Button>
            </form>
            <p className="absolute bottom-0 mb-6">
                Don't have an account?{' '}
                <Link to="/signup" className="font-bold">
                    Sign Up
                </Link>
            </p>
        </>
    );
};

const Login = () => {
    const user = useSelector((state) => state.user);
    return user.loading ? <Loading /> : <LobbyContainer Form={LoginForm} />;
};

export default Login;
