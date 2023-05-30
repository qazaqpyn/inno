import { User, UserLogin, UserRegister, IUpdatePreferences } from '../../types';

export const FETCH_USER_REQUEST = 'FETCH_USER_REQUEST';
export const USER_SUCCESS = 'USER_SUCCESS';
export const USER_FAILURE = 'USER_FAILURE';
export const USER_LOGIN_REQUEST = 'USER_LOGIN_REQUEST';
export const USER_REGISTER_REQUEST = 'USER_REGISTER_REQUEST';
export const USER_UPDATE_PREFERENCES_REQUEST = 'USER_UPDATE_PREFERENCES_REQUEST';
export const USER_LOGOUT = 'USER_LOGOUT';

export interface Action {
    type: string;
    payload?: any;
}

export const fetchUserRequest = (): Action => {
    return {
        type: FETCH_USER_REQUEST
    }
}

export const userSuccess = (user: User): Action => {
    return {
        type: USER_SUCCESS,
        payload: user
    }
}

export const userFailure = (error: string): Action => {
    return {
        type: USER_FAILURE,
        payload: error
    }
}

export const userLoginRequest = (data: UserLogin): Action => {
    return {
        type: USER_LOGIN_REQUEST,
        payload: data
    }
}

export const userRegisterRequest = (data: UserRegister): Action => {
    return {
        type: USER_REGISTER_REQUEST,
        payload: data
    }
}

export const userUpdatePreferencesRequest = (data: IUpdatePreferences): Action => {
    return {
        type: USER_UPDATE_PREFERENCES_REQUEST,
        payload: data
    }
}

export const userLogout = (): Action => {
    return {
        type: USER_LOGOUT
    }
}