import xcRequest from "@/service"

import { IDataType } from "@/service/types" 

export function getPageListData(url: string, queryInfo: any) {
    return xcRequest.post<IDataType>({
        url: url,
        data: queryInfo
    })
}