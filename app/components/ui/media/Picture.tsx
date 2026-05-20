import Image from 'next/image'
import { FC, memo, MouseEventHandler } from 'react'

interface PictureProps {
  src: string
  alt?: string
  className: string
  priority: boolean
  onClick?: MouseEventHandler<HTMLImageElement>
  width?: number
  height?: number
}

const Picture: FC<PictureProps> = ({ src, alt, className, priority = false, onClick, width, height }) => {
  return (
    <Image
      onClick={onClick}
      src={src || '/images/'}
      alt={alt || 'Education Comes First'}
      width={width || 1}
      height={height || 1}
      className={className}
      priority={priority}
      loading={priority ? 'eager' : 'lazy'}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
    />
  )
}

export default memo(Picture)
