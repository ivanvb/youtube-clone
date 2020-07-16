import React from 'react';
import Heading1 from '../../components/Heading1/index';
import InputField from '../../components/InputField/index';
import Button from '../../components/Button/index';
import LobbyContainer from '../../components/LobbyContainer/index';

const LoginForm = () => {
    return (
        <>
            <Heading1 className="text-gray-800 mb-20">Youtube Clone</Heading1>
            <p className="mb-4">Login with your existing account</p>
            <InputField type="text" placeholder="Email" className="mb-4" />
            <InputField type="password" placeholder="Password" className="mb-4" />
            <Button>Login</Button>
            <p className="absolute bottom-0 mb-6">
                Don't have an account? <span className="font-bold">Sign Up</span>
            </p>
        </>
    );
};

const Login = () => {
    return <LobbyContainer Form={LoginForm} />;
};

export default Login;
