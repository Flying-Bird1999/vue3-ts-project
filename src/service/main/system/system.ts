import xcRequest from "@/service"

import { IDataType } from "@/service/types" 

export function getPageListData(url: string, queryInfo: any) {
    return xcRequest.post<IDataType>({
        url: url,
        data: queryInfo
    })
}

// url: /users/id
export function deletePageData(url: string) {
    return xcRequest.delete<IDataType>({
        url: url
    })
}

export function createPageData(url: string, newData: any) {
    return xcRequest.post<IDataType>({
        url: url,
        data: newData
    })
}

export function editPageData(url: string, editData: any) {
    return xcRequest.patch<IDataType>({
        url: url,
        data: editData
    })
}
  