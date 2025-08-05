import {create} from 'zustand'

export interface User {
    username: string
    displayName?: string
    email?: string
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
        set({
            isAuthenticated: false,
            user: null
        })
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