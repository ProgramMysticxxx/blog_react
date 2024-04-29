import * as cookie from "./cookie";

/** 
 * Saving the token cookie with max age of 30 days
 */
export function setTokenCookie(token) {
    cookie.setCookie('token', token, { 'max-age': 2592000 });
}

/**
 * Retriving the token cookie
 */
export function getTokenCookie() {
    return cookie.getCookie('token');
}