import type {ItemData, PrimaryStat, SecondaryStatOption} from '../types/item'

export const formatStatName = (statKey: string): string => {
    const cleanKey = statKey.replace(/^(primary|secondary)_(min|max)_/, '')

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

export const extractSecondaryOptions = (item: ItemData): SecondaryStatOption[] => {
    const options: SecondaryStatOption[] = []
    const processedStats = new Set<string>()
    console.log(item)

    // 모든 키를 검사하여 secondary_min_ 패턴을 찾음
    Object.keys(item).forEach(key => {
        if (key.startsWith('secondary_min_') && !key.includes('enchanted')) {
            const statName = key.replace('secondary_min_', '')

            if (processedStats.has(statName)) {
                return
            }

            const minKey = `secondary_min_${statName}`
            const maxKey = `secondary_max_${statName}`

            const minValue = item[minKey] as number
            const maxValue = item[maxKey] as number

            if (minValue !== undefined && maxValue !== undefined) {
                const displayName = formatStatName(minKey)

                options.push({
                    name: statName,
                    minValue,
                    maxValue,
                    displayName
                })

                processedStats.add(statName)
            }
        }
    })

    return options.sort((a, b) => a.displayName.localeCompare(b.displayName))
}


export const groupItemsByRarity = (items: ItemData[]): Record<string, ItemData> => {
    const grouped: Record<string, ItemData> = {}

    items.forEach(item => {
        grouped[item.rarity] = item
    })

    return grouped
}

export const getAvailableRarities = (items: ItemData[]): string[] => {
    if (!items || items.length === 0) {
        return []
    }

    const availableRarities = new Set(items.map(item => item.rarity))
    return ['Poor', 'Common', 'Uncommon', 'Rare', 'Epic', 'Legendary', 'Unique', 'Artifact']
        .filter(rarity => availableRarities.has(rarity))
}

export const getSecondarySlotsByRarity = (rarity: string): number => {
    const raritySlots: Record<string, number> = {
        'Poor': 0,
        'Common': 0,
        'Uncommon': 1,
        'Rare': 2,
        'Epic': 3,
        'Legendary': 4,
        'Unique': 1, // Unique는 특별한 경우로 1개의 강력한 옵션
        'Artifact': 5
    }

    return raritySlots[rarity] || 0
}