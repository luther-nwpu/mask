export const CHATFIRSTUSER = 'CHAT_FIRSTUSER' 
export const CLEARFIRSTUSER = 'CLEAR_FIRSTUSER'

export const chatFirstUser = function(user) {
    return { type: CHATFIRSTUSER, user: user }
}

export const clearFirstUser = () => {
    return { type: CLEARFIRSTUSER }
}