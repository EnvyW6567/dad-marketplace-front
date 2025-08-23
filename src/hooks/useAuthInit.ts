import {useEffect} from 'react'
import type {User} from '../store/auth.store'
import {useAuthStore} from '../store/auth.store'
import axios from 'axios'

export const useAuthInit = () => {
    const {setUser, setLoading, logout, isAuthenticated} = useAuthStore()

    useEffect(() => {
        const initializeAuth = async () => {
            try {
                setLoading(true)

                const baseUrl = import.meta.env.VITE_API_BASE_URL
                const response = await axios.get<User>(`${baseUrl}/api/user/me`, {
                    withCredentials: true,
                    timeout: 10000,
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                })

                if (response.status === 200 && response.data) {
                    setUser(response.data)
                    console.log('사용자 인증 완료:', response.data.username)
                } else if (response.status === 401) {
                    console.warn('잘못된 인증 정보입니다.')
                    await logout()
                }
            } catch (error) {
                console.error('인증 초기화 중 오류:', error)

                if (axios.isAxiosError(error)) {
                    if (error.response?.status === 401) {
                        console.log('인증되지 않은 사용자 또는 토큰 만료')
                        // 토큰이 없거나 만료된 경우 - 조용히 로그아웃 처리
                        await logout()
                    } else if (error.response?.status === 403) {
                        console.log('접근 권한 없음')
                        await logout()
                    } else {
                        console.error('API 호출 실패:', error.response?.status, error.message)
                        // 네트워크 오류 등은 로그아웃하지 않음
                        setLoading(false)
                    }
                } else {
                    console.error('예상치 못한 오류:', error)
                    setLoading(false)
                }
            }
        }

        if (!isAuthenticated) {
            initializeAuth()
        } else {
            setLoading(false)
        }
    }, [setUser, setLoading, logout, isAuthenticated])

    const {isLoading} = useAuthStore()
    return {loading: isLoading}
}