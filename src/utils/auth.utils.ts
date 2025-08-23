// 토큰 유효성 확인 (API 호출)
export const checkTokenValidity = async (): Promise<boolean> => {
    try {
        const baseUrl = import.meta.env.VITE_API_BASE_URL
        const response = await fetch(`${baseUrl}/api/user/me`, {
            credentials: 'include',
            headers: {
                'Accept': 'application/json'
            }
        })
        return response.ok
    } catch (error) {
        console.error('토큰 유효성 확인 실패:', error)
        return false
    }
}

// 토큰 갱신
export const refreshToken = async (): Promise<boolean> => {
    try {
        const baseUrl = import.meta.env.VITE_API_BASE_URL
        const response = await fetch(`${baseUrl}/api/auth/refresh`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })

        return response.ok
    } catch (error) {
        console.error('토큰 갱신 실패:', error)
        return false
    }
}

// 로그아웃 (클라이언트 측 쿠키 삭제)
export const performLogout = async (): Promise<void> => {
    document.cookie = 'accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=Strict'
    document.cookie = 'refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=Strict'

    console.log('쿠키 삭제 완료')
}