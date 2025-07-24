import React, {useEffect, useMemo, useState} from "react";
import type {Equipment, RegisteredItemData} from "../../types/item.ts";
import RegisteredItem from "../registered-item/RegisteredItem.tsx";
import {mockRegisteredItems} from "../../constants/mock-registered-items.ts";

interface SearchResultProps {
    selectedItem: Equipment;
}

type TabType = 'WTS' | 'WTB';

const SearchResult: React.FC<SearchResultProps> = ({selectedItem}) => {
    const [registeredItems, setRegisteredItems] = useState<RegisteredItemData[]>([])
    const [activeTab, setActiveTab] = useState<TabType>('WTS')

    useEffect(() => {
        setRegisteredItems(mockRegisteredItems)
    }, []);

    // 탭별로 필터링된 아이템들과 개수 계산
    const {filteredItems, tabCounts} = useMemo(() => {
        const filtered = registeredItems.filter(item => item.type === activeTab);

        const counts = {
            WTS: registeredItems.filter(item => item.type === 'WTS').length,
            WTB: registeredItems.filter(item => item.type === 'WTB').length
        };

        return {filteredItems: filtered, tabCounts: counts};
    }, [registeredItems, activeTab]);

    const handleTabChange = (tab: TabType) => {
        setActiveTab(tab);
    };

    // 탭 버튼 컴포넌트
    const TabButton = ({tab, children}: { tab: TabType; children: React.ReactNode }) => (
        <button
            onClick={() => handleTabChange(tab)}
            className={`h-10 px-6 py-3 font-medium text-sm rounded-lg transition-all duration-200 flex items-center gap-2 ${
                activeTab === tab
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50 border border-gray-300'
            }`}
        >
            {children}
            <span className={`text-xs px-2 py-1 rounded-full ${
                activeTab === tab ? 'bg-blue-500' : 'bg-gray-200'
            }`}>
                {tabCounts[tab]}
            </span>
        </button>
    );

    return (
        <div className="lg:col-span-2 min-h-screen">
            {/* 탭 헤더 */}
            <div className="mb-4">
                <div className="flex gap-3 mb-2">
                    <TabButton tab="WTS">WTS</TabButton>
                    <TabButton tab="WTB">WTB</TabButton>
                </div>
            </div>

            {/* 검색 결과 또는 빈 상태 */}
            {filteredItems.length > 0 ? (
                <div className="space-y-4">
                    {filteredItems.map((registeredItem: RegisteredItemData, index: number) => (
                        <div key={`${registeredItem.id}-${index}`}>
                            <RegisteredItem itemData={selectedItem} registeredItemData={registeredItem}/>
                        </div>
                    ))}
                </div>
            ) : registeredItems.length > 0 ? (
                /* 필터링된 결과가 없는 경우 */
                <div className="flex items-center justify-center min-h-[40vh]">
                    <div className="text-center max-w-md mx-auto px-6">
                        {/* 아이콘 영역 */}
                        <div className="mb-6">
                            <div
                                className="mx-auto w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mb-4 shadow-inner">
                                <svg className="w-10 h-10 text-gray-400" fill="none" viewBox="0 0 24 24"
                                     stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                                          d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"/>
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                                          d="M8 5a2 2 0 012-2h4a2 2 0 012 2v2H8V5z"/>
                                </svg>
                            </div>
                        </div>

                        {/* 텍스트 영역 */}
                        <div className="mb-6">
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">
                                {activeTab === 'WTS' ? '판매' : activeTab === 'WTB' ? '구매' : ''} 등록이 없습니다
                            </h3>
                            <p className="text-gray-500 leading-relaxed">
                                {activeTab === 'WTS'
                                    ? '현재 판매 중인 아이템이 없습니다.'
                                    : activeTab === 'WTB'
                                        ? '현재 구매 요청이 없습니다.'
                                        : '다른 탭을 확인해보세요.'}
                            </p>
                        </div>

                        {/* 다른 탭으로 이동 버튼 */}
                        <div className="flex gap-2 justify-center">
                            {activeTab !== 'WTS' && tabCounts.WTS > 0 && (
                                <button
                                    onClick={() => handleTabChange('WTS')}
                                    className="px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors text-sm"
                                >
                                    판매 보기 ({tabCounts.WTS}개)
                                </button>
                            )}
                            {activeTab !== 'WTB' && tabCounts.WTB > 0 && (
                                <button
                                    onClick={() => handleTabChange('WTB')}
                                    className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors text-sm"
                                >
                                    구매 보기 ({tabCounts.WTB}개)
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            ) : (
                <div className="flex items-center justify-center min-h-[60vh]">
                    <div className="text-center max-w-md mx-auto px-6">
                        {/* 아이콘 영역 */}
                        <div className="mb-8">
                            <div
                                className="mx-auto w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mb-4 shadow-inner">
                                <svg className="w-12 h-12 text-gray-400" fill="none" viewBox="0 0 24 24"
                                     stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                                </svg>
                            </div>
                        </div>

                        {/* 텍스트 영역 */}
                        <div className="mb-8">
                            <h3 className="text-2xl font-semibold text-gray-800 mb-3">
                                등록된 아이템이 없습니다
                            </h3>
                            <p className="text-gray-500 leading-relaxed mb-2">
                                {selectedItem?.archetype ? `"${selectedItem.archetype}"` : '이 아이템'}에 대한 거래 등록이 아직 없어요.
                            </p>
                            <p className="text-sm text-gray-400">
                                첫 번째로 거래를 등록해보세요!
                            </p>
                        </div>

                        {/* 액션 버튼 영역 */}
                        <div className="space-y-3">
                            <button
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 shadow-sm">
                                아이템 등록하기
                            </button>
                        </div>

                        {/* 장식 요소 */}
                        <div className="mt-8 flex justify-center space-x-1">
                            <div className="w-2 h-2 bg-gray-300 rounded-full animate-pulse"></div>
                            <div className="w-2 h-2 bg-gray-300 rounded-full animate-pulse"
                                 style={{animationDelay: '0.2s'}}></div>
                            <div className="w-2 h-2 bg-gray-300 rounded-full animate-pulse"
                                 style={{animationDelay: '0.4s'}}></div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default SearchResult;