import type { AxiosRequestConfig, AxiosResponse } from 'axios'

export interface XCRequestInterceptors {
    requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
    requestInterceptorCatch?: (error: any) => any
    responseInterceptor?: (res: AxiosResponse) => AxiosResponse
    responseInterceptorCatch?: (error: any) => any
}

export interface XCRequestConfig extends AxiosRequestConfig {
    interceptors?: XCRequestInterceptors
}
