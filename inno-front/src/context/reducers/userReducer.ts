import { User } from "../../types";
import {
    FETCH_USER_REQUEST,
    USER_SUCCESS,
    USER_FAILURE,
    USER_LOGIN_REQUEST,
    USER_REGISTER_REQUEST,
    USER_UPDATE_PREFERENCES_REQUEST,
    USER_LOGOUT,
    Action
} from "../actions/userActions";

interface IState{
    user: null | User;
    loading: boolean;
    error: Error | null;
}

export const initialState: IState = {
    user: null,
    loading: false,
    error: null
}



const userReducer = (state = initialState, action: Action) => {
    switch (action.type) {
        case FETCH_USER_REQUEST:
            return {
                ...state,
                loading: true
            }
        case USER_SUCCESS:
            return {
                ...state,
                loading: false,
                user: action.payload
            }
        case USER_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case USER_LOGIN_REQUEST:
            return {
                ...state,
                loading: true
            }
        case USER_REGISTER_REQUEST:
            return {
                ...state,
                loading: true
            }
        case USER_UPDATE_PREFERENCES_REQUEST:
            return {
                ...state,
                loading: true
            }
        case USER_LOGOUT:
            return {
                ...state,
                user: null
            }
        default:
            return state;
    }
}

export default userReducer;
