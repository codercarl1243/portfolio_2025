import createImageUrlBuilder from '@sanity/image-url'
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import type { SanityImageObject } from '@sanity/image-url/lib/types/types'

import { dataset, projectId } from '../env'

// https://www.sanity.io/docs/image-url
const builder = createImageUrlBuilder({ projectId, dataset })

export const urlFor = (source: SanityImageSource) => {
  return builder.image(source)
}

export function getImageDimensionsForPortableTextImage(
  image: SanityImageObject,
): { width: number; height: number; } {
console.log("getImageDimensionsForPortableTextImage image", image)
  if (!image?.asset?._ref) {
    throw new Error('Unsupported PortableText image: Missing _ref');
  }

  const DEFAULT_WIDTH = 800;
  const DEFAULT_HEIGHT = 300;
  // example asset._ref:
  // image-7558c4a4d73dac0398c18b7fa2c69825882e6210-366x96-png
  // When splitting by '-' we can extract the dimensions, id and extension
  const dimensions = image.asset._ref.split('-')[2]
  const [width, height] = dimensions.split('x').map(Number)

  const finalWidth = width || DEFAULT_WIDTH;
  const finalHeight = height || DEFAULT_HEIGHT;

  if (image.crop) {
    const croppedWidth =
      width * (1 - (image.crop?.right || 0) - (image.crop?.left || 0))
    const croppedHeight =
      height * (1 - (image.crop?.top || 0) - (image.crop?.bottom || 0))
    return {
      width: croppedWidth,
      height: croppedHeight,
    }
  }

  return {
    width: finalWidth,
    height: finalHeight,
  }
}