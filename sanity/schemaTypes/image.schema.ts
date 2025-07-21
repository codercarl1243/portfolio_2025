import { defineField, defineType, StringInput } from 'sanity'
import { RiImageAddLine } from "@remixicon/react";
import PostImagePreview from '../components/postImage.preview';


export const imageType = defineType({
    name: 'CustomImage',
    title: 'Image',
    type: 'image',
    icon: RiImageAddLine,
    options: {
        hotspot: true,
        modal: {type: "dialog"}
    },
    components: {
        preview: PostImagePreview
    },
    fields: [
        defineField({
            name: 'alt',
            type: 'string',
            components: {
                input: StringInput
            },
            title: 'Alternative text',
            validation: rule => rule.custom((value, context) => {
                const parent = context?.parent as { asset?: { _ref?: string } }

                return !value && parent?.asset?._ref ? 'Alt text is required when an image is present' : true
            }),
        }),
    ]
})