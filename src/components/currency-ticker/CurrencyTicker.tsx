import React, {useEffect, useMemo, useRef, useState} from 'react'
import {representativeCurrencies} from '../../constants/representative-currencies'
import {useDarkerDbApi} from '../../hooks/useDarkerDBApi'

interface MarketData {
    price: number
}

const CurrencyItem: React.FC<{ currency: typeof representativeCurrencies[0] }> = ({currency}) => {
    const endpoint = `/market?item=${currency.name}&has_sold=true&order=desc&limit=10`
    const {data, loading, error} = useDarkerDbApi<MarketData[]>(endpoint)
    const [showName, setShowName] = useState(true)
    const containerRef = useRef<HTMLDivElement>(null)

    const averagePrice = useMemo(() => {
        if (!data || data.length === 0) return 0
        const total = data.reduce((sum, item) => sum + item.price, 0)
        return Math.round(total / data.length)
    }, [data])

    useEffect(() => {
        const checkOverflow = () => {
            if (containerRef.current) {
                const container = containerRef.current
                const isOverflowing = container.scrollWidth > container.offsetWidth

                setShowName(!isOverflowing)
            }
        }

        checkOverflow()
        window.addEventListener('resize', checkOverflow)
        return () => window.removeEventListener('resize', checkOverflow)
    }, [data, loading, error])

    if (loading) {
        return (
            <div className="flex items-center space-x-2 animate-pulse">
                <div className="w-6 h-6 bg-gray-300 rounded"></div>
                <span className="text-sm font-medium text-gray-600">{currency.name}</span>
                <span className="text-sm text-gray-400">로딩중...</span>
            </div>
        )
    }

    if (error) {
        return (
            <div className="flex items-center space-x-2">
                <img
                    src={`${import.meta.env.VITE_API_DARKER_DB_URL_ICON}/items/${currency.id}/icon`}
                    alt={currency.name}
                    className="w-6 h-6"
                    onError={(e) => {
                        e.currentTarget.style.display = 'none'
                    }}
                />
                <span className="text-sm font-medium text-gray-600">{currency.name}</span>
                <span className="text-sm text-red-500">오류</span>
            </div>
        )
    }

    return (
        <div ref={containerRef} className="flex items-center space-x-2 min-w-0 flex-shrink-0">
            <img
                src={`${import.meta.env.VITE_API_DARKER_DB_URL_ICON}/items/${currency.id}/icon`}
                alt={currency.name}
                className="h-8 flex-shrink-0"
                onError={(e) => {
                    e.currentTarget.style.display = 'none'
                }}
            />
            {showName && <span className="text-sm font-medium text-gray-700 truncate">{currency.name}</span>}
            <span className="text-sm text-green-600 font-semibold flex-shrink-0">
                {averagePrice.toLocaleString()}
            </span>
        </div>
    )
}

export const CurrencyTicker: React.FC = () => {
    return (
        <div className="bg-gray-100 border-b border-gray-200 py-4">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-center space-x-8 overflow-x-auto">
                    {representativeCurrencies.map((currency) => (
                        <CurrencyItem key={currency.name} currency={currency}/>
                    ))}
                </div>
            </div>
        </div>
    )
}