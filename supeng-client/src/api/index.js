import ajax from './ajax';

export const reqRegister = (user) => ajax('/register', user ,'POST')

export const reqLogin = ({username, password}) => ajax('/login', {username, password} ,'POST')

export const reqUpdateUser = (userInfo) => ajax('/update', userInfo,'POST')

export const reqUser = () => ajax('/user')

export const reqUserList = (type) => ajax('/userlist', {type: type})

export const reqChatMsgList = () => ajax('/msglist')

export const reqReadMsg = (from) => ajax('/readmsg', {from}, 'POST')