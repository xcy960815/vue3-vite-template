import axios, { AxiosRequestConfig } from 'axios'
import { ElLoading, ElMessage } from 'element-plus'
import { login } from '../components/header/config'
export interface axiosRequest {
    get: (
        url: string,
        data?: any,
        {
            baseURL,
            needLoading,
            loadingText,
            withCredentials,
        }?: {
            baseURL?: string
            needLoading?: boolean
            loadingText?: string
            withCredentials?: boolean
        }
    ) => Promise<{
        statusCode: number
        code: number
        success: boolean
        data: any
    }>
    post: (
        url: string,
        data?: any,
        {
            contentType,
            baseURL,
            needLoading,
            loadingText,
            withCredentials,
        }?: {
            contentType?:
                | 'application/x-www-form-urlencoded'
                | 'multipart/form-data'
                | 'application/json'
            baseURL?: string
            needLoading?: true | false
            loadingText?: string
            withCredentials?: boolean
        }
    ) => Promise<{
        statusCode: number
        code: number
        success: boolean
        data: any
    }>
    put?: (
        url: string,
        data?: any,
        {
            contentType,
            baseURL,
            needLoading,
            loadingText,
            withCredentials,
        }?: {
            contentType?:
                | 'application/x-www-form-urlencoded'
                | 'multipart/form-data'
                | 'application/json'
            baseURL?: string
            needLoading?: true | false
            loadingText?: string
            withCredentials?: boolean
        }
    ) => Promise<{
        statusCode: number
        code: number
        success: boolean
        data: any
    }>
    delete: (
        url: string,
        data?: any,
        {
            contentType,
            baseURL,
            needLoading,
            loadingText,
            withCredentials,
        }?: {
            contentType?:
                | 'application/x-www-form-urlencoded'
                | 'multipart/form-data'
                | 'application/json'
            baseURL?: string
            needLoading?: true | false
            loadingText?: string
            withCredentials?: boolean
        }
    ) => Promise<{
        statusCode: number
        code: number
        success: boolean
        data: any
    }>
}
/**
 * @param baseURL
 * 后端项目地址的域名+端口
 * @param url
 * 接口的详细地址
 * @param data
 * 请求参数
 * @param contentType
 * 请求头
 * @param baseURL
 * 具体接口的 baseURL
 */
export default function (baseURL?: string): axiosRequest {
    baseURL = baseURL ? baseURL : '$$_OLAP_API_$$' // 'http://10.37.43.159:8091'

    let loadingInstance: any // import('element-plus/lib/el-loading/src/loading.type').ILoadingInstance
    const instance = axios.create({
        baseURL,
        timeout: 60000,
        withCredentials: true,
    })
    /** 添加请求拦截器 **/
    instance.interceptors.request.use(
        (config: AxiosRequestConfig) => {
            return config
        },
        (error) => {
            // 对请求错误做些什么
            return Promise.reject(error)
        }
    )
    /** 添加响应拦截器  **/
    instance.interceptors.response.use(
        (response) => {
            if (
                response.data.code === 200 ||
                response.data.statusCode === 200
            ) {
                setTimeout(() => {
                    loadingInstance && loadingInstance.close()
                }, 300)
                return Promise.resolve(response)
            } else if (response.data.statusCode === 2) {
                login()
                return Promise.resolve(response)
            } else {
                setTimeout(() => {
                    loadingInstance && loadingInstance.close()
                }, 300)
                ElMessage({
                    message: response.data.message,
                    type: 'error',
                })
                return Promise.reject(response.data.message)
            }
        },
        (error) => {
            setTimeout(() => {
                loadingInstance && loadingInstance.close()
            }, 300)
            return Promise.reject(error)
        }
    )

    const axiosRequest: axiosRequest = {
        get: (
            url,
            params,
            { baseURL, needLoading, loadingText, withCredentials } = {}
        ) => {
            needLoading = needLoading === undefined ? true : needLoading
            withCredentials =
                withCredentials === undefined ? true : withCredentials
            if (needLoading) {
                loadingInstance && loadingInstance.close()
                loadingText = loadingText ? loadingText : '数据加载中...'
                loadingInstance = ElLoading.service({
                    // 发起请求时加载全局loading，请求失败或有响应时会关闭
                    text: loadingText,
                    lock: true,
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)',
                })
            }

            return new Promise((resolve, reject) => {
                instance({
                    method: 'get',
                    url,
                    params,
                    baseURL,
                    withCredentials,
                })
                    .then((response) => {
                        resolve(response.data)
                    })
                    .catch((error) => {
                        reject(error)
                    })
            })
        },
        post: (
            url,
            data,
            {
                contentType,
                baseURL,
                needLoading,
                loadingText,
                withCredentials,
            } = {}
        ) => {
            contentType = contentType || 'application/json'
            needLoading = needLoading === undefined ? true : needLoading
            withCredentials =
                withCredentials === undefined ? true : withCredentials
            if (needLoading) {
                loadingText = loadingText ? loadingText : '数据加载中...'
                loadingInstance = ElLoading.service({
                    // 发起请求时加载全局loading，请求失败或有响应时会关闭
                    text: loadingText,
                    lock: true,
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)',
                })
            }
            return instance({
                method: 'post',
                url,
                data,
                headers: {
                    'Content-Type': contentType,
                },
                baseURL,
                withCredentials,
            })
                .then((response) => {
                    return Promise.resolve(response.data)
                })
                .catch((error) => {
                    return Promise.reject(error)
                })
        },
        delete: (
            url,
            data,
            {
                baseURL,
                needLoading,
                loadingText,
                withCredentials,
                contentType,
            } = {}
        ) => {
            needLoading = needLoading === undefined ? true : needLoading
            withCredentials =
                withCredentials === undefined ? true : withCredentials
            if (needLoading) {
                loadingText = loadingText ? loadingText : '数据加载中...'
                loadingInstance = ElLoading.service({
                    // 发起请求时加载全局loading，请求失败或有响应时会关闭
                    text: loadingText,
                    lock: true,
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)',
                })
            }
            return instance
                .delete(url, {
                    baseURL,
                    data,
                    withCredentials,
                    headers: {
                        'Content-Type': contentType,
                    },
                })
                .then((response) => {
                    return Promise.resolve(response.data)
                })
                .catch((error) => {
                    return Promise.reject(error)
                })
        },
    }
    return axiosRequest
}
