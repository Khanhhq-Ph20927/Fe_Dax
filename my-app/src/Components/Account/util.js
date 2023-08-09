import { decodeToken } from 'react-jwt';

export const getUserInfoFromToken = (token) => {
    try {
        const tokenDecoded = decodeToken(token);
        return tokenDecoded;
    } catch (error) {
        return null;
    }
};

export const hasRole = (userInfo, role) => {
    return userInfo && userInfo.roles && userInfo.roles.includes(role);
};
