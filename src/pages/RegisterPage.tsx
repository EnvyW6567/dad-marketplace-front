import React, {useMemo, useState} from 'react'
import {useLocation, useNavigate} from 'react-router-dom'
import {RARITY_COLORS, RARITY_ROMAN, type SecondaryStatOption} from '../types/item'
import {
    extractPrimaryStats,
    extractSecondaryOptions,
    getAvailableRarities,
    getSecondarySlotsByRarity,
    groupItemsByRarity,
} from '../utils/itemStats'

interface SecondaryOption {
    stat: SecondaryStatOption
    value: number
}

const RegisterPage: React.FC = () => {
    const location = useLocation()
    const navigate = useNavigate()

    const {archetype, itemData} = location.state || {}

    const [selectedRarity, setSelectedRarity] = useState<string>('Poor')
    const [primaryStats, setPrimaryStats] = useState<Record<string, number>>({})
    const [secondaryOptions, setSecondaryOptions] = useState<SecondaryOption[]>([])
    
    const {availableRarities, selectedItem} = useMemo(() => {
        if (!itemData || !Array.isArray(itemData)) {
            return {
                groupedItems: {},
                availableRarities: [],
                selectedItem: null
            }
        }

        const grouped = groupItemsByRarity(itemData)
        const rarities = getAvailableRarities(itemData)
        const item = grouped[selectedRarity] || itemData[0]

        return {
            groupedItems: grouped,
            availableRarities: rarities,
            selectedItem: item
        }
    }, [itemData, selectedRarity])

    // Primary 스탯과 Secondary 옵션 계산
    const currentPrimaryStats = useMemo(() => {
        return selectedItem ? extractPrimaryStats(selectedItem) : []
    }, [selectedItem])

    const availableSecondaryOptions = useMemo(() => {
        return selectedItem ? extractSecondaryOptions(selectedItem) : []
    }, [selectedItem])

    const maxSecondarySlots = useMemo(() => {
        return getSecondarySlotsByRarity(selectedRarity)
    }, [selectedRarity])

    // early return을 hooks 이후에 배치
    if (!archetype || !itemData) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <p className="text-gray-600">잘못된 접근입니다.</p>
                    <button
                        onClick={() => navigate('/')}
                        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        홈으로 돌아가기
                    </button>
                </div>
            </div>
        )
    }

    // Primary 스탯 값 변경
    const handlePrimaryStatChange = (statName: string, value: number) => {
        setPrimaryStats(prev => ({
            ...prev,
            [statName]: value
        }))
    }

    // Secondary 옵션 추가
    const addSecondaryOption = () => {
        if (secondaryOptions.length < maxSecondarySlots && availableSecondaryOptions.length > 0) {
            const firstAvailable = availableSecondaryOptions[0]
            setSecondaryOptions(prev => [...prev, {
                stat: firstAvailable,
                value: firstAvailable.minValue
            }])
        }
    }

    // Secondary 옵션 제거
    const removeSecondaryOption = (index: number) => {
        setSecondaryOptions(prev => prev.filter((_, i) => i !== index))
    }

    // Secondary 옵션 스탯 변경
    const changeSecondaryOptionStat = (index: number, newStat: SecondaryStatOption) => {
        setSecondaryOptions(prev => prev.map((opt, i) =>
            i === index ? {stat: newStat, value: newStat.minValue} : opt
        ))
    }

    // Secondary 옵션 값 변경
    const changeSecondaryOptionValue = (index: number, value: number) => {
        setSecondaryOptions(prev => prev.map((opt, i) =>
            i === index ? {...opt, value} : opt
        ))
    }

    // 희귀도 변경 시 Secondary 옵션 초기화
    const handleRarityChange = (rarity: string) => {
        setSelectedRarity(rarity)
        setSecondaryOptions([])
        setPrimaryStats({})
    }

    // 사용 가능한 Secondary 옵션 필터링 (이미 선택된 것 제외)
    const getAvailableOptionsForSlot = (currentIndex: number) => {
        const usedStats = secondaryOptions
            .filter((_, index) => index !== currentIndex)
            .map(opt => opt.stat.name)

        return availableSecondaryOptions.filter(opt => !usedStats.includes(opt.name))
    }

    const handleSubmit = () => {
        // TODO: 아이템 등록 API 호출
        console.log('등록할 아이템:', {
            archetype,
            rarity: selectedRarity,
            primaryStats,
            secondaryOptions
        })
        alert('아이템이 등록되었습니다!')
        navigate('/')
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-4xl mx-auto pt-8 px-4">
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">아이템 등록</h1>
                    <p className="text-gray-600">{archetype} 아이템을 등록합니다</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
                    {/* 좌측: 아이템 미리보기 */}
                    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                        {/* 희귀도 탭 */}
                        <div className="flex border-b border-gray-200">
                            {availableRarities.map((rarity) => (
                                <button
                                    key={rarity}
                                    onClick={() => handleRarityChange(rarity)}
                                    className={`px-3 py-2 text-sm font-medium transition-colors flex-1 ${
                                        selectedRarity === rarity
                                            ? `${RARITY_COLORS[rarity]} text-white`
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                                    title={rarity}
                                >
                                    {RARITY_ROMAN[rarity]}
                                </button>
                            ))}
                        </div>

                        {/* 아이템 정보 */}
                        <div className="p-5">
                            <h3 className="text-xl font-bold text-gray-900 text-center mb-4">
                                {selectedItem?.name}
                            </h3>

                            {/* 아이템 이미지 */}
                            {selectedItem && (
                                <div className="bg-gray-100 rounded-lg p-8 mb-4 flex items-center justify-center">
                                    <img
                                        src={`${import.meta.env.VITE_API_DARKER_DB_URL_ICON}/items/${selectedItem.id}/icon`}
                                        alt={selectedItem.name}
                                        className="max-h-20"
                                    />
                                </div>
                            )}

                            {/* Primary 스탯 표시 */}
                            <div className="space-y-2 mb-4">
                                {currentPrimaryStats.map((stat, index) => (
                                    <div key={index} className="flex justify-between items-center py-1 text-sm">
                                        <span className="text-gray-900 font-mono pr-5">-</span>
                                        <span className="text-gray-700 flex-1 text-center flex justify-between">
                                            <span>{stat.name}</span>
                                            <span className="font-semibold">
                                                {primaryStats[stat.name] || stat.value}
                                            </span>
                                        </span>
                                        <span className="text-gray-900 font-mono pl-5">-</span>
                                    </div>
                                ))}
                            </div>

                            {/* Secondary 스탯 표시 */}
                            {secondaryOptions.length > 0 && (
                                <div className="space-y-1 pt-4 border-t border-gray-200">
                                    {secondaryOptions.map((option, index) => (
                                        <div key={index}
                                             className="flex justify-between items-center py-1 text-sm text-blue-700">
                                            <span className="text-gray-900 font-mono pr-5">-</span>
                                            <span className="flex-1 text-center flex justify-between">
                                                <span>{option.stat.displayName}</span>
                                                <span className="font-semibold">{option.value}</span>
                                            </span>
                                            <span className="text-gray-900 font-mono pl-5">-</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* 우측: 옵션 설정 */}
                    <div className="space-y-6">
                        {/* Primary 스탯 설정 */}
                        <div className="bg-white border border-gray-200 rounded-lg p-4">
                            <h3 className="text-lg font-semibold text-gray-900 mb-3">Primary 스탯</h3>
                            <div className="space-y-3">
                                {currentPrimaryStats.map((stat, index) => {
                                    const [min, max] = typeof stat.value === 'string' && stat.value.includes('to')
                                        ? stat.value.split(' to ').map(Number)
                                        : [stat.value, stat.value] as number[]

                                    const currentValue = primaryStats[stat.name] || min as number

                                    return (
                                        <div key={index} className="flex items-center justify-between">
                                            <label className="text-sm font-medium text-gray-700 flex-1 min-w-0 pr-3">
                                                {stat.name}
                                            </label>
                                            <div className="flex items-center space-x-2">
                                                <span className="text-xs text-gray-500 w-6 text-center">{min}</span>
                                                <button
                                                    type="button"
                                                    onClick={() => handlePrimaryStatChange(stat.name, Math.max(min as number, currentValue - 1))}
                                                    disabled={currentValue <= min}
                                                    className="w-6 h-6 flex items-center justify-center border border-gray-300 rounded text-xs text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                                >
                                                    -
                                                </button>
                                                <input
                                                    type="number"
                                                    min={min}
                                                    max={max}
                                                    value={currentValue}
                                                    onChange={(e) => {
                                                        const value = Number(e.target.value)
                                                        if (value >= min && value <= max) {
                                                            handlePrimaryStatChange(stat.name, value)
                                                        }
                                                    }}
                                                    className="w-16 px-1 py-1 text-xs text-center border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => handlePrimaryStatChange(stat.name, Math.min(max, currentValue + 1))}
                                                    disabled={currentValue >= max}
                                                    className="w-6 h-6 flex items-center justify-center border border-gray-300 rounded text-xs text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                                >
                                                    +
                                                </button>
                                                <span className="text-xs text-gray-500 w-6 text-center">{max}</span>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>

                        {/* Secondary 옵션 설정 */}
                        {maxSecondarySlots > 0 && (
                            <div className="bg-white border border-gray-200 rounded-lg p-4">
                                <div className="flex justify-between items-center mb-3">
                                    <h3 className="text-lg font-semibold text-gray-900">
                                        Secondary 옵션 ({secondaryOptions.length}/{maxSecondarySlots})
                                    </h3>
                                    {secondaryOptions.length < maxSecondarySlots && (
                                        <button
                                            onClick={addSecondaryOption}
                                            className="px-2 py-1 bg-green-600 text-white text-xs rounded hover:bg-green-700"
                                        >
                                            추가
                                        </button>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    {secondaryOptions.map((option, index) => {
                                        const availableOptions = getAvailableOptionsForSlot(index)

                                        return (
                                            <div key={index} className="border border-gray-200 rounded p-2">
                                                <div className="flex items-center justify-between mb-2">
                                                    <span className="text-xs font-medium text-gray-700">
                                                        옵션 {index + 1}
                                                    </span>
                                                    <button
                                                        onClick={() => removeSecondaryOption(index)}
                                                        className="text-red-600 hover:text-red-800 text-xs"
                                                    >
                                                        제거
                                                    </button>
                                                </div>

                                                <div className="space-y-2">
                                                    <select
                                                        value={option.stat.name}
                                                        onChange={(e) => {
                                                            const newStat = availableSecondaryOptions.find(s => s.name === e.target.value)
                                                            if (newStat) changeSecondaryOptionStat(index, newStat)
                                                        }}
                                                        className="w-full p-1 border border-gray-300 rounded text-xs focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                                    >
                                                        {availableOptions.map(stat => (
                                                            <option key={stat.name} value={stat.name}>
                                                                {stat.displayName}
                                                            </option>
                                                        ))}
                                                    </select>

                                                    <div className="flex items-center justify-between">
                                                        <span
                                                            className="text-xs text-gray-600 truncate flex-1 min-w-0 pr-2">
                                                            {option.stat.displayName}
                                                        </span>
                                                        <div className="flex items-center space-x-1">
                                                            <span
                                                                className="text-xs text-gray-500 w-6 text-center">{option.stat.minValue}</span>
                                                            <button
                                                                type="button"
                                                                onClick={() => changeSecondaryOptionValue(index, Math.max(option.stat.minValue, option.value - 1))}
                                                                disabled={option.value <= option.stat.minValue}
                                                                className="w-6 h-6 flex items-center justify-center border border-gray-300 rounded text-xs text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                                            >
                                                                -
                                                            </button>
                                                            <input
                                                                type="number"
                                                                min={option.stat.minValue}
                                                                max={option.stat.maxValue}
                                                                value={option.value}
                                                                onChange={(e) => {
                                                                    const value = Number(e.target.value)
                                                                    if (value >= option.stat.minValue && value <= option.stat.maxValue) {
                                                                        changeSecondaryOptionValue(index, value)
                                                                    }
                                                                }}
                                                                className="w-16 px-1 py-1 text-xs text-center border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                                            />
                                                            <button
                                                                type="button"
                                                                onClick={() => changeSecondaryOptionValue(index, Math.min(option.stat.maxValue, option.value + 1))}
                                                                disabled={option.value >= option.stat.maxValue}
                                                                className="w-6 h-6 flex items-center justify-center border border-gray-300 rounded text-xs text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                                            >
                                                                +
                                                            </button>
                                                            <span
                                                                className="text-xs text-gray-500 w-6 text-center">{option.stat.maxValue}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        )}

                        {/* 등록 버튼 */}
                        <div className="flex space-x-3">
                            <button
                                onClick={() => navigate(-1)}
                                className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                            >
                                취소
                            </button>
                            <button
                                onClick={handleSubmit}
                                className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                            >
                                등록하기
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RegisterPage