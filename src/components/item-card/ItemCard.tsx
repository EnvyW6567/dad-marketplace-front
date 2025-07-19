import React, {useEffect, useMemo, useState} from 'react'
import {type ItemData, RARITY_COLORS, RARITY_ROMAN} from '../../types/item.ts'
import {useDarkerDbApi} from '../../hooks/useDarkerDBApi.ts'
import {extractPrimaryStats, getAvailableRarities, groupItemsByRarity} from '../../utils/itemStats.ts'

interface ItemCardProps {
    itemName: string
    className?: string
}

const ItemCard: React.FC<ItemCardProps> = ({itemName, className = ''}) => {
    const [selectedRarity, setSelectedRarity] = useState<string>('Poor')

    // API 엔드포인트를 메모화하여 불필요한 재요청 방지
    const endpoint = useMemo(() => {
        return itemName ? `/items?archetype=${encodeURIComponent(itemName)}&condense=true` : ''
    }, [itemName])

    const {data, loading, error, refetch} = useDarkerDbApi<ItemData[]>(endpoint)

    // 계산된 값들을 메모화
    const {availableRarities, selectedItem} = useMemo(() => {
        console.log('Computing derived values...')

        if (!data || data.length === 0) {
            console.log('No data available')
            return {
                groupedItems: {},
                availableRarities: [],
                selectedItem: null
            }
        }

        const grouped = groupItemsByRarity(data)
        const rarities = getAvailableRarities(data)
        const item = grouped[selectedRarity] || data[0]

        console.log('Computed values:', {
            groupedKeys: Object.keys(grouped),
            availableRarities: rarities,
            selectedItem: item?.name,
            selectedRarity
        })

        return {
            groupedItems: grouped,
            availableRarities: rarities,
            selectedItem: item
        }
    }, [data, selectedRarity])

    // 첫 번째 사용 가능한 희귀도로 초기화
    useEffect(() => {
        if (availableRarities.length > 0 && !(availableRarities as string[]).includes(selectedRarity)) {
            console.log('Updating rarity from', selectedRarity, 'to', availableRarities[0])
            setSelectedRarity(availableRarities[0])
        }
    }, [availableRarities, selectedRarity])

    // Primary 스탯 메모화
    const primaryStats = useMemo(() => {
        const stats = selectedItem ? extractPrimaryStats(selectedItem) : []
        console.log('Primary stats:', stats.length)
        return stats
    }, [selectedItem])

    const handleRarityChange = (rarity: string) => {
        console.log('Rarity changed to:', rarity)
        setSelectedRarity(rarity)
    }

    const handleRetry = () => {
        console.log('Retrying API call...')
        refetch()
    }

    if (loading) {
        return (
            <div className={`bg-white border border-gray-200 rounded-lg p-4 shadow-sm ${className}`}>
                <div className="animate-pulse">
                    <div className="text-center text-gray-500 py-8">
                        <div className="text-4xl mb-2">⏳</div>
                        <p>아이템 정보를 불러오는 중...</p>
                        <p className="text-sm mt-1 text-gray-600">"{itemName}"</p>
                    </div>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className={`bg-red-50 border border-red-200 rounded-lg p-4 shadow-sm ${className}`}>
                <div className="text-red-600 text-center">
                    <div className="text-4xl mb-2">⚠️</div>
                    <p className="font-bold mb-2">오류 발생</p>
                    <p className="text-sm mb-4">{error}</p>
                    <button
                        onClick={handleRetry}
                        className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded transition-colors"
                    >
                        다시 시도
                    </button>
                </div>
            </div>
        )
    }

    if (!selectedItem) {
        return (
            <div className={`bg-white border border-gray-200 rounded-lg p-4 shadow-sm ${className}`}>
                <div className="text-gray-500 text-center py-8">
                    <div className="text-4xl mb-2">🔍</div>
                    <p className="font-medium">아이템을 찾을 수 없습니다</p>
                    <p className="text-sm mt-1 text-gray-600">"{itemName}"</p>
                    <p className="text-xs mt-2 text-gray-400">
                        API 응답: {data?.length || 0}개 아이템
                    </p>
                </div>
            </div>
        )
    }

    return (
        <div className={`bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm ${className}`}>
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
                {/* 아이템 이름 */}
                <h3 className="text-xl font-bold text-gray-900 text-center mb-4">
                    {selectedItem.name}
                </h3>

                {/* 아이템 이미지 영역 */}
                <div
                    className="bg-gray-100 rounded-lg p-8 mb-4 flex items-center justify-center min-h-[60px] max-h-60">
                    <div className="text-4xl text-gray-400">
                        <img
                            src={`${import.meta.env.VITE_API_DARKER_DB_URL}/items/${selectedItem.id}/icon`}
                            alt={selectedItem.name}
                            className="max-h-50"
                        />
                    </div>
                </div>

                {/* Primary 스탯 */}
                <div className="space-y-2">
                    {primaryStats.map((stat, index) => (
                        <div key={index} className="flex justify-between items-center py-1 text-sm">
                            <span className="text-gray-900 font-mono pr-5">-</span>
                            <span className="text-gray-700 flex-1 text-center flex justify-between">
                                <span>{stat.name}</span>
                                <span>{stat.value}</span>
                            </span>
                            <span className="text-gray-900 font-mono pl-5"> -</span>
                        </div>
                    ))}
                </div>

                {/* 아이템 정보 */}
                <div className="mt-4 pt-4 border-t border-gray-200 text-xs text-gray-600">
                    <div className="grid grid-cols-2 gap-2">
                        <div>
                            <span className="font-medium">타입:</span> {selectedItem.type}
                        </div>
                        <div>
                            <span className="font-medium">슬롯:</span> {selectedItem.slot_type || 'N/A'}
                        </div>
                        <div>
                            <span className="font-medium">기어 스코어:</span> {selectedItem.gear_score}
                        </div>
                        <div>
                            <span className="font-medium">판매가:</span> {selectedItem.vendor_price}G
                        </div>
                    </div>
                </div>

                {/* 아이템 설명 */}
                {selectedItem.description && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                        <p className="text-gray-600 text-sm italic text-center">
                            {selectedItem.description}
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ItemCard