import { defineField, defineType } from "sanity";
import { RiErrorWarningLine, RiFileDamageLine, RiFileEditLine } from "@remixicon/react";
import PostImagePreview from "../components/postImage.preview";
import PostImageInput from "../components/postImage.input";


export const postType = defineType({
    name: 'post',
    type: 'document',
    icon: RiFileEditLine,
    groups: [
        { name: 'details', title: 'Details' },
        { name: 'editorial', title: 'Editorial' },
    ],
    fields: [
        defineField({
            name: 'heading',
            type: 'string',
            group: 'details',
        }),
        defineField({
            name: 'image',
            description: "The main image for the page, this will be shown as a banner at the top. \n The image will be rendered out as 1200 x 200",
            type: 'CustomImage',
            group: 'details',
            options: {
                // collapsed: true,
                collapsible: true,
                modal: {
                    type: "dialog"
                }
            },
            components: {
                input: PostImageInput
            },
            // fields: [
            //     {
            //         name: 'image',
            //         type: 'CustomImage'
            //     }
            // ],
            // preview: {
            //     select: {
            //         media: 'image.asset',
            //         title: 'image.alt'
            //     },
            //     prepare({ media, title }) {
            //         console.log("media 2", media)
            //         console.log("title 2 ", title)
            //         return {
            //             title: title || `${RiErrorWarningLine} missing alt text!!`,
            //             media
            //         }
            //     }
            // }
        }),
        defineField({
            name: 'slug',
            type: 'slug',
            options: { source: 'heading' },
            validation: (Rule) =>
                Rule.custom((value, context) => {
                    // If heading has a value, slug must also have one
                    if (context.document?.heading && (!value || !value.current)) {
                        return 'Slug is required when heading is set';
                    }

                    return true;
                }),
            group: 'details',
        }),
        defineField({
            name: 'body',
            type: 'richText'
        })
    ],
    preview: {
        select: {
            title: "heading",
            date: "date",
            media: "image",
        },
        prepare({ title, date, media }) {
            const titleFormatted = title || 'Untitled';
            const dateFormatted = date
                ? new Date(date).toLocaleDateString(undefined, {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                })
                : 'No date';

            return {
                title: titleFormatted,
                subtitle: dateFormatted,
                media: media || RiFileDamageLine,
            }
        }
    },
})