import { memo, useEffect, useRef, useState } from 'react'

const RESPONSIVE_WIDTHS = [480, 1024, 1920]
const SUPPORTED_RESPONSIVE_EXT = ['.jpg', '.jpeg', '.png']

function splitSrc(src) {
  const queryIndex = src.search(/[?#]/)
  const main = queryIndex >= 0 ? src.slice(0, queryIndex) : src
  const tail = queryIndex >= 0 ? src.slice(queryIndex) : ''
  const lastDot = main.lastIndexOf('.')
  if (lastDot === -1) return { base: main, ext: '', tail }
  return { base: main.slice(0, lastDot), ext: main.slice(lastDot), tail }
}

function buildSrcSet(base, tail, format) {
  return RESPONSIVE_WIDTHS.map((w) => `${base}-${w}w.${format}${tail} ${w}w`).join(', ')
}

function placeholderSrc(width, height) {
  const w = Number(width) || 16
  const h = Number(height) || 9
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${w} ${h}'></svg>`,
  )}`
}

const OptimizedImage = memo(function OptimizedImage({
  src,
  alt,
  width,
  height,
  className,
  sizes = '100vw',
  priority = false,
  rootMargin = '600px',
  responsive = true,
  draggable,
  onLoad,
  ...rest
}) {
  const imgRef = useRef(null)
  const [shouldLoad, setShouldLoad] = useState(priority)

  useEffect(() => {
    if (priority || shouldLoad) return
    const node = imgRef.current
    if (!node) return
    if (typeof IntersectionObserver === 'undefined') {
      setShouldLoad(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShouldLoad(true)
          observer.disconnect()
        }
      },
      { rootMargin, threshold: 0.01 },
    )
    observer.observe(node)

    return () => observer.disconnect()
  }, [priority, shouldLoad, rootMargin])

  const { base, ext, tail } = splitSrc(src)
  const useResponsive = responsive && SUPPORTED_RESPONSIVE_EXT.includes(ext.toLowerCase())
  const showSources = shouldLoad && useResponsive
  const placeholder = placeholderSrc(width, height)

  return (
    <picture>
      {showSources && (
        <source type="image/avif" srcSet={buildSrcSet(base, tail, 'avif')} sizes={sizes} />
      )}
      {showSources && (
        <source type="image/webp" srcSet={buildSrcSet(base, tail, 'webp')} sizes={sizes} />
      )}
      <img
        ref={imgRef}
        src={shouldLoad ? src : placeholder}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        fetchpriority={priority ? 'high' : 'auto'}
        className={className}
        draggable={draggable}
        onLoad={onLoad}
        {...rest}
      />
    </picture>
  )
})

export default OptimizedImage
