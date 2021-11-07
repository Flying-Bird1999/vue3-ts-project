import { Module } from 'vuex'
import { ISystemState } from './types'
import { IRootState } from '@/store/type'

import { deletePageData, getPageListData, createPageData, editPageData } from '@/service/main/system/system'

const systemModule: Module<ISystemState, IRootState> = {
    namespaced: true,
    state() {
        return {
            usersList: [],
            usersCount: 0,
            roleList: [],
            roleCount: 0,
            goodsList: [],
            goodsCount: 0,            
            menuList: [],
            menuCount: 0,            
        }
    },
    getters: {
        pageListData(state) {
            return (pageName: string) => {
                return (state as any)[`${pageName}List`]
            }
        },
        pageCountData(state) {
            return (pageName: string) => {
                return (state as any)[`${pageName}Count`]
            }
        }
    },
    actions: {
        async getPageListAction({commit}, payload: any) {
            // 1. 获取pageUrl
            const pageName = payload.pageName
            const pageUrl = `/${pageName}/list`
            // let pageUrl = ''
            // switch(pageName) {
            //     case 'users': 
            //         pageUrl = '/users/list'
            //         break;
            //     case 'role':
            //         pageUrl = '/role/list'
            //         break;
            // }

            // 2. 对页面发送请求
            const pageResult = await getPageListData(pageUrl, payload.queryInfo)
            // 3. 将数据存储到state中
            const { list, totalCount } = pageResult.data
            
            const changePageName = pageName.slice(0, 1).toUpperCase() + pageName.slice(1)
            commit(`change${changePageName}List`, list)
            commit(`change${changePageName}Count`, totalCount)
        },
        async deletePageDataActions({dispatch}, payload: any) {
            // 1. 获取数据
            // 1.1 pageName -> /users    1.2 id -> /users/id
            const { pageName, id } = payload
            const pageUrl = `/${pageName}/${id}`
            // 2.调用删除网络请求
            const a =  await deletePageData(pageUrl)

            // 3. 重新请求最新的数据
            dispatch('getPageListAction', {
                pageName,
                queryInfo: {
                    offset: 0,
                    size: 10
                }
            })
        },
        async createPageDataAction({ dispatch }, payload: any) {
            // 1.创建数据的请求
            const { pageName, newData } = payload
            const pageUrl = `/${pageName}`
            await createPageData(pageUrl, newData)
    
            // 2.请求最新的数据
            dispatch('getPageListAction', {
                pageName,
                queryInfo: {
                    offset: 0,
                    size: 10
                }
            })
        },
      
        async editPageDataAction({ dispatch }, payload: any) {
            // 1.编辑数据的请求
            const { pageName, editData, id } = payload
            console.log(editData)
            const pageUrl = `/${pageName}/${id}`
            await editPageData(pageUrl, editData)
    
            // 2.请求最新的数据
            dispatch('getPageListAction', {
                pageName,
                queryInfo: {
                    offset: 0,
                    size: 10
                }
            })
        }

    },
    mutations: {
        changeUsersList(state, userList: any[]) {
            state.usersList = userList
        },
        changeUsersCount(state, userCount: number) {
            state.usersCount = userCount
        },
        changeRoleList(state, list: any[]) {
            state.roleList = list
        },
        changeRoleCount(state, count: number) {
            state.roleCount = count
        },
        changeGoodsList(state, list: any[]) {
            state.goodsList = list
        },
        changeGoodsCount(state, count: number) {
            state.goodsCount = count
        },
        changeMenuList(state, list: any[]) {
            state.menuList = list
        },
        changeMenuCount(state, count: number) {
            state.menuCount = count
        }
    }
}

export default systemModule