export interface ApiResponse<T> {
    success: boolean
    data?: T
    message?: string
    error?: string
}

export interface UseApiReturn<T> {
    data: T | null
    loading: boolean
    error: string | null
    refetch: () => void
}