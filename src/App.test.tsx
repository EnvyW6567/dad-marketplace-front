import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import App from './App'

describe('App Routing', () => {
    it('메인 페이지("/")로 이동하면 홈 컴포넌트가 렌더링되어야 한다', () => {
        // Given
        render(
            <MemoryRouter initialEntries={['/']}>
                <App />
            </MemoryRouter>
        )

        // Then
        expect(screen.getByTestId('home-page')).toBeInTheDocument()
    })

    it('아이템 등록 페이지("/register")로 이동하면 등록 컴포넌트가 렌더링되어야 한다', () => {
        // Given
        render(
            <MemoryRouter initialEntries={['/register']}>
                <App />
            </MemoryRouter>
        )

        // Then
        expect(screen.getByTestId('register-page')).toBeInTheDocument()
    })

    it('마이 페이지("/my-items")로 이동하면 마이페이지 컴포넌트가 렌더링되어야 한다', () => {
        // Given
        render(
            <MemoryRouter initialEntries={['/my-items']}>
                <App />
            </MemoryRouter>
        )

        // Then
        expect(screen.getByTestId('my-items-page')).toBeInTheDocument()
    })

    it('존재하지 않는 경로로 이동하면 404 페이지가 렌더링되어야 한다', () => {
        // Given
        render(
            <MemoryRouter initialEntries={['/non-existent-page']}>
                <App />
            </MemoryRouter>
        )

        // Then
        expect(screen.getByTestId('not-found-page')).toBeInTheDocument()
    })
})