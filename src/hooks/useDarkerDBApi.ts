// src/hooks/useDarkerDbApi.ts
import {useCallback, useEffect, useRef, useState} from 'react'
import axios from 'axios'
import type {DarkerDbResponse} from '../types/item'

interface UseDarkerDbApiReturn<T> {
    data: T | null
    loading: boolean
    error: string | null
    refetch: () => void
}

export const useDarkerDbApi = <T>(endpoint: string): UseDarkerDbApiReturn<T> => {
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

        // 이전 요청 취소
        if (abortControllerRef.current) {
            abortControllerRef.current.abort()
        }

        // 새 AbortController 생성
        abortControllerRef.current = new AbortController()

        setLoading(true)
        setError(null)

        try {
            const baseUrl = import.meta.env.VITE_API_DARKER_DB_URL || 'https://api.darkerdb.com/v1'
            const url = `${baseUrl}${endpoint}`


            const response = await axios.get<DarkerDbResponse<T>>(url, {
                timeout: 10000, // 10초 타임아웃
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                signal: abortControllerRef.current.signal
            })

            if (response.data.status === 'OK') {
                setData(response.data.body)
                setError(null)
            } else {
                setError(`API 응답 오류: ${response.data.status}`)
                setData(null)
            }
        } catch (err) {
            // 요청이 취소된 경우는 무시
            if (axios.isCancel(err)) {
                return
            }

            console.error('API 요청 실패:', err)

            if (axios.isAxiosError(err)) {
                if (err.code === 'ECONNABORTED') {
                    setError('요청 시간이 초과되었습니다.')
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

        // 컴포넌트 언마운트 시 요청 취소
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