import * as UserTypes from './user.types';

export const userLoading = () => {
    return {
        type: UserTypes.USER_LOADING,
        payload: '',
    };
};

export const userSuccess = (user) => {
    return {
        type: UserTypes.USER_SUCCESS,
        payload: user,
    };
};

export const userFailure = (error) => {
    return {
        type: UserTypes.USER_FAILURE,
        payload: error,
    };
};

export const fetchUser = (token) => {
    return async (dispatch) => {
        dispatch(userLoading());
        const res = await fetch('/api/get-user-from-token', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ token }),
        });
        if (res.status !== 400) {
            const data = await res.json();
            dispatch(userSuccess(data));
        }
    };
};

export const signUpUser = (userData) => {
    return async (dispatch) => {
        dispatch(userLoading());
        const res = await fetch('/api/sign-up', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(userData),
        });
        if (res.status === 400) {
            const { error } = await res.json();
            dispatch(userFailure(error));
        } else {
            const data = await res.json();
            dispatch(userSuccess(data));
        }
    };
};

export const loginUser = (userData) => {
    return async (dispatch) => {
        dispatch(userLoading());
        const res = await fetch('/api/login', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(userData),
        });
        if (res.status === 400) {
            const { error } = await res.json();
            dispatch(userFailure(error));
        } else {
            const data = await res.json();
            dispatch(userSuccess(data));
        }
    };
};
