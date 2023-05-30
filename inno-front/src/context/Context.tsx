import React, { createContext, useContext, useReducer } from 'react';
import userReducer from './reducers/userReducer';
import { initialState } from './reducers/userReducer';
import api from '../services/api';
import { UserLogin, UserRegister, IUpdatePreferences } from '../types/index';
import { removeSessionToken, setSessionToken } from '../utils/localStorage';

import {
  fetchUserRequest,
  userSuccess,
  userFailure,
  userLoginRequest,
  userRegisterRequest,
  userUpdatePreferencesRequest,
  userLogout
} from './actions/userActions';

interface UserContextProps {
  state: typeof initialState;
  fetchUser: () => void;
  loginUser: (data: UserLogin) => void;
  registerUser: (data: UserRegister) => void;
  updatePreferencesUser: (data: IUpdatePreferences) => void;
  logoutUser: () => void;
}

const UserContext = createContext({} as UserContextProps);

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispach] = useReducer(userReducer, initialState);

  const fetchUser = async () => {
    dispach(fetchUserRequest());
    try {
      const r = await api.user.getUser();

      dispach(userSuccess(r.user));
    } catch (error: any) {
      dispach(userFailure(error));
    }
  };

  const loginUser = async (data: UserLogin) => {
    dispach(userLoginRequest(data));
    try {
      const r = await api.user.loginUser(data);

      dispach(userSuccess(r.user));
      setSessionToken(r.token);
    } catch (error: any) {
      dispach(userFailure(error));
    }
  };

  const registerUser = async (data: UserRegister) => {
    dispach(userRegisterRequest(data));
    try {
      const r = await api.user.registerUser(data);

      dispach(userSuccess(r.user));
      setSessionToken(r.token);
    } catch (error: any) {
      dispach(userFailure(error));
    }
  };

  const updatePreferencesUser = async (data: IUpdatePreferences) => {
    dispach(userUpdatePreferencesRequest(data));
    try {
      const r = await api.user.updatePreferencesUser(data);

      dispach(userSuccess(r.user));
    } catch (error: any) {
      dispach(userFailure(error));
    }
  };

  const logoutUser = async () => {
    try {
      await api.user.logoutUser();

      dispach(userLogout());
      removeSessionToken();
    } catch (error: any) {
      dispach(userFailure(error));
    }
  };

  return (
    <UserContext.Provider
      value={{ state, fetchUser, loginUser, registerUser, updatePreferencesUser, logoutUser }}>
      {children}
    </UserContext.Provider>
  );
};

const useUser = () => useContext(UserContext);

export { UserProvider, useUser };
