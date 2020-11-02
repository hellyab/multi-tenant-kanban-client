import jwt_decode from 'jwt-decode';

export const getUserInfoFromToken = () => {
    const token = localStorage.getItem('token')
    return jwt_decode(token)
}
