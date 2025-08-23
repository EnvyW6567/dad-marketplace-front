import axios from "axios";

export const axiosInterceptorConfig = () => {
    axios.interceptors.request.use(
        (config) => {
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