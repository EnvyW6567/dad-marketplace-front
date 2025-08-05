import {useCallback, useEffect, useRef, useState} from 'react'
import axios, {type AxiosRequestConfig} from 'axios'
import type {ApiResponse, UseApiReturn} from "../types/axios.ts";

export const useBaseApiGet = <T>(endpoint: string): UseApiReturn<T> => {
    const [data, setData] = useState<T | null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)
    const abortControllerRef = useRef<AbortController | null>(null)

    const fetchData = useCallback(async () => {
        if (!endpoint) {
            setData(null)
            setError(null)
            setLoading(false)
            return
        }

        if (abortControllerRef.current) {
            abortControllerRef.current.abort()
        }

        abortControllerRef.current = new AbortController()

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
                signal: abortControllerRef.current.signal,
                withCredentials: true
            }

            const response = await axios.get<ApiResponse<T>>(url, config)

            if (response.data.success) {
                setData(response.data.data || null)
                setError(null)
            } else {
                setError(response.data.error || response.data.message || 'API 응답 오류')
                setData(null)
            }
        } catch (err) {
            if (axios.isCancel(err)) {
                return
            }

            console.error('API 요청 실패:', err)

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
            setData(null)
        } finally {
            setLoading(false)
        }
    }, [endpoint])

    useEffect(() => {
        fetchData()

        return () => {
            if (abortControllerRef.current) {
                abortControllerRef.current.abort()
            }
        }
    }, [fetchData])

    return {
        data,
        loading,
        error,
        refetch: fetchData
    }
}
