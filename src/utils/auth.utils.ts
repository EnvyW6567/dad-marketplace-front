import type {User} from "../store/auth.store.ts";

export const decodeJWT = (token: string): any | null => {
    try {
        const parts = token.split('.')
        if (parts.length !== 3) {
            return null
        }

        const payload = parts[1]
        const decodedPayload = atob(payload.replace(/-/g, '+').replace(/_/g, '/'))

        return JSON.parse(decodedPayload)
    } catch (error) {
        console.error('JWT 디코딩 실패:', error)
        return null
    }
}

export const getUserFromToken = (token: string): User | null => {
    const decoded = decodeJWT(token)
    if (!decoded) {
        return null
    }

    // JWT 페이로드에서 사용자 정보 매핑
    return {
        username: decoded.username || decoded.user?.username,
        displayName: decoded.displayName || decoded.user?.displayName,
        email: decoded.email || decoded.user?.email,
        avatarUrl: decoded.avatarUrl || decoded.user?.avatarUrl
    }
}

export const isTokenExpired = (token: string): boolean => {
    const decoded = decodeJWT(token)
    if (!decoded || !decoded.exp) {
        return true
    }

    const currentTime = Date.now() / 1000
    return decoded.exp < currentTime
}

export const getCookieValue = (name: string): string | null => {
    const value = `; ${document.cookie}`
    const parts = value.split(`; ${name}=`)

    if (parts.length === 2) {
        const cookieValue = parts.pop()?.split(';').shift()
        return cookieValue || null
    }
    return null
}

export const getAccessToken = (): string | null => {
    return getCookieValue('accessToken')
}

export const getRefreshToken = (): string | null => {
    return getCookieValue('refreshToken')
}