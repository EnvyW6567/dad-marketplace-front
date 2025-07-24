import React, {useState} from "react";
import {type Equipment, RARITY_COLORS_TEXT, type RegisteredItemData} from "../../types/item.ts";


interface RegisteredItemProps {
    itemData: Equipment
    registeredItemData: RegisteredItemData
}

export const RegisteredItem: React.FC<RegisteredItemProps> = ({
                                                                  itemData,
                                                                  registeredItemData
                                                              }) => {
    const [isHovered] = useState(false);

    const secondaryOptions = registeredItemData.options.filter(option => !option.isPrimary);
    const itemImageUrl = `${import.meta.env.VITE_API_DARKER_DB_URL_ICON}/items/${itemData.id}/icon`;
    const rarityTextColor = RARITY_COLORS_TEXT[registeredItemData.rarity] || 'text-gray-700';

    return (
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

            {/* 호버 시 추가 정보 */}
            {isHovered && registeredItemData.description && (
                <div className="px-4 pb-4 border-t border-gray-200 pt-2">
                    <p className="text-sm text-gray-600">{registeredItemData.description}</p>
                </div>
            )}
        </div>
    );
};

export default RegisteredItem