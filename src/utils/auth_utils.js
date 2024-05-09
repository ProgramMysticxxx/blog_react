import { getTokenCookie } from './cookie_manager';

export function getAuthHeaders() {
    return getTokenCookie() ? {
        headers: {
            'Authorization': `Token ${getTokenCookie()}`,
        }
    } : null;
}

export function isAuthorized() {
    // converts any object to boolean
    return !!getTokenCookie();
}