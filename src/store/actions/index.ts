export const STOREUSERINFO = 'STORE_USERINFO'
export const GETUSERINFO = 'GET_USERINFO'

export const storeUserInfo = function(text) {
    return { type: STOREUSERINFO, text }
}