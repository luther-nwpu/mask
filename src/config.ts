export enum Platform {
    HOME = 0,
    ADMIN = 1,
}

export enum AuthTab {
    LOGIN = 0,
    REGISTER = 1,
}

export enum UserMenu {
    MYUSERINFO = 0,
    MYVIDEO = 1,
    MYDYNAMIC = 2,
    SUBSCRIPTION = 3,
    HISTORY = 4,
    MESSAGE = 5,
    MYDRAFTS = 6,
    MODIFYNICKBANE = 7,
    MODIFYUSERINFO = 8
}

export enum Sex {
    MAN = 0,
    WOMAN = 1,
}

export enum UploadState {
    NOUPLOAD = 0,
    UPLOADING = 1,
}
// 连接时的选择的类型
export enum WebSocketType {
    CHAT = 'chat',
    HAIYOU = 'haiyou'
}

// 找回密码的过程
export enum step {
    FILLEMAIL = 0,
    RESETPASSWORD = 1,
    FINISH = 2
}