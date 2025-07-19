import {useEffect, useState} from "react";


export const CachedImage = ({
                                src,
                                alt,
                                className,
                                cachedImages,
                                onLoadAndCache
                            }: {
    src: string
    alt: string
    className?: string
    cachedImages: Map<string, string>
    onLoadAndCache: (url: string) => Promise<string>
}) => {
    const [displaySrc, setDisplaySrc] = useState<string>('')
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const loadImage = async () => {
            // 캐시된 이미지가 있으면 즉시 사용
            if (cachedImages.has(src)) {
                setDisplaySrc(cachedImages.get(src)!)
                setIsLoading(false)
                return
            }

            // 캐시에 없으면 로드하고 캐싱
            const cachedSrc = await onLoadAndCache(src)
            if (cachedSrc) {
                setDisplaySrc(cachedSrc)
            }
            setIsLoading(false)
        }

        loadImage()
    }, [src, cachedImages, onLoadAndCache])

    if (!displaySrc) return null

    return (
        <img
            src={displaySrc}
            alt={alt}
            className={className}
            style={{
                opacity: isLoading ? 0.5 : 1,
                transition: 'opacity 0.2s ease-in-out'
            }}
        />
    )
}