import React, {type KeyboardEvent, useEffect, useRef, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import type {Equipment} from "../../types/item.ts";

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
                              className = ''
                          }: SearchBarProps) => {
    const [value, setValue] = useState(defaultValue)
    const [equipments, setEquipments] = useState<Equipment[]>([])
    const [filteredEquipments, setFilteredEquipments] = useState<Equipment[]>([])
    const [showAutocomplete, setShowAutocomplete] = useState(false)
    const [selectedIndex, setSelectedIndex] = useState(-1)
    const [isDataLoaded, setIsDataLoaded] = useState(false)

    const containerRef = useRef<HTMLDivElement>(null)
    const inputRef = useRef<HTMLInputElement>(null)
    const itemRefs = useRef<(HTMLDivElement | null)[]>([])
    const navigate = useNavigate()

    useEffect(() => {
        if (selectedIndex >= 0 && itemRefs.current[selectedIndex]) {
            itemRefs.current[selectedIndex]?.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest'
            })
        }
    }, [selectedIndex])

    // Equipments 데이터 로드
    const loadEquipments = async () => {
        if (isDataLoaded) return

        try {
            const apiBaseUrl = import.meta.env.VITE_API_BASE_URL
            const response = await fetch(`${apiBaseUrl}/api/search-keyword/equipments`)

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }

            const data = await response.json()
            setEquipments(data.body || [])
            setIsDataLoaded(true)
        } catch (error) {
            console.error('equipments 데이터 로드 실패:', error)
        }
    }

    // 검색어에 따른 필터링
    useEffect(() => {
        if (equipments.length > 0 && value.trim()) {
            // 검색어가 있을 때만 필터링하여 표시
            const filtered = equipments.filter(equipment =>
                equipment.name.toLowerCase().includes(value.toLowerCase())
            )
            setFilteredEquipments(filtered)
            setShowAutocomplete(filtered.length > 0)
        } else {
            // 검색어가 없으면 auto-complete 숨김
            setFilteredEquipments([])
            setShowAutocomplete(false)
        }
        setSelectedIndex(-1)
    }, [value, equipments])

    useEffect(() => {
        console.log(filteredEquipments)
    }, [filteredEquipments]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value
        setValue(newValue)
    }

    const executeSearch = (selectedEquipment: Equipment) => {
        if (selectedEquipment) {
            setShowAutocomplete(false)
            navigate(`/search`, {state: selectedEquipment})
        }
    }

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault()
                setSelectedIndex(prev =>
                    prev < filteredEquipments.length - 1 ? prev + 1 : prev
                )
                break
            case 'ArrowUp':
                e.preventDefault()
                setSelectedIndex(prev => prev > 0 ? prev - 1 : -1)
                break
            case 'Enter':
                e.preventDefault()
                if (selectedIndex >= 0) {
                    const selectedEquipment = filteredEquipments[selectedIndex]

                    setValue(selectedEquipment.name)
                    executeSearch(selectedEquipment)
                }
                break
            case 'Escape':
                setShowAutocomplete(false)
                setSelectedIndex(-1)
                break
        }
    }

    const handleClearClick = () => {
        setValue('')
        setShowAutocomplete(false)
    }

    const handleFocus = () => {
        loadEquipments()
        // 데이터가 이미 로드되어 있고 검색어가 있으면 auto-complete 표시
        if (equipments.length > 0 && value.trim()) {
            const filtered = equipments.filter(equipment =>
                equipment.name.toLowerCase().includes(value.toLowerCase())
            )
            setFilteredEquipments(filtered)
            setShowAutocomplete(filtered.length > 0)
        }
    }

    const handleBlur = (e: React.FocusEvent) => {
        if (containerRef.current?.contains(e.relatedTarget as Node)) {
            return
        }
        setTimeout(() => setShowAutocomplete(false), 150)
    }

    const handleAutocompleteClick = (equipment: Equipment) => {
        setValue(equipment.name)
        setShowAutocomplete(false)
        executeSearch(equipment)
    }

    return (
        <div
            ref={containerRef}
            data-testid="search-container"
            className={`relative flex w-full max-w-[48rem] ${className}`}
            style={{minWidth: '400px'}}
        >
            <input
                ref={inputRef}
                type="text"
                value={value}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                onFocus={handleFocus}
                onBlur={handleBlur}
                placeholder={placeholder}
                disabled={disabled}
                className="peer w-full rounded-md border border-blue-gray-200 bg-transparent px-3 py-3 pl-6 pr-9 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 focus:border-2 focus:border-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
            />

            {/* Clear Button - 텍스트가 있을 때만 표시 */}
            {
                value && !disabled && (
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
                )
            }

            {/* Autocomplete Dropdown */}
            {
                showAutocomplete && filteredEquipments.length > 0 && (
                    <ul
                        data-testid="autocomplete-list"
                        className="absolute top-full left-0 right-0 z-10 mt-1 max-h-60 overflow-auto rounded-md border border-gray-200 bg-white shadow-lg"
                    >
                        {filteredEquipments.map((equipment, index) => (
                            <div
                                key={`${equipment.id}_${index}`}
                                ref={el => {
                                    itemRefs.current[index] = el
                                }}
                                onClick={() => handleAutocompleteClick(equipment)}
                                className={`cursor-pointer px-3 py-2 text-sm hover:bg-gray-100 ${
                                    index === selectedIndex ? 'bg-gray-100' : ''
                                }`}
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-[3em] h-[3em] flex items-center justify-center flex-shrink-0">
                                        <img
                                            src={`${import.meta.env.VITE_API_DARKER_DB_URL_ICON}/items/${equipment.id}/icon`}
                                            alt={equipment.name}
                                            className="max-w-full max-h-full object-contain"
                                        />
                                    </div>
                                    <div className="font-medium text-gray-900">{equipment.name}</div>
                                </div>
                            </div>
                        ))}
                    </ul>
                )
            }
        </div>
    )
}