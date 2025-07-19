import type {ItemData, PrimaryStat} from '../types/item'

export const formatStatName = (statKey: string): string => {
    const cleanKey = statKey.replace(/^primary_(min|max)_/, '')

    const specialStats: Record<string, string> = {
        'weapon_damage': 'Physical Base Weapon Damage',
        'armor_rating': 'Armor Rating',
        'move_speed': 'Move Speed',
        'strength': 'Strength',
        'dexterity': 'Dexterity',
        'agility': 'Agility',
        'knowledge': 'Knowledge',
        'will': 'Will',
        'vigor': 'Vigor',
        'resourcefulness': 'Resourcefulness',
        'luck': 'Luck',
        'magical_power': 'Magical Power',
        'physical_power': 'Physical Power',
        'additional_magical_damage': 'Additional Magical Damage',
        'additional_physical_damage': 'Additional Physical Damage',
        'additional_weapon_damage': 'Additional Weapon Damage',
        'max_health': 'Max Health',
        'additional_armor_rating': 'Additional Armor Rating',
        'magic_resistance': 'Magic Resistance',
        'additional_move_speed': 'Additional Move Speed',
        'additional_memory_capacity': 'Additional Memory Capacity',
        'additional_weight_limit': 'Additional Weight Limit',
        'additional_utility_effectiveness': 'Additional Utility Effectiveness'
    }

    if (specialStats[cleanKey]) {
        return specialStats[cleanKey]
    }

    return cleanKey
        .split('_')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
}

export const extractPrimaryStats = (item: ItemData): PrimaryStat[] => {
    const stats: PrimaryStat[] = []
    const processedStats = new Set<string>()

    // 모든 키를 검사하여 primary_min_ 패턴을 찾음
    Object.keys(item).forEach(key => {
        if (key.startsWith('primary_min_')) {
            const statName = key.replace('primary_min_', '')

            if (processedStats.has(statName)) {
                return
            }

            const minKey = `primary_min_${statName}`
            const maxKey = `primary_max_${statName}`

            const minValue = item[minKey]
            const maxValue = item[maxKey]

            if (minValue !== undefined && maxValue !== undefined) {
                const displayName = formatStatName(minKey)

                let value: string | number
                if (minValue === maxValue) {
                    value = minValue
                } else {
                    value = `${minValue} to ${maxValue}`
                }

                stats.push({
                    name: displayName,
                    value
                })

                processedStats.add(statName)
            }
        }
    })

    return stats
}

/**
 * 희귀도별로 아이템들을 그룹화
 */
export const groupItemsByRarity = (items: ItemData[]): Record<string, ItemData> => {
    const grouped: Record<string, ItemData> = {}

    items.forEach(item => {
        grouped[item.rarity] = item
    })

    return grouped
}

/**
 * 사용 가능한 희귀도 목록 반환
 */
export const getAvailableRarities = (items: ItemData[]): string[] => {
    if (!items || items.length === 0) {
        return []
    }

    const availableRarities = new Set(items.map(item => item.rarity))
    return ['Poor', 'Common', 'Uncommon', 'Rare', 'Epic', 'Legendary', 'Unique', 'Artifact']
        .filter(rarity => availableRarities.has(rarity))
}