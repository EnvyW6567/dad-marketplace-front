import {useEffect} from 'react'
import {useAuthStore} from '../store/auth.store'
import {getAccessToken, getUserFromToken, isTokenExpired} from "../utils/auth.utils.ts";

export const useAuthInit = () => {
    const {setUser, setLoading, logout, isAuthenticated} = useAuthStore()

    useEffect(() => {
        const initializeAuth = () => {
            try {
                const token = getAccessToken()

                if (!token) {
                    setLoading(false)
                    return
                }

                if (isTokenExpired(token)) {
                    console.log('토큰이 만료되었습니다.')
                    logout()
                    return
                }

                const user = getUserFromToken(token)

                if (user) {
                    setUser(user)
                    console.log('사용자 인증 완료:', user.username)
                } else {
                    console.warn('토큰에서 사용자 정보를 추출할 수 없습니다.')
                    logout()
                }
            } catch (error) {
                console.error('인증 초기화 중 오류:', error)
                logout()
            }
        }

        if (!isAuthenticated) {
            initializeAuth()
        }
    }, [setUser, setLoading, logout, isAuthenticated])

    const {isLoading} = useAuthStore()
    return {loading: isLoading}
}