/**
 * ---------------------------------------------------------------------------------
 * This file has been generated by Sanity TypeGen.
 * Command: `sanity typegen generate`
 *
 * Any modifications made directly to this file will be overwritten the next time
 * the TypeScript definitions are generated. Please make changes to the Sanity
 * schema definitions and/or GROQ queries if you need to update these types.
 *
 * For more information on how to use Sanity TypeGen, visit the official documentation:
 * https://www.sanity.io/docs/sanity-typegen
 * ---------------------------------------------------------------------------------
 */

// Source: schema.json
export type RichText = Array<{
  children?: Array<{
    marks?: Array<string>;
    text?: string;
    _type: "span";
    _key: string;
  }>;
  style?: "normal" | "h1" | "h2" | "h3" | "h4" | "blockquote" | "small";
  listItem?: "number" | "bullet";
  markDefs?: Array<{
    text: string;
    linkType?: "internal" | "external" | "mailto" | "tel" | "onPage";
    onPageUrl?: string;
    url?: string;
    reference?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "post";
    };
    _type: "link";
    _key: string;
  }>;
  level?: number;
  _type: "block";
  _key: string;
} | {
  asset?: {
    _ref: string;
    _type: "reference";
    _weak?: boolean;
    [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
  };
  media?: unknown;
  hotspot?: SanityImageHotspot;
  crop?: SanityImageCrop;
  variant?: "normal" | "hero" | "banner";
  alt?: string;
  _type: "CustomImage";
  _key: string;
}>;

export type Post = {
  _id: string;
  _type: "post";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  heading: string;
  image?: {
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
    };
    media?: unknown;
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    variant?: "normal" | "hero" | "banner";
    alt?: string;
    _type: "CustomImage";
  };
  slug: Slug;
};

export type CustomImage = {
  _type: "CustomImage";
  asset?: {
    _ref: string;
    _type: "reference";
    _weak?: boolean;
    [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
  };
  media?: unknown;
  hotspot?: SanityImageHotspot;
  crop?: SanityImageCrop;
  variant?: "normal" | "hero" | "banner";
  alt?: string;
};

export type SanityImagePaletteSwatch = {
  _type: "sanity.imagePaletteSwatch";
  background?: string;
  foreground?: string;
  population?: number;
  title?: string;
};

export type SanityImagePalette = {
  _type: "sanity.imagePalette";
  darkMuted?: SanityImagePaletteSwatch;
  lightVibrant?: SanityImagePaletteSwatch;
  darkVibrant?: SanityImagePaletteSwatch;
  vibrant?: SanityImagePaletteSwatch;
  dominant?: SanityImagePaletteSwatch;
  lightMuted?: SanityImagePaletteSwatch;
  muted?: SanityImagePaletteSwatch;
};

export type SanityImageDimensions = {
  _type: "sanity.imageDimensions";
  height?: number;
  width?: number;
  aspectRatio?: number;
};

export type SanityImageHotspot = {
  _type: "sanity.imageHotspot";
  x?: number;
  y?: number;
  height?: number;
  width?: number;
};

export type SanityImageCrop = {
  _type: "sanity.imageCrop";
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
};

export type SanityFileAsset = {
  _id: string;
  _type: "sanity.fileAsset";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  originalFilename?: string;
  label?: string;
  title?: string;
  description?: string;
  altText?: string;
  sha1hash?: string;
  extension?: string;
  mimeType?: string;
  size?: number;
  assetId?: string;
  uploadId?: string;
  path?: string;
  url?: string;
  source?: SanityAssetSourceData;
};

export type SanityImageAsset = {
  _id: string;
  _type: "sanity.imageAsset";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  originalFilename?: string;
  label?: string;
  title?: string;
  description?: string;
  altText?: string;
  sha1hash?: string;
  extension?: string;
  mimeType?: string;
  size?: number;
  assetId?: string;
  uploadId?: string;
  path?: string;
  url?: string;
  metadata?: SanityImageMetadata;
  source?: SanityAssetSourceData;
};

export type SanityImageMetadata = {
  _type: "sanity.imageMetadata";
  location?: Geopoint;
  dimensions?: SanityImageDimensions;
  palette?: SanityImagePalette;
  lqip?: string;
  blurHash?: string;
  hasAlpha?: boolean;
  isOpaque?: boolean;
};

export type Geopoint = {
  _type: "geopoint";
  lat?: number;
  lng?: number;
  alt?: number;
};

export type Slug = {
  _type: "slug";
  current: string;
  source?: string;
};

export type SanityAssetSourceData = {
  _type: "sanity.assetSourceData";
  name?: string;
  id?: string;
  url?: string;
};

export type AllSanitySchemaTypes = RichText | Post | CustomImage | SanityImagePaletteSwatch | SanityImagePalette | SanityImageDimensions | SanityImageHotspot | SanityImageCrop | SanityFileAsset | SanityImageAsset | SanityImageMetadata | Geopoint | Slug | SanityAssetSourceData;
export declare const internalGroqTypeReferenceTo: unique symbol;
// Source: ./sanity/lib/queries.ts
// Variable: POSTS_QUERY
// Query: *[_type == "post" && defined(slug.current)]{            ...,            body[]{                ...,                _type == "image" => {                    "asset": asset,                    "alt": coalesce(alt, ""),                    "lqip": asset->metadata.lqip                },                markDefs[]{                    ...,                    _type == "link" && linkType == "internal" => {                        ...,                        "url": coalesce(                        select(                            document->_type == "post" => "/posts/" + document->slug.current,                            document->_type == "page" => "/" + document->slug.current,                            "/" + document->_type + "/" + document->slug.current                        ),                        "#"                        )                    }                }            }        } | order(date desc)
export type POSTS_QUERYResult = Array<{
  _id: string;
  _type: "post";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  heading: string;
  image?: {
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
    };
    media?: unknown;
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    variant?: "banner" | "hero" | "normal";
    alt?: string;
    _type: "CustomImage";
  };
  slug: Slug;
  body: null;
}>;

// Query TypeMap
import "@sanity/client";
declare module "@sanity/client" {
  interface SanityQueries {
    "*[_type == \"post\" && defined(slug.current)]{\n            ...,\n            body[]{\n                ...,\n                _type == \"image\" => {\n                    \"asset\": asset,\n                    \"alt\": coalesce(alt, \"\"),\n                    \"lqip\": asset->metadata.lqip\n                },\n                markDefs[]{\n                    ...,\n                    _type == \"link\" && linkType == \"internal\" => {\n                        ...,\n                        \"url\": coalesce(\n                        select(\n                            document->_type == \"post\" => \"/posts/\" + document->slug.current,\n                            document->_type == \"page\" => \"/\" + document->slug.current,\n                            \"/\" + document->_type + \"/\" + document->slug.current\n                        ),\n                        \"#\"\n                        )\n                    }\n                }\n            }\n        } | order(date desc)": POSTS_QUERYResult;
  }
}
