import { getImageDimensionsForPortableTextImage, urlFor } from "@/sanity/lib/image";
import { isSanityAssetResolved, isSanityAssetReference, isSanityImage } from "./guards";
import { TImageProps, TNextImageProps, TSanityImageProps } from "./image.type";

// add functionality for image size variants
export default function useImage() {

    function prepareProps(props: TImageProps): TNextImageProps {
        if (isSanityImage(props)) {
            props = handleSanityProps(props);
        }
        return props;
    }

    function handleSanityProps({value, height, width, ...props}: TSanityImageProps): TNextImageProps {
        let imageHeight = height || 800;
        let imageWidth = width || 300;
        let imageSrc: string | undefined;

        if (isSanityAssetReference(value)) {

            if (!height && !width) {
                const {width, height} = getImageDimensionsForPortableTextImage(value);
                imageWidth = width;
                imageHeight = height;
            }
            imageSrc = urlFor(value).url();
        }
        
        if (isSanityAssetResolved(value)) {

            if (!value.asset.url) {
                throw new Error(`Sanity asset is missing a URL, \n asset: ${JSON.stringify(value.asset, null, 2)}`);
            }
            imageSrc = value.asset.url;
        }
        if (!imageSrc) {
              throw new Error(`Image source could not be determined for value:\n${JSON.stringify(value, null, 2)}`);
        }

        return {
            ...props,
            src: imageSrc,
            width: imageWidth,
            height: imageHeight,
            alt: value?.alt ?? '',
            placeholder: "lqip" in props ? "blur" : "empty"
        }
    }
    return { prepareProps }

}