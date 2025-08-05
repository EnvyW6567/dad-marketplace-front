import {useCallback, useState} from "react";
import axios, {type AxiosRequestConfig} from "axios";
import type {ApiResponse} from "../types/axios.ts";

export const useBaseApiPost = <T, P = never>() => {
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)

    const post = useCallback(async (endpoint: string, payload: P): Promise<T | null> => {
        setLoading(true)
        setError(null)

        try {
            const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'
            const url = `${baseUrl}${endpoint}`

            const config: AxiosRequestConfig = {
                timeout: 10000,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            }

            const response = await axios.post<ApiResponse<T>>(url, payload, config)

            if (response.data.success) {
                return response.data.data || null
            } else {
                throw new Error(response.data.error || response.data.message || 'API 응답 오류')
            }
        } catch (err) {
            console.error('API POST 요청 실패:', err)

            if (axios.isAxiosError(err)) {
                if (err.code === 'ECONNABORTED') {
                    setError('요청 시간이 초과되었습니다.')
                } else if (err.response?.status === 401) {
                    setError('인증이 필요합니다. 다시 로그인해주세요.')
                } else if (err.response) {
                    setError(`HTTP ${err.response.status}: ${err.response.statusText}`)
                } else if (err.request) {
                    setError('네트워크 연결을 확인해주세요.')
                } else {
                    setError(`요청 오류: ${err.message}`)
                }
            } else {
                setError('알 수 없는 오류가 발생했습니다.')
            }
            return null
        } finally {
            setLoading(false)
        }
    }, [])

    return {
        post,
        loading,
        error
    }
}
