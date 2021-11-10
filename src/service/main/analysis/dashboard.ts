import xcRequest from "@/service";

enum DashboardAPI {
    categoryGoodsCount = '/goods/category/count',
    categoryGoodsSale = '/goods/category/sale',
    categoryGoodsFavor = '/goods/category/favor',
    addressGoodsSale = '/goods/address/sale'
}

export function getCategoryGoodsCount() {
    return xcRequest.get({
        url: DashboardAPI.categoryGoodsCount
    })
}
  
export function getCategoryGoodsSale() {
    return xcRequest.get({
        url: DashboardAPI.categoryGoodsSale
    })
}

export function getCategoryGoodsFavor() {
    return xcRequest.get({
        url: DashboardAPI.categoryGoodsFavor
    })
}

export function getAddressGoodsSale() {
    return xcRequest.get({
        url: DashboardAPI.addressGoodsSale
    })
}