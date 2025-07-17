import React, {type KeyboardEvent, useState} from 'react'

interface SearchBarProps {
    placeholder?: string
    defaultValue?: string
    disabled?: boolean
    onChange?: (value: string) => void
    onSearch?: (value: string) => void
    className?: string
}

export const SearchBar = ({
                              placeholder = '아이템 검색...',
                              defaultValue = '',
                              disabled = false,
                              onChange,
                              onSearch,
                              className = ''
                          }: SearchBarProps) => {
    const [value, setValue] = useState(defaultValue)

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value
        setValue(newValue)
        onChange?.(newValue)
    }

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onSearch?.(value)
        }
    }

    const handleSearchClick = () => {
        onSearch?.(value)
    }

    const handleClearClick = () => {
        setValue('')
        onChange?.('')
    }

    return (
        <div
            data-testid="search-container"
            className={`relative flex w-full max-w-[48rem] ${className}`}
            style={{minWidth: '400px'}}
        >
            <input
                type="text"
                value={value}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder={placeholder}
                disabled={disabled}
                className="peer w-full rounded-md border border-blue-gray-200 bg-transparent px-3 py-2.5 pl-9 pr-9 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 focus:border-2 focus:border-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
            />

            {/* Search Icon */}
            <div
                className="absolute top-2/4 left-3 grid h-5 w-5 -translate-y-2/4 place-items-center text-blue-gray-500">
                <svg
                    data-testid="search-icon"
                    onClick={disabled ? undefined : handleSearchClick}
                    className={`h-5 w-5 ${!disabled ? 'cursor-pointer hover:text-gray-900' : 'cursor-not-allowed'}`}
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        clipRule="evenodd"
                        d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
                        fillRule="evenodd"
                    />
                </svg>
            </div>

            {/* Clear Button - 텍스트가 있을 때만 표시 */}
            {value && !disabled && (
                <div
                    className="absolute top-2/4 right-3 grid h-5 w-5 -translate-y-2/4 place-items-center text-blue-gray-500">
                    <svg
                        data-testid="clear-button"
                        onClick={handleClearClick}
                        className="h-4 w-4 cursor-pointer hover:text-gray-900"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fillRule="evenodd"
                            d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
                            clipRule="evenodd"
                        />
                    </svg>
                </div>
            )}
        </div>
    )
}