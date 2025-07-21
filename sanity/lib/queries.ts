import { defineQuery, groq } from "next-sanity";

// const imageContents = `
//   {
//     "asset": asset,
//     "alt": coalesce(alt, ""),
//     "lqip": asset->metadata.lqip
//   }
// `;

// const cleanLinks = `
//   {
//     ...,
//     "url": coalesce(
//       select(
//         document->_type == "post" => "/posts/" + document->slug.current,
//         document->_type == "page" => "/" + document->slug.current,
//         "/" + document->_type + "/" + document->slug.current
//       ),
//       "#"
//     )
//   }
// `;

export const POSTS_QUERY = defineQuery(`*[_type == "post" && defined(slug.current) && defined(heading)]{
            ...,
            body[]{
                ...,
                _type == "image" => {
                    "asset": asset,
                    "alt": coalesce(alt, ""),
                    "lqip": asset->metadata.lqip
                },
                markDefs[]{
                    ...,
                    _type == "link" && linkType == "internal" => {
                        ...,
                        "url": coalesce(
                        select(
                            document->_type == "post" => "/posts/" + document->slug.current,
                            document->_type == "page" => "/" + document->slug.current,
                            "/" + document->_type + "/" + document->slug.current
                        ),
                        "#"
                        )
                    }
                }
            }
        } | order(date desc)`)