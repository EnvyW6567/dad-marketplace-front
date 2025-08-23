import {create} from 'zustand'
import {performLogout} from '../utils/auth.utils'

export interface User {
    username: string
    displayName?: string
    avatarUrl?: string
}

interface AuthState {
    isAuthenticated: boolean
    user: User | null
    isLoading: boolean
    login: () => void
    logout: () => Promise<void>
    setUser: (user: User) => void
    setLoading: (loading: boolean) => void
}

export const useAuthStore = create<AuthState>((set) => ({
    isAuthenticated: false,
    user: null,
    isLoading: true,

    login: () => {
        window.location.href = `${import.meta.env.VITE_API_BASE_URL}/api/auth/login/discord`
    },

    logout: async () => {
        try {
            await performLogout()
        } catch (error) {
            console.error('로그아웃 처리 중 오류:', error)
        } finally {
            set({
                isAuthenticated: false,
                user: null,
                isLoading: false
            })
        }
    },

    setUser: (user: User) => {
        set({
            user,
            isAuthenticated: true,
            isLoading: false
        })
    },

    setLoading: (loading: boolean) => {
        set({isLoading: loading})
    },
}))