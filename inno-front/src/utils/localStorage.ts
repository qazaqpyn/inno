export const setSessionToken = (token: string) => {
    localStorage.setItem('sessionToken', token);
};
  
export const getSessionToken = () => {
    return localStorage.getItem('sessionToken');
};

export const removeSessionToken = () => {
    localStorage.removeItem('sessionToken');
};

export const existsSessionToken = () => {
    return localStorage.getItem('sessionToken') !== null;
};