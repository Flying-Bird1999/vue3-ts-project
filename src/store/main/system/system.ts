import { Module } from 'vuex'
import { ISystemState } from './types'
import { IRootState } from '@/store/type'

import { getPageListData } from '@/service/main/system/system'

const systemModule: Module<ISystemState, IRootState> = {
    namespaced: true,
    state() {
        return {
            userList: [],
            userCount: 0
        }
    },
    actions: {
        async getPageListAction({commit}, payload: any) {
            // 1. 对页面发送请求
            const pageResult = await getPageListData(payload.pageUrl, payload.queryInfo)
            const { list, totalCount } = pageResult.data
            commit('changeUserList', list)
            commit('changeUserCount', totalCount)
        }
    },
    mutations: {
        changeUserList(state, userList: any[]) {
            state.userList = userList
        },
        changeUserCount(state, userCount: number) {
            state.userCount = userCount
        }
    }
}

export default systemModule