import {describe, expect, it, vi} from 'vitest'
import {fireEvent, render, screen} from '@testing-library/react'
import {SearchBar} from './SearchBar.tsx'

describe('SearchBar 컴포넌트', () => {
    it('검색창이 렌더링되어야 한다', () => {
        // Given & When
        render(<SearchBar/>)

        // Then
        const searchInput = screen.getByPlaceholderText('아이템 검색...')
        expect(searchInput).toBeInTheDocument()
    })

    it('검색 아이콘이 표시되어야 한다', () => {
        // Given & When
        render(<SearchBar/>)

        // Then
        const searchIcon = screen.getByTestId('search-icon')
        expect(searchIcon).toBeInTheDocument()
    })

    it('입력값이 변경될 때 onChange 콜백이 호출되어야 한다', () => {
        // Given
        const mockOnChange = vi.fn()
        render(<SearchBar onChange={mockOnChange}/>)
        const searchInput = screen.getByPlaceholderText('아이템 검색...')

        // When
        fireEvent.change(searchInput, {target: {value: '검색어'}})

        // Then
        expect(mockOnChange).toHaveBeenCalledWith('검색어')
    })

    it('Enter 키를 누르면 onSearch 콜백이 호출되어야 한다', () => {
        // Given
        const mockOnSearch = vi.fn()
        render(<SearchBar onSearch={mockOnSearch}/>)
        const searchInput = screen.getByPlaceholderText('아이템 검색...')

        // When
        fireEvent.change(searchInput, {target: {value: '검색어'}})
        fireEvent.keyDown(searchInput, {key: 'Enter', code: 'Enter'})

        // Then
        expect(mockOnSearch).toHaveBeenCalledWith('검색어')
    })

    it('검색 아이콘을 클릭하면 onSearch 콜백이 호출되어야 한다', () => {
        // Given
        const mockOnSearch = vi.fn()
        render(<SearchBar onSearch={mockOnSearch}/>)
        const searchInput = screen.getByPlaceholderText('아이템 검색...')
        const searchIcon = screen.getByTestId('search-icon')

        // When
        fireEvent.change(searchInput, {target: {value: '검색어'}})
        fireEvent.click(searchIcon)

        // Then
        expect(mockOnSearch).toHaveBeenCalledWith('검색어')
    })

    it('기본값이 제공되면 입력창에 표시되어야 한다', () => {
        // Given
        const defaultValue = '기본 검색어'

        // When
        render(<SearchBar defaultValue={defaultValue}/>)

        // Then
        const searchInput = screen.getByDisplayValue(defaultValue)
        expect(searchInput).toBeInTheDocument()
    })

    it('비활성화 상태일 때 입력이 불가능해야 한다', () => {
        // Given & When
        render(<SearchBar disabled/>)

        // Then
        const searchInput = screen.getByPlaceholderText('아이템 검색...')
        expect(searchInput).toBeDisabled()
    })

    it('Material Tailwind 스타일이 적용되어야 한다', () => {
        // Given & When
        render(<SearchBar/>)

        // Then
        const searchContainer = screen.getByTestId('search-container')
        expect(searchContainer).toHaveClass('relative', 'flex', 'w-full')
    })
})