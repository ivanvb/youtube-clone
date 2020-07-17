import React from 'react';
import Heading1 from '../../components/Heading1/index';
import InputField from '../../components/InputField/index';
import Button from '../../components/Button/index';
import LobbyContainer from '../../components/LobbyContainer/index';
import { Link } from 'react-router-dom';

const SignUpForm = () => {
    return (
        <>
            <Heading1 className="text-gray-800 mb-20">Youtube Clone</Heading1>
            <p className="mb-4">Create a new account</p>
            <InputField type="text" placeholder="Username" className="mb-4" />
            <InputField type="text" placeholder="Email" className="mb-4" />
            <InputField type="password" placeholder="Password" className="mb-4" />
            <Button>Sign Up</Button>
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
