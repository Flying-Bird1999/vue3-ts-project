import { Module } from 'vuex'

import { accountLoginRequest, requestUserInfoById, requestUserMenuByRoleId } from '@/service/login/login'
import localCache from '@/utils/cache'
import { mapMenusToRoutes } from '@/utils/map-menus'
import router from '@/router'

import { IAccoont } from '@/service/login/type'
import { ILoginState } from './type'
import { IRootState } from '../type'

const loginModule: Module<ILoginState, IRootState> = {
    namespaced: true,
    state(){
        return {
            token: '',
            userInfo: {},
            userMenus: {}
        }
    },
    getters: {},
    actions: {
        async accountLoginAction({commit}, payload: IAccoont) {
            // 1.实现登陆逻辑
            const loginResult = await accountLoginRequest(payload)
            const {id, token} = loginResult.data
            commit('changeToken', token)
            localCache.setCache('token', token)

            // 2.请求用户信息
            const userInfoResult = await requestUserInfoById(id)
            const userInfo = userInfoResult.data
            commit('changeUserInfo', userInfo)
            localCache.setCache('userInfo', userInfo)

            // 3.请求用户菜单
            const userMenusResult = await requestUserMenuByRoleId(userInfo.role.id)
            const userMenus = userMenusResult.data
            console.log(userMenus)
            commit('changeUserMenus', userMenus)
            localCache.setCache('userMenus', userMenus)

            // 4.跳到首页
            router.push('/main')
        },
        loadLocalLogin({commit}){
            const token = localCache.getCache('token')
            if (token) {
                commit('changeToken', token)
            }
            const userInfo = localCache.getCache('userInfo')
            if (userInfo) {
                commit('changeUserInfo', userInfo)
            }
            const userMenus = localCache.getCache('userMenus')
            if (userMenus) {
                commit('changeUserMenus', userMenus)
            }
        }
    },
    mutations: {
        changeToken(state, token: string) {
            state.token = token
        },
        changeUserInfo(state, userInfo: any) {
            state.userInfo = userInfo
        },
        changeUserMenus(state, userMenus: any) {
            state.userMenus = userMenus

            // userMenus => routes
            const routes = mapMenusToRoutes(userMenus)
            
            // 将routes => router.main.children
            routes.forEach(route => {
                router.addRoute('main', route)
            })

        }
    }
}

export default loginModule