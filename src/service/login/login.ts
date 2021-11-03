import xcRequest from "../index";

import { IAccoont, ILoginResult } from './type'
import { IDataType } from '../types'

enum loginAPI {
    AccountLogin = '/login',
    LoginUserInfo = '/users/', // users/1
    UserMenus = '/role/' // role/1/menu
}

export function accountLoginRequest(account: IAccoont) {
    return xcRequest.post<IDataType<ILoginResult>>({
        url: loginAPI.AccountLogin,
        data: account
    })
}

export function requestUserInfoById(id: number) {
    return xcRequest.get<IDataType>({
        url: loginAPI.LoginUserInfo + id
    })
}

export function requestUserMenuByRoleId(id: number) {
    return xcRequest.get<IDataType>({
        url: loginAPI.UserMenus + id + '/menu'
    })
}


