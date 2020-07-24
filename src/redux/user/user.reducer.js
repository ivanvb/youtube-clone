import * as UserTypes from './user.types';

const initialState = {
    loading: false,
    data: {},
    error: '',
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case UserTypes.USER_LOADING:
            return {
                ...state,
                error: '',
                loading: true,
            };
        case UserTypes.USER_FAILURE:
            return {
                ...state,
                error: action.payload,
                loading: false,
            };
        case UserTypes.USER_SUCCESS:
            action.payload.token && window.localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                error: '',
                data: action.payload,
                loading: false,
            };
        case UserTypes.LOGOUT_USER:
            window.localStorage.removeItem('token');
            return {
                ...state,
                loading: false,
                data: '',
            };
    }

    return state;
};

export default reducer;
