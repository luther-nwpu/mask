export const DISPLAYAUTH = 'DISPLAY_AUTH' 

export const displayAuth = function(isDisplay: Boolean, authTab: Number) {
    return { type: DISPLAYAUTH, isDisplay: isDisplay, authTab: authTab }
}