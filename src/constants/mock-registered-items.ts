import type {RegisteredItemData} from "../types/item.ts";

export const mockRegisteredItems: RegisteredItemData[] = [
    {
        id: "item_001",
        name: "Longsword",
        rarity: "Unique",
        options: [
            // Primary options
            {name: "Move Speed", value: -30, isPrimary: true},
            {name: "Weapon Damage", value: 40, isPrimary: true},
            // Secondary options (6개 - Unique)
            {name: "Action Speed", value: "3%", isPrimary: false},
            {name: "Armor Penetration", value: 4, isPrimary: false},
            {name: "Buff Duration Bonus", value: "4%", isPrimary: false},
            {name: "Cooldown Reduction", value: "2%", isPrimary: false},
            {name: "Max Health", value: 3, isPrimary: false},
            {name: "Physical Damage Bonus", value: "3%", isPrimary: false}
        ],
        type: "WTS",
        user: {
            username: "dragonslayer99",
            displayName: "DragonSlayer",
            email: "dragon@example.com",
            avatarUrl: "https://mblogthumb-phinf.pstatic.net/MjAyNDAzMjZfMTk3/MDAxNzExMzgyMDgyODAx.JCkvPFnGCj_VDM_VG3ZZKSjz1vQlqj--YAU7IXnwZDAg.DeaQ4ffhow-qYD_uo6_AgnLSw7Q_MvsbQKoOtv1LjxQg.PNG/4.png?type=w400"
        },
        description: "최고 등급의 드래곤 소드입니다. 강화 +15 달성! 치명타와 공격력 옵션이 완벽합니다.",
        price: "150,000"
    },
    {
        id: "item_002",
        name: "Longword",
        options: [
            // Primary options
            {name: "Move Speed", value: -30, isPrimary: true},
            {name: "Weapon Damage", value: 39, isPrimary: true},
            // Secondary options (5개 - Legendary)
            {name: "Magical Interaction Speed", value: "4%", isPrimary: false},
            {name: "Max Health Bonus", value: "3%", isPrimary: false},
            {name: "Move Speed Bonus", value: "2%", isPrimary: false},
            {name: "Physical Power", value: 2, isPrimary: false},
            {name: "Additional Weapon Damage", value: 1, isPrimary: false}
        ],
        rarity: "Legendary",
        type: "WTB",
        user: {
            username: "magicdefender",
            displayName: "Magic Defender",
            email: "magic@example.com",
            avatarUrl: "https://mblogthumb-phinf.pstatic.net/MjAyNDAzMjZfMTk3/MDAxNzExMzgyMDgyODAx.JCkvPFnGCj_VDM_VG3ZZKSjz1vQlqj--YAU7IXnwZDAg.DeaQ4ffhow-qYD_uo6_AgnLSw7Q_MvsbQKoOtv1LjxQg.PNG/4.png?type=w400"
        },
        description: "탱커용 마법 방패를 찾고 있습니다. 방어력과 마법 저항 옵션이 좋은 것으로 부탁드립니다.",
        price: "80,000"
    },
    {
        id: "item_003",
        name: "Longword",
        rarity: "Legendary",
        options: [
            // Primary options
            {name: "Move Speed", value: -30, isPrimary: true},
            {name: "Weapon Damage", value: 40, isPrimary: true},
            // Secondary options (5개 - Legendary)
            {name: "Debuff Duration Bonus", value: "3%", isPrimary: false},
            {name: "Additional Move Speed", value: 2, isPrimary: false},
            {name: "Regular Interaction Speed", value: "4%", isPrimary: false},
            {name: "Action Speed", value: "3%", isPrimary: false},
            {name: "Armor Penetration", value: 3, isPrimary: false}
        ],
        type: "WTS",
        user: {
            username: "potionmaster",
            displayName: "PotionMaster",
            avatarUrl: "https://mblogthumb-phinf.pstatic.net/MjAyNDAzMjZfMTk3/MDAxNzExMzgyMDgyODAx.JCkvPFnGCj_VDM_VG3ZZKSjz1vQlqj--YAU7IXnwZDAg.DeaQ4ffhow-qYD_uo6_AgnLSw7Q_MvsbQKoOtv1LjxQg.PNG/4.png?type=w400"
        },
        description: "고품질 치유 포션 50개 묶음 판매합니다. 대량 구매 시 할인 가능합니다.",
        price: "25,000"
    },
    {
        id: "item_004",
        name: "Longword",
        rarity: "Legendary",
        options: [
            // Primary options
            {name: "Move Speed", value: -30, isPrimary: true},
            {name: "Weapon Damage", value: 39, isPrimary: true},
            // Secondary options (5개 - Legendary)
            {name: "Buff Duration Bonus", value: "4%", isPrimary: false},
            {name: "Cooldown Reduction", value: "3%", isPrimary: false},
            {name: "Max Health", value: 4, isPrimary: false},

        ],
        type: "WTB",
        user: {
            username: "speedrunner",
            displayName: "SpeedRunner",
            email: "speed@example.com",
            avatarUrl: "https://mblogthumb-phinf.pstatic.net/MjAyNDAzMjZfMTk3/MDAxNzExMzgyMDgyODAx.JCkvPFnGCj_VDM_VG3ZZKSjz1vQlqj--YAU7IXnwZDAg.DeaQ4ffhow-qYD_uo6_AgnLSw7Q_MvsbQKoOtv1LjxQg.PNG/4.png?type=w400"
        },
        description: "민첩성 빌드를 위한 반지를 찾고 있습니다. 민첩성 30 이상, 이동속도 옵션 필수입니다.",
        price: "120,000"
    },
    {
        id: "item_005",
        name: "Longword",
        rarity: "Unique",
        options: [
            // Primary options
            {name: "Move Speed", value: -30, isPrimary: true},
            {name: "Weapon Damage", value: 40, isPrimary: true},
            // Secondary options (6개 - Unique)
            {name: "Magical Interaction Speed", value: "3%", isPrimary: false},
            {name: "Max Health Bonus", value: "2%", isPrimary: false},
            {name: "Move Speed Bonus", value: "1%", isPrimary: false},
            {name: "Physical Power", value: 3, isPrimary: false},
            {name: "Regular Interaction Speed", value: "4%", isPrimary: false},
            {name: "Debuff Duration Bonus", value: "4%", isPrimary: false}
        ],
        type: "WTS",
        user: {
            username: "archmage88",
            displayName: "ArchMage",
            email: "archmage@example.com",
            avatarUrl: "https://mblogthumb-phinf.pstatic.net/MjAyNDAzMjZfMTk3/MDAxNzExMzgyMDgyODAx.JCkvPFnGCj_VDM_VG3ZZKSjz1vQlqj--YAU7IXnwZDAg.DeaQ4ffhow-qYD_uo6_AgnLSw7Q_MvsbQKoOtv1LjxQg.PNG/4.png?type=w400"
        },
        description: "최고급 마법사 로브입니다. +12 강화 완료! 마나와 마법력 옵션이 모두 최상급입니다. 신속 거래 원합니다.",
        price: "200,000"
    },
    {
        id: "item_005",
        name: "Longword",
        rarity: "Unique",
        options: [
            // Primary options
            {name: "Move Speed", value: -30, isPrimary: true},
            {name: "Weapon Damage", value: 40, isPrimary: true},
            // Secondary options (6개 - Unique)
            {name: "Magical Interaction Speed", value: "3%", isPrimary: false},
            {name: "Max Health Bonus", value: "2%", isPrimary: false},
            {name: "Move Speed Bonus", value: "1%", isPrimary: false},
            {name: "Physical Power", value: 3, isPrimary: false},
            {name: "Regular Interaction Speed", value: "4%", isPrimary: false},
            {name: "Debuff Duration Bonus", value: "4%", isPrimary: false}
        ],
        type: "WTS",
        user: {
            username: "archmage88",
            displayName: "ArchMage",
            email: "archmage@example.com",
            avatarUrl: "https://mblogthumb-phinf.pstatic.net/MjAyNDAzMjZfMTk3/MDAxNzExMzgyMDgyODAx.JCkvPFnGCj_VDM_VG3ZZKSjz1vQlqj--YAU7IXnwZDAg.DeaQ4ffhow-qYD_uo6_AgnLSw7Q_MvsbQKoOtv1LjxQg.PNG/4.png?type=w400"
        },
        description: "최고급 마법사 로브입니다. +12 강화 완료! 마나와 마법력 옵션이 모두 최상급입니다. 신속 거래 원합니다.",
        price: "200,000"
    },
    {
        id: "item_005",
        name: "Longword",
        rarity: "Unique",
        options: [
            // Primary options
            {name: "Move Speed", value: -30, isPrimary: true},
            {name: "Weapon Damage", value: 40, isPrimary: true},
            // Secondary options (6개 - Unique)
            {name: "Magical Interaction Speed", value: "3%", isPrimary: false},
            {name: "Max Health Bonus", value: "2%", isPrimary: false},
            {name: "Move Speed Bonus", value: "1%", isPrimary: false},
            {name: "Physical Power", value: 3, isPrimary: false},
            {name: "Regular Interaction Speed", value: "4%", isPrimary: false},
            {name: "Debuff Duration Bonus", value: "4%", isPrimary: false}
        ],
        type: "WTS",
        user: {
            username: "archmage88",
            displayName: "ArchMage",
            email: "archmage@example.com",
            avatarUrl: "https://mblogthumb-phinf.pstatic.net/MjAyNDAzMjZfMTk3/MDAxNzExMzgyMDgyODAx.JCkvPFnGCj_VDM_VG3ZZKSjz1vQlqj--YAU7IXnwZDAg.DeaQ4ffhow-qYD_uo6_AgnLSw7Q_MvsbQKoOtv1LjxQg.PNG/4.png?type=w400"
        },
        description: "최고급 마법사 로브입니다. +12 강화 완료! 마나와 마법력 옵션이 모두 최상급입니다. 신속 거래 원합니다.",
        price: "200,000"
    },
    {
        id: "item_004",
        name: "Longword",
        rarity: "Legendary",
        options: [
            // Primary options
            {name: "Move Speed", value: -30, isPrimary: true},
            {name: "Weapon Damage", value: 39, isPrimary: true},
            // Secondary options (5개 - Legendary)
            {name: "Buff Duration Bonus", value: "4%", isPrimary: false},
            {name: "Cooldown Reduction", value: "3%", isPrimary: false},
            {name: "Max Health", value: 4, isPrimary: false},

        ],
        type: "WTB",
        user: {
            username: "speedrunner",
            displayName: "SpeedRunner",
            email: "speed@example.com",
            avatarUrl: "https://mblogthumb-phinf.pstatic.net/MjAyNDAzMjZfMTk3/MDAxNzExMzgyMDgyODAx.JCkvPFnGCj_VDM_VG3ZZKSjz1vQlqj--YAU7IXnwZDAg.DeaQ4ffhow-qYD_uo6_AgnLSw7Q_MvsbQKoOtv1LjxQg.PNG/4.png?type=w400"
        },
        description: "민첩성 빌드를 위한 반지를 찾고 있습니다. 민첩성 30 이상, 이동속도 옵션 필수입니다.",
        price: "120,000"
    },
    {
        id: "item_005",
        name: "Longword",
        rarity: "Unique",
        options: [
            // Primary options
            {name: "Move Speed", value: -30, isPrimary: true},
            {name: "Weapon Damage", value: 40, isPrimary: true},
            // Secondary options (6개 - Unique)
            {name: "Magical Interaction Speed", value: "3%", isPrimary: false},
            {name: "Max Health Bonus", value: "2%", isPrimary: false},
            {name: "Move Speed Bonus", value: "1%", isPrimary: false},
            {name: "Physical Power", value: 3, isPrimary: false},
            {name: "Regular Interaction Speed", value: "4%", isPrimary: false},
            {name: "Debuff Duration Bonus", value: "4%", isPrimary: false}
        ],
        type: "WTS",
        user: {
            username: "archmage88",
            displayName: "ArchMage",
            email: "archmage@example.com",
            avatarUrl: "https://mblogthumb-phinf.pstatic.net/MjAyNDAzMjZfMTk3/MDAxNzExMzgyMDgyODAx.JCkvPFnGCj_VDM_VG3ZZKSjz1vQlqj--YAU7IXnwZDAg.DeaQ4ffhow-qYD_uo6_AgnLSw7Q_MvsbQKoOtv1LjxQg.PNG/4.png?type=w400"
        },
        description: "최고급 마법사 로브입니다. +12 강화 완료! 마나와 마법력 옵션이 모두 최상급입니다. 신속 거래 원합니다.",
        price: "200,000"
    },
    {
        id: "item_005",
        name: "Longword",
        rarity: "Unique",
        options: [
            // Primary options
            {name: "Move Speed", value: -30, isPrimary: true},
            {name: "Weapon Damage", value: 40, isPrimary: true},
            // Secondary options (6개 - Unique)
            {name: "Magical Interaction Speed", value: "3%", isPrimary: false},
            {name: "Max Health Bonus", value: "2%", isPrimary: false},
            {name: "Move Speed Bonus", value: "1%", isPrimary: false},
            {name: "Physical Power", value: 3, isPrimary: false},
            {name: "Regular Interaction Speed", value: "4%", isPrimary: false},
            {name: "Debuff Duration Bonus", value: "4%", isPrimary: false}
        ],
        type: "WTS",
        user: {
            username: "archmage88",
            displayName: "ArchMage",
            email: "archmage@example.com",
            avatarUrl: "https://mblogthumb-phinf.pstatic.net/MjAyNDAzMjZfMTk3/MDAxNzExMzgyMDgyODAx.JCkvPFnGCj_VDM_VG3ZZKSjz1vQlqj--YAU7IXnwZDAg.DeaQ4ffhow-qYD_uo6_AgnLSw7Q_MvsbQKoOtv1LjxQg.PNG/4.png?type=w400"
        },
        description: "최고급 마법사 로브입니다. +12 강화 완료! 마나와 마법력 옵션이 모두 최상급입니다. 신속 거래 원합니다.",
        price: "200,000"
    },
    {
        id: "item_005",
        name: "Longword",
        rarity: "Unique",
        options: [
            // Primary options
            {name: "Move Speed", value: -30, isPrimary: true},
            {name: "Weapon Damage", value: 40, isPrimary: true},
            // Secondary options (6개 - Unique)
            {name: "Magical Interaction Speed", value: "3%", isPrimary: false},
            {name: "Max Health Bonus", value: "2%", isPrimary: false},
            {name: "Move Speed Bonus", value: "1%", isPrimary: false},
            {name: "Physical Power", value: 3, isPrimary: false},
            {name: "Regular Interaction Speed", value: "4%", isPrimary: false},
            {name: "Debuff Duration Bonus", value: "4%", isPrimary: false}
        ],
        type: "WTS",
        user: {
            username: "archmage88",
            displayName: "ArchMage",
            email: "archmage@example.com",
            avatarUrl: "https://mblogthumb-phinf.pstatic.net/MjAyNDAzMjZfMTk3/MDAxNzExMzgyMDgyODAx.JCkvPFnGCj_VDM_VG3ZZKSjz1vQlqj--YAU7IXnwZDAg.DeaQ4ffhow-qYD_uo6_AgnLSw7Q_MvsbQKoOtv1LjxQg.PNG/4.png?type=w400"
        },
        description: "최고급 마법사 로브입니다. +12 강화 완료! 마나와 마법력 옵션이 모두 최상급입니다. 신속 거래 원합니다.",
        price: "200,000"
    },
    {
        id: "item_004",
        name: "Longword",
        rarity: "Legendary",
        options: [
            // Primary options
            {name: "Move Speed", value: -30, isPrimary: true},
            {name: "Weapon Damage", value: 39, isPrimary: true},
            // Secondary options (5개 - Legendary)
            {name: "Buff Duration Bonus", value: "4%", isPrimary: false},
            {name: "Cooldown Reduction", value: "3%", isPrimary: false},
            {name: "Max Health", value: 4, isPrimary: false},

        ],
        type: "WTB",
        user: {
            username: "speedrunner",
            displayName: "SpeedRunner",
            email: "speed@example.com",
            avatarUrl: "https://mblogthumb-phinf.pstatic.net/MjAyNDAzMjZfMTk3/MDAxNzExMzgyMDgyODAx.JCkvPFnGCj_VDM_VG3ZZKSjz1vQlqj--YAU7IXnwZDAg.DeaQ4ffhow-qYD_uo6_AgnLSw7Q_MvsbQKoOtv1LjxQg.PNG/4.png?type=w400"
        },
        description: "민첩성 빌드를 위한 반지를 찾고 있습니다. 민첩성 30 이상, 이동속도 옵션 필수입니다.",
        price: "120,000"
    },
    {
        id: "item_005",
        name: "Longword",
        rarity: "Unique",
        options: [
            // Primary options
            {name: "Move Speed", value: -30, isPrimary: true},
            {name: "Weapon Damage", value: 40, isPrimary: true},
            // Secondary options (6개 - Unique)
            {name: "Magical Interaction Speed", value: "3%", isPrimary: false},
            {name: "Max Health Bonus", value: "2%", isPrimary: false},
            {name: "Move Speed Bonus", value: "1%", isPrimary: false},
            {name: "Physical Power", value: 3, isPrimary: false},
            {name: "Regular Interaction Speed", value: "4%", isPrimary: false},
            {name: "Debuff Duration Bonus", value: "4%", isPrimary: false}
        ],
        type: "WTS",
        user: {
            username: "archmage88",
            displayName: "ArchMage",
            email: "archmage@example.com",
            avatarUrl: "https://mblogthumb-phinf.pstatic.net/MjAyNDAzMjZfMTk3/MDAxNzExMzgyMDgyODAx.JCkvPFnGCj_VDM_VG3ZZKSjz1vQlqj--YAU7IXnwZDAg.DeaQ4ffhow-qYD_uo6_AgnLSw7Q_MvsbQKoOtv1LjxQg.PNG/4.png?type=w400"
        },
        description: "최고급 마법사 로브입니다. +12 강화 완료! 마나와 마법력 옵션이 모두 최상급입니다. 신속 거래 원합니다.",
        price: "200,000"
    },
    {
        id: "item_005",
        name: "Longword",
        rarity: "Unique",
        options: [
            // Primary options
            {name: "Move Speed", value: -30, isPrimary: true},
            {name: "Weapon Damage", value: 40, isPrimary: true},
            // Secondary options (6개 - Unique)
            {name: "Magical Interaction Speed", value: "3%", isPrimary: false},
            {name: "Max Health Bonus", value: "2%", isPrimary: false},
            {name: "Move Speed Bonus", value: "1%", isPrimary: false},
            {name: "Physical Power", value: 3, isPrimary: false},
            {name: "Regular Interaction Speed", value: "4%", isPrimary: false},
            {name: "Debuff Duration Bonus", value: "4%", isPrimary: false}
        ],
        type: "WTS",
        user: {
            username: "archmage88",
            displayName: "ArchMage",
            email: "archmage@example.com",
            avatarUrl: "https://mblogthumb-phinf.pstatic.net/MjAyNDAzMjZfMTk3/MDAxNzExMzgyMDgyODAx.JCkvPFnGCj_VDM_VG3ZZKSjz1vQlqj--YAU7IXnwZDAg.DeaQ4ffhow-qYD_uo6_AgnLSw7Q_MvsbQKoOtv1LjxQg.PNG/4.png?type=w400"
        },
        description: "최고급 마법사 로브입니다. +12 강화 완료! 마나와 마법력 옵션이 모두 최상급입니다. 신속 거래 원합니다.",
        price: "200,000"
    },
    {
        id: "item_005",
        name: "Longword",
        rarity: "Unique",
        options: [
            // Primary options
            {name: "Move Speed", value: -30, isPrimary: true},
            {name: "Weapon Damage", value: 40, isPrimary: true},
            // Secondary options (6개 - Unique)
            {name: "Magical Interaction Speed", value: "3%", isPrimary: false},
            {name: "Max Health Bonus", value: "2%", isPrimary: false},
            {name: "Move Speed Bonus", value: "1%", isPrimary: false},
            {name: "Physical Power", value: 3, isPrimary: false},
            {name: "Regular Interaction Speed", value: "4%", isPrimary: false},
            {name: "Debuff Duration Bonus", value: "4%", isPrimary: false}
        ],
        type: "WTS",
        user: {
            username: "archmage88",
            displayName: "ArchMage",
            email: "archmage@example.com",
            avatarUrl: "https://mblogthumb-phinf.pstatic.net/MjAyNDAzMjZfMTk3/MDAxNzExMzgyMDgyODAx.JCkvPFnGCj_VDM_VG3ZZKSjz1vQlqj--YAU7IXnwZDAg.DeaQ4ffhow-qYD_uo6_AgnLSw7Q_MvsbQKoOtv1LjxQg.PNG/4.png?type=w400"
        },
        description: "최고급 마법사 로브입니다. +12 강화 완료! 마나와 마법력 옵션이 모두 최상급입니다. 신속 거래 원합니다.",
        price: "200,000"
    },
    {
        id: "item_004",
        name: "Longword",
        rarity: "Legendary",
        options: [
            // Primary options
            {name: "Move Speed", value: -30, isPrimary: true},
            {name: "Weapon Damage", value: 39, isPrimary: true},
            // Secondary options (5개 - Legendary)
            {name: "Buff Duration Bonus", value: "4%", isPrimary: false},
            {name: "Cooldown Reduction", value: "3%", isPrimary: false},
            {name: "Max Health", value: 4, isPrimary: false},

        ],
        type: "WTB",
        user: {
            username: "speedrunner",
            displayName: "SpeedRunner",
            email: "speed@example.com",
            avatarUrl: "https://mblogthumb-phinf.pstatic.net/MjAyNDAzMjZfMTk3/MDAxNzExMzgyMDgyODAx.JCkvPFnGCj_VDM_VG3ZZKSjz1vQlqj--YAU7IXnwZDAg.DeaQ4ffhow-qYD_uo6_AgnLSw7Q_MvsbQKoOtv1LjxQg.PNG/4.png?type=w400"
        },
        description: "민첩성 빌드를 위한 반지를 찾고 있습니다. 민첩성 30 이상, 이동속도 옵션 필수입니다.",
        price: "120,000"
    },
    {
        id: "item_005",
        name: "Longword",
        rarity: "Unique",
        options: [
            // Primary options
            {name: "Move Speed", value: -30, isPrimary: true},
            {name: "Weapon Damage", value: 40, isPrimary: true},
            // Secondary options (6개 - Unique)
            {name: "Magical Interaction Speed", value: "3%", isPrimary: false},
            {name: "Max Health Bonus", value: "2%", isPrimary: false},
            {name: "Move Speed Bonus", value: "1%", isPrimary: false},
            {name: "Physical Power", value: 3, isPrimary: false},
            {name: "Regular Interaction Speed", value: "4%", isPrimary: false},
            {name: "Debuff Duration Bonus", value: "4%", isPrimary: false}
        ],
        type: "WTS",
        user: {
            username: "archmage88",
            displayName: "ArchMage",
            email: "archmage@example.com",
            avatarUrl: "https://mblogthumb-phinf.pstatic.net/MjAyNDAzMjZfMTk3/MDAxNzExMzgyMDgyODAx.JCkvPFnGCj_VDM_VG3ZZKSjz1vQlqj--YAU7IXnwZDAg.DeaQ4ffhow-qYD_uo6_AgnLSw7Q_MvsbQKoOtv1LjxQg.PNG/4.png?type=w400"
        },
        description: "최고급 마법사 로브입니다. +12 강화 완료! 마나와 마법력 옵션이 모두 최상급입니다. 신속 거래 원합니다.",
        price: "200,000"
    },
    {
        id: "item_005",
        name: "Longword",
        rarity: "Unique",
        options: [
            // Primary options
            {name: "Move Speed", value: -30, isPrimary: true},
            {name: "Weapon Damage", value: 40, isPrimary: true},
            // Secondary options (6개 - Unique)
            {name: "Magical Interaction Speed", value: "3%", isPrimary: false},
            {name: "Max Health Bonus", value: "2%", isPrimary: false},
            {name: "Move Speed Bonus", value: "1%", isPrimary: false},
            {name: "Physical Power", value: 3, isPrimary: false},
            {name: "Regular Interaction Speed", value: "4%", isPrimary: false},
            {name: "Debuff Duration Bonus", value: "4%", isPrimary: false}
        ],
        type: "WTS",
        user: {
            username: "archmage88",
            displayName: "ArchMage",
            email: "archmage@example.com",
            avatarUrl: "https://mblogthumb-phinf.pstatic.net/MjAyNDAzMjZfMTk3/MDAxNzExMzgyMDgyODAx.JCkvPFnGCj_VDM_VG3ZZKSjz1vQlqj--YAU7IXnwZDAg.DeaQ4ffhow-qYD_uo6_AgnLSw7Q_MvsbQKoOtv1LjxQg.PNG/4.png?type=w400"
        },
        description: "최고급 마법사 로브입니다. +12 강화 완료! 마나와 마법력 옵션이 모두 최상급입니다. 신속 거래 원합니다.",
        price: "200,000"
    },
    {
        id: "item_005",
        name: "Longword",
        rarity: "Unique",
        options: [
            // Primary options
            {name: "Move Speed", value: -30, isPrimary: true},
            {name: "Weapon Damage", value: 40, isPrimary: true},
            // Secondary options (6개 - Unique)
            {name: "Magical Interaction Speed", value: "3%", isPrimary: false},
            {name: "Max Health Bonus", value: "2%", isPrimary: false},
            {name: "Move Speed Bonus", value: "1%", isPrimary: false},
            {name: "Physical Power", value: 3, isPrimary: false},
            {name: "Regular Interaction Speed", value: "4%", isPrimary: false},
            {name: "Debuff Duration Bonus", value: "4%", isPrimary: false}
        ],
        type: "WTS",
        user: {
            username: "archmage88",
            displayName: "ArchMage",
            email: "archmage@example.com",
            avatarUrl: "https://mblogthumb-phinf.pstatic.net/MjAyNDAzMjZfMTk3/MDAxNzExMzgyMDgyODAx.JCkvPFnGCj_VDM_VG3ZZKSjz1vQlqj--YAU7IXnwZDAg.DeaQ4ffhow-qYD_uo6_AgnLSw7Q_MvsbQKoOtv1LjxQg.PNG/4.png?type=w400"
        },
        description: "최고급 마법사 로브입니다. +12 강화 완료! 마나와 마법력 옵션이 모두 최상급입니다. 신속 거래 원합니다.",
        price: "200,000"
    }
];