import { SanityAsset, SanityImageObject, SanityReference } from "@sanity/image-url/lib/types/types";
import { TImageProps, TSanityImageProps } from "./image.type";

export function isSanityImage(props: TImageProps): props is TSanityImageProps {
    return (props
        && 'value' in props
        && ('asset' in props.value || '_ref' in props.value));
}

type SanityImageValue = TSanityImageProps['value'];

export function isSanityAssetReference(
  value: SanityImageValue
):  value is SanityImageValue & { asset: SanityReference } {
 return (
    !!value &&
    typeof value === 'object' &&
    'asset' in value &&
    value.asset !== undefined &&
    typeof value.asset === 'object' &&
    '_ref' in value.asset &&
    typeof value.asset._ref === 'string'
  );
}

// Optional: full resolution check
export function isSanityAssetResolved(
  value: SanityImageValue
):  value is SanityImageValue & { asset: SanityAsset } {

  return (
    !!value &&
    typeof value === 'object' &&
    'asset' in value &&
    value.asset !== undefined &&
    typeof value.asset === 'object' &&
    'url' in value.asset &&
    typeof (value.asset as any).url === 'string'
  );
}