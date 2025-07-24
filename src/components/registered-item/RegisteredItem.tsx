import React, {useEffect, useRef, useState} from "react";
import {type Equipment, RARITY_COLORS, RARITY_COLORS_TEXT, type RegisteredItemData} from "../../types/item.ts";

interface RegisteredItemProps {
    itemData: Equipment
    registeredItemData: RegisteredItemData
}

export const RegisteredItem: React.FC<RegisteredItemProps> = ({
                                                                  itemData,
                                                                  registeredItemData
                                                              }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [mousePosition, setMousePosition] = useState({x: 0, y: 0});
    const [tooltipDimensions, setTooltipDimensions] = useState({width: 320, height: 300});
    const containerRef = useRef<HTMLDivElement>(null);
    const tooltipRef = useRef<HTMLDivElement>(null);

    const primaryOptions = registeredItemData.options.filter(option => option.isPrimary);
    const secondaryOptions = registeredItemData.options.filter(option => !option.isPrimary);
    const itemImageUrl = `${import.meta.env.VITE_API_DARKER_DB_URL_ICON}/items/${itemData.id}/icon`;
    const rarityTextColor = RARITY_COLORS_TEXT[registeredItemData.rarity] || 'text-gray-700';
    const rarityBgColor = RARITY_COLORS[registeredItemData.rarity] || 'bg-gray-600';

    // 툴팁 크기 측정
    useEffect(() => {
        if (isHovered && tooltipRef.current) {
            const rect = tooltipRef.current.getBoundingClientRect();
            setTooltipDimensions({
                width: rect.width,
                height: rect.height
            });
        }
    }, [isHovered, primaryOptions, secondaryOptions, registeredItemData.description]);

    const handleMouseMove = (e: React.MouseEvent) => {
        setMousePosition({x: e.clientX, y: e.clientY});
    };

    const handleMouseEnter = (e: React.MouseEvent) => {
        setIsHovered(true);
        setMousePosition({x: e.clientX, y: e.clientY});
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    // 툴팁 위치 계산 함수 (창 경계 내에 유지)
    const getTooltipPosition = () => {
        const {width: tooltipWidth, height: tooltipHeight} = tooltipDimensions;
        const margin = 15; // 마우스 커서와의 거리

        let x = mousePosition.x + margin;
        let y = mousePosition.y - margin;

        // 오른쪽 경계 체크
        if (x + tooltipWidth > window.innerWidth) {
            x = mousePosition.x - tooltipWidth - margin;
        }

        // 왼쪽 경계 체크 (오른쪽으로 이동했는데도 창을 벗어나는 경우)
        if (x < 0) {
            x = margin;
        }

        // 아래쪽 경계 체크
        if (y + tooltipHeight > window.innerHeight) {
            y = mousePosition.y - tooltipHeight - margin;
        }

        // 위쪽 경계 체크
        if (y < 0) {
            y = margin;
        }

        return {x, y};
    };

    return (
        <div
            ref={containerRef}
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onMouseMove={handleMouseMove}
        >
            <div
                className="bg-gray-100 border border-gray-200 rounded-lg mb-2 hover:bg-gray-50 transition-colors duration-200">
                {/* 상단: 아이템 정보 */}
                <div className="p-4 pt-2.5 pb-2.5">
                    <div className="flex items-start gap-3">
                        {/* 아이템 이미지 */}
                        <div className="flex-shrink-0">
                            <img
                                src={itemImageUrl}
                                alt={registeredItemData.name}
                                className="w-21 h-24 rounded object-contain"
                            />
                        </div>

                        {/* 아이템 정보 */}
                        <div className="flex-1 min-w-0">
                            <div className="flex flex-wrap justify-between pb-2.5">
                                {/* 아이템 이름 */}
                                <h3 className={`font-semibold text-base mb-1 ${rarityTextColor}`}>
                                    {registeredItemData.name}
                                </h3>

                                {/* 가격 */}
                                <p className="text-lg font-bold text-gray-900 flex items-center gap-1">
                                    {registeredItemData.price}
                                </p>
                            </div>
                            <div className="flex items-center justify-between">
                                {/* 옵션 태그들 */}
                                <div className="flex flex-wrap gap-1 mb-2">
                                    {secondaryOptions.map((option, index) => (
                                        <span key={index}
                                              className="inline-block text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                                        {option.name} - {option.value}
                                    </span>
                                    ))}
                                </div>

                                {/* 우측: 유저 정보 */}
                                <div className="flex-shrink-0 text-right">
                                    <div className="flex items-center justify-end gap-2 mb-1">
                                <span className="text-sm text-gray-700 font-medium">
                                    {registeredItemData.user.displayName || registeredItemData.user.username}
                                </span>
                                        <img
                                            src={registeredItemData.user.avatarUrl}
                                            alt={registeredItemData.user.displayName}
                                            className="w-6 h-6 rounded-full"
                                        />
                                    </div>
                                    <div className="text-xs text-gray-500">한국어</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 호버 툴팁 */}
            {isHovered && (
                <div
                    ref={tooltipRef}
                    className="fixed z-50 w-80 text-white rounded-lg shadow-2xl border border-gray-600 p-4 pointer-events-none"
                    style={{
                        left: getTooltipPosition().x,
                        top: getTooltipPosition().y,
                        backgroundColor: 'rgba(31, 41, 55, 0.95)'
                    }}
                >
                    {/* 아이템 이름과 배경 */}
                    <div className={`text-center mb-3 p-2 rounded ${rarityBgColor}`}>
                        <h3 className="text-lg font-bold text-white">
                            {registeredItemData.name}
                        </h3>
                    </div>

                    {/* Primary 옵션 (흰색 글씨) */}
                    {primaryOptions.length > 0 && (
                        <div className="mb-3">
                            {primaryOptions.map((option, index) => (
                                <div key={index} className="flex justify-between items-center py-1 text-sm">
                                    <span className="text-gray-300 font-mono pr-2">-</span>
                                    <span className="text-white flex-1 text-center flex justify-between">
                                        <span>{option.name}</span>
                                        <span>{option.value}</span>
                                    </span>
                                    <span className="text-gray-300 font-mono pl-2">-</span>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Secondary 옵션 (파란색 글씨) */}
                    {secondaryOptions.length > 0 && (
                        <div className="mb-3">
                            {secondaryOptions.map((option, index) => (
                                <div key={index} className="flex justify-between items-center py-1 text-sm">
                                    <span className="text-gray-300 font-mono pr-2">-</span>
                                    <span className="text-blue-400 flex-1 text-center flex justify-between">
                                        <span>{option.name}</span>
                                        <span>{option.value}</span>
                                    </span>
                                    <span className="text-gray-300 font-mono pl-2">-</span>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Description (툴팁 하단) */}
                    {registeredItemData.description && (
                        <div className="pt-3 border-t border-gray-600">
                            <p className="text-sm text-gray-300 italic text-center">
                                {registeredItemData.description}
                            </p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default RegisteredItem;