
export const getToken = () => JSON.parse(localStorage.getItem('auth')).idToken;
