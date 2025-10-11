// 接口封装网上找好的-axios封装
import axios from 'axios';

// 创建axios实例
const axiosInstance = axios.create({
    baseURL: 'http://127.0.0.1:8081', // 基础URL，可以根据项目配置 
    timeout: 5000, // 请求超时时间
});

// 请求拦截器
axiosInstance.interceptors.request.use(
    (config) => {
        // 在发送请求之前可以在这里添加请求头等信息
        // 比如 config.headers.Authorization = `Bearer ${token}`;
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// 响应拦截器
axiosInstance.interceptors.response.use(
    (response) => {
        return response.data; // 直接返回数据
    },
    (error) => {
        return Promise.reject(error);
    }
);

// 工具函数，用于拼接GET请求的参数到URL上
const buildUrl = (url: string, params: any) => {
    if (!params || Object.keys(params).length === 0) {
        return url;
    }
    const queryString = Object.entries(params)
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value as string)}`)
        .join('&');
    return `${url}?${queryString}`;
};

// GET 请求封装
const get = (url: string, params = {}) => {
    const fullUrl = buildUrl(url, params);
    return axiosInstance.get(fullUrl);
};

// POST 请求封装
const post = (url: string, data = {}) => {
    return axiosInstance.post(url, data);
};

// PUT 请求封装
const put = (url: string, data = {}) => {
    return axiosInstance.put(url, data);
};

// DELETE 请求封装
const del = (url: string, params = {}) => {
    const fullUrl = buildUrl(url, params);
    return axiosInstance.delete(fullUrl);
};

// 导出封装的请求方法
export default {
    get,
    post,
    put,
    delete: del,
};

