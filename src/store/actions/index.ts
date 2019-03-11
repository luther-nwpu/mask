export const STOREUSERINFO = 'STORE_USERINFO'
export const GETUSERINFO = 'GET_USERINFO'
export const DISPLAYAUTH = 'DISPLAY_AUTH' 

export const storeUserInfo = function(text) {
    return { type: STOREUSERINFO, userinfo: text }
}

export const displayAuth = function(isDisplay: Boolean, authTab: Number) {
    return { type: DISPLAYAUTH, isDisplay: isDisplay, authTab: authTab }
}