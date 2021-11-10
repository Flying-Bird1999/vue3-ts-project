import { Module } from 'vuex'

import { getCategoryGoodsCount, getCategoryGoodsSale, getCategoryGoodsFavor, getAddressGoodsSale } from '@/service/main/analysis/dashboard'

import { IDashboardState } from './types'
import { IRootState } from '../../type'

const dashboardModule: Module<IDashboardState, IRootState>  = {
    namespaced: true,
    state() {
        return {
            categoryGoodsCount: [],
            categoryGoodsSale: [],
            categoryGoodsFavor: [],
            addressGoodsSale: []
        }
    },
    actions: {
        async getDashboardDataAction({ commit }) {
            const categoryCountResult = await getCategoryGoodsCount()
            commit('changeCategoryGoodsCount', categoryCountResult.data)
            const categorySaleResult = await getCategoryGoodsSale()
            commit('changeCategoryGoodsSale', categorySaleResult.data)
            const categoryFavorResult = await getCategoryGoodsFavor()
            commit('changeCategoryGoodsFavor', categoryFavorResult.data)
            const addressGoodsResult = await getAddressGoodsSale()
            commit('changeAddressGoodsSale', addressGoodsResult.data)
        }
    },
    mutations: {
        changeCategoryGoodsCount(state, list) {
            state.categoryGoodsCount = list
        },
        changeCategoryGoodsSale(state, list) {
            state.categoryGoodsSale = list
        },
        changeCategoryGoodsFavor(state, list) {
            state.categoryGoodsFavor = list
        },
        changeAddressGoodsSale(state, list) {
            state.addressGoodsSale = list
        }
    }
}

export default dashboardModule
