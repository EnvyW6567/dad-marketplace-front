import React, {useEffect, useState} from 'react'
import ItemCard from '../components/item-card/ItemCard.tsx'
import type {Equipment} from "../types/item.ts";
import {useLocation} from "react-router-dom";

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
                        <div className="sticky top-4">
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

                    {/* 우측: 검색 결과 목록 */}
                    <div className="lg:col-span-2">
                        <div className="flex justify-between items-center mb-4">
                        </div>

                        <div className="text-center py-12">
                            <div className="text-gray-400 mb-4">
                                <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24"
                                     stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                          d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                                </svg>
                            </div>
                            <h3 className="text-lg font-medium text-gray-700 mb-2">
                                검색 결과가 없습니다
                            </h3>
                            <p className="text-gray-500">
                                다른 검색어를 시도해보세요
                            </p>
                        </div>

                        {/* 페이지네이션 영역 (추후 구현) */}
                        <div className="mt-8 flex justify-center">
                            <div className="flex space-x-2">
                                <button
                                    className="px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition-colors text-gray-700">
                                    이전
                                </button>
                                <button className="px-3 py-2 bg-blue-600 text-white rounded-lg text-sm">
                                    1
                                </button>
                                <button
                                    className="px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition-colors text-gray-700">
                                    2
                                </button>
                                <button
                                    className="px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition-colors text-gray-700">
                                    3
                                </button>
                                <button
                                    className="px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition-colors text-gray-700">
                                    다음
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SearchPage