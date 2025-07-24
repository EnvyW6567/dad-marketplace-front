import React, {useEffect, useState} from 'react'
import ItemCard from '../components/item-card/ItemCard.tsx'
import type {Equipment} from "../types/item.ts";
import {useLocation} from "react-router-dom";
import SearchResult from "../components/search-result/SearchResult.tsx";

const SearchPage: React.FC = () => {
    const {state} = useLocation()
    const [selectedItem, setSelectedItem] = useState<Equipment>(state)

    useEffect(() => {
        setSelectedItem(state)
    }, [state])

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto pt-5">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* 좌측: 아이템 카드 */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-40">
                            {selectedItem ? (
                                <ItemCard
                                    itemName={selectedItem.archetype}
                                    className="w-full"
                                />
                            ) : (
                                <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm">
                                    <div className="text-center text-gray-500">
                                        <p>아이템을 선택하세요</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <SearchResult selectedItem={selectedItem}/>
                </div>
            </div>
        </div>
    )
}

export default SearchPage