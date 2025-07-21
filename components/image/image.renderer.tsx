'use client';

import { TImageProps } from "./image.type";
import NextImage from 'next/image';
import { clsx } from 'clsx';
import useImage from "./useImage";

export default function Image(props: TImageProps) {
    const { prepareProps } = useImage();

    const { src,
        alt,
        width,
        height,
        className,
        ...rest } = prepareProps(props);
    const imageClasses = clsx('image block-image', className);

    return (
        <NextImage
            {...rest}
            src={src}
            alt={alt}
            width={width}
            height={height}
            className={imageClasses}
        />
    )
}
