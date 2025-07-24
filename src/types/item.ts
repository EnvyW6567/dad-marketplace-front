import type {User} from "../store/auth.store.ts";

export interface ItemData {
    id: string
    cursor: number
    archetype: string
    name: string
    rarity: string
    description: string
    type: string
    armor_type?: string
    slot_type?: string
    max_stack_size: number
    inventory_width: number
    inventory_height: number
    vendor_price: number
    time_to_equip: number
    gear_score: number
    adventure_points?: number
    experience: number
    num_primary_attributes: number
    num_secondary_attributes: number

    [key: string]: string | number | undefined
}

export interface DarkerDbResponse<T> {
    version: string
    status: string
    code: number
    query_time: number
    query_date: string
    stage: string
    build: string
    patch: number
    meta: {
        method: string
        request: string
        query: Record<string, string>
        params: string[]
    }
    pagination: {
        count: number
        limit: number
        page: number
        num_pages: number
        total: number
    }
    body: T
}

export interface PrimaryStat {
    name: string
    value: string | number
}

export interface SecondaryStatOption {
    name: string
    minValue: number
    maxValue: number
    displayName: string
}


export const RARITY_COLORS: Record<string, string> = {
    'Poor': 'bg-gray-600',
    'Common': 'bg-gray-500',
    'Uncommon': 'bg-green-600',
    'Rare': 'bg-blue-600',
    'Epic': 'bg-purple-600',
    'Legendary': 'bg-yellow-600',
    'Unique': 'bg-[#e3dd95]',
    'Artifact': 'bg-red-600'
}

export const RARITY_COLORS_TEXT: Record<string, string> = {
    'Poor': 'text-gray-600',
    'Common': 'text-gray-700',
    'Uncommon': 'text-green-600',
    'Rare': 'text-blue-600',
    'Epic': 'text-purple-600',
    'Legendary': 'text-yellow-600',
    'Unique': 'text-[#e3dd95]',
    'Artifact': 'text-red-600'
};

export const RARITY_ROMAN: Record<string, string> = {
    'Poor': 'I',
    'Common': 'II',
    'Uncommon': 'III',
    'Rare': 'IV',
    'Epic': 'V',
    'Legendary': 'VI',
    'Unique': 'VII',
    'Artifact': 'VIII'
}

export interface Equipment {
    name: string
    archetype: string
    id: string
}

export interface RegisteredItemData {
    id: string
    name: string
    rarity: string
    options: Option[]
    type: 'WTS' | 'WTB'
    user: User
    description: string
    price: string
}

export interface Option {
    name: string,
    value: string | number | undefined
    isPrimary: boolean
}