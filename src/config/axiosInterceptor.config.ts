import axios from "axios";
import {getAccessToken} from "../utils/auth.utils.ts";

export const axiosInterceptorConfig = () => {
    axios.interceptors.request.use(
        (config) => {
            const token = getAccessToken()

            if (token) {
                config.headers.Authorization = `Bearer ${token}`
            }

            return config
        },
        (error) => {
            return Promise.reject(error)
        }
    )

    axios.interceptors.response.use(
        (response) => response,
        (error) => {
            if (error.response?.status === 401) {
                // 토큰 만료 시 로그아웃 처리
                window.location.href = '/login'
            }
            return Promise.reject(error)
        }
    )
}