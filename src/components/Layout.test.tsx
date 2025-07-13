import {describe, expect, it, vi} from 'vitest'
import {render, screen} from '@testing-library/react'
import {MemoryRouter} from 'react-router-dom'
import userEvent from '@testing-library/user-event'
import Layout from './Layout'

const mockLogin = vi.fn()
const mockLogout = vi.fn()

vi.mock('../store/auth.store', () => ({
    useAuthStore: () => ({
        isAuthenticated: false,
        user: null,
        login: mockLogin,
        logout: mockLogout,
    }),
}))

describe('Layout', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('로고가 표시되어야 한다', () => {
        // Given
        render(
            <MemoryRouter>
                <Layout>
                    <div>test content</div>
                </Layout>
            </MemoryRouter>
        )

        // Then
        expect(screen.getByText('Highroller Market')).toBeInTheDocument()
    })

    it('네비게이션 메뉴가 표시되어야 한다', () => {
        // Given
        render(
            <MemoryRouter>
                <Layout>
                    <div>test content</div>
                </Layout>
            </MemoryRouter>
        )

        // Then
        expect(screen.getByText('홈')).toBeInTheDocument()
        expect(screen.getByText('아이템 등록')).toBeInTheDocument()
        expect(screen.getByText('마이 페이지')).toBeInTheDocument()
    })

    it('로그인하지 않은 상태에서는 로그인 버튼이 표시되어야 한다', () => {
        // Given
        render(
            <MemoryRouter>
                <Layout>
                    <div>test content</div>
                </Layout>
            </MemoryRouter>
        )

        // Then
        expect(screen.getByText('디스코드 로그인')).toBeInTheDocument()
        expect(screen.queryByText('로그아웃')).not.toBeInTheDocument()
    })

    it('로그인 버튼을 클릭하면 로그인 함수가 호출되어야 한다', async () => {
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
        await user.click(screen.getByText('디스코드 로그인'))

        // Then
        expect(mockLogin).toHaveBeenCalledOnce()
    })

    it('자식 컴포넌트가 메인 영역에 렌더링되어야 한다', () => {
        // Given
        const testContent = 'This is test content'

        render(
            <MemoryRouter>
                <Layout>
                    <div>{testContent}</div>
                </Layout>
            </MemoryRouter>
        )

        // Then
        expect(screen.getByText(testContent)).toBeInTheDocument()
    })

    it('네비게이션 링크들이 올바른 경로로 연결되어야 한다', () => {
        // Given
        render(
            <MemoryRouter>
                <Layout>
                    <div>test content</div>
                </Layout>
            </MemoryRouter>
        )

        // Then
        expect(screen.getByRole('link', {name: '홈'})).toHaveAttribute('href', '/')
        expect(screen.getByRole('link', {name: '아이템 등록'})).toHaveAttribute('href', '/register')
        expect(screen.getByRole('link', {name: '마이 페이지'})).toHaveAttribute('href', '/my-items')
    })
})