import axios from 'axios'
import type { AxiosInstance } from 'axios'
import type { XCRequestInterceptors, XCRequestConfig } from './type'

class XCRequest {
    instance: AxiosInstance
    interceptors?: XCRequestInterceptors

    constructor(config: XCRequestConfig) {
        // 创建axios实例
        this.instance = axios.create(config)
        // 保存基本信息
        this.interceptors = config.interceptors

        // 从config中取出的拦截器是对应的实例的拦截器
        this.instance.interceptors.request.use(
            this.interceptors?.requestInterceptor,
            this.interceptors?.requestInterceptorCatch
        )
        this.instance.interceptors.response.use(
            this.interceptors?.responseInterceptor,
            this.interceptors?.responseInterceptorCatch
        )

        // 添加所有的实例都有的拦截器（全局）
        this.instance.interceptors.request.use((config) => {
            // console.log('所有的实例都有的拦截器: 请求成功拦截')
            return config
        }, (err) => {
            // console.log('所有的实例都有的拦截器: 请求失败拦截')
            return err
        })
        this.instance.interceptors.response.use((res) => {
            // console.log('所有的实例都有的拦截器: 响应成功拦截')

            const data = res.data
            if (data.returnCode === '-1001') {
                console.log('请求失败~, 错误信息')
            } else {
                return data // 通过全局拦截器直接返回数据
            }
        }, (err) => {
            // 例子: 判断不同的HttpErrorCode显示不同的错误信息
            if (err.response.status === 404) {
                console.log('404的错误~')
            }
            // console.log('所有的实例都有的拦截器: 响应失败拦截')
            return err
        })

    }
    request<T=any>(config: XCRequestConfig<T>): Promise<T>{
        return new Promise((resolve, reject) => {
            if(config.interceptors?.requestInterceptor) {
                config = config.interceptors.requestInterceptor(config)
            }
            // 单个请求对请求config的处理
            this.instance.request<any, T>(config).then(res => {
                if(config.interceptors?.responseInterceptor) {
                    res = config.interceptors.responseInterceptor(res)
                }
                // 将结果resolve返回出去
                resolve(res)
            }).catch(err => {
                reject(err)
                return err
            })
        })
    }

    get<T=any>(config: XCRequestConfig<T>): Promise<T> {
        return this.request<T>({...config, method: 'GET'})
    }

    post<T=any>(config: XCRequestConfig<T>): Promise<T> {
        return this.request<T>({ ...config, method: 'POST' })
    }

    delete<T=any>(config: XCRequestConfig<T>): Promise<T> {
        return this.request<T>({ ...config, method: 'DELETE' })
    }

    patch<T=any>(config: XCRequestConfig<T>): Promise<T> {
        return this.request<T>({ ...config, method: 'PATCH' })
    }
}

export default XCRequest