import {describe, expect, it, vi} from 'vitest'
import {render, screen} from '@testing-library/react'
import {MemoryRouter} from 'react-router-dom'
import userEvent from '@testing-library/user-event'
import Layout from './Layout'

const mockLogin = vi.fn()
const mockLogout = vi.fn()

vi.mock('../store/auth.store', () => ({
    useAuthStore: () => ({
        isAuthenticated: true,
        user: {
            username: 'testuser',
            displayName: 'Test User',
            avatarUrl: 'https://example.com/avatar.png'
        },
        login: mockLogin,
        logout: mockLogout,
    }),
}))

describe('Layout - Authenticated User', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('로그인한 상태에서는 사용자 정보와 로그아웃 버튼이 표시되어야 한다', () => {
        // Given
        render(
            <MemoryRouter>
                <Layout>
                    <div>test content</div>
                </Layout>
            </MemoryRouter>
        )

        // Then
        expect(screen.getByText('Test User')).toBeInTheDocument()
        expect(screen.getByText('로그아웃')).toBeInTheDocument()
        expect(screen.queryByText('디스코드 로그인')).not.toBeInTheDocument()
    })

    it('사용자 아바타가 표시되어야 한다', () => {
        // Given
        render(
            <MemoryRouter>
                <Layout>
                    <div>test content</div>
                </Layout>
            </MemoryRouter>
        )

        // Then
        const avatar = screen.getByAltText('User Avatar')
        expect(avatar).toBeInTheDocument()
        expect(avatar).toHaveAttribute('src', 'https://example.com/avatar.png')
    })

    it('로그아웃 버튼을 클릭하면 로그아웃 함수가 호출되어야 한다', async () => {
        // Given
        const user = userEvent.setup()
        render(
            <MemoryRouter>
                <Layout>
                    <div>test content</div>
                </Layout>
            </MemoryRouter>
        )

        // When
        await user.click(screen.getByText('로그아웃'))

        // Then
        expect(mockLogout).toHaveBeenCalledOnce()
    })
})