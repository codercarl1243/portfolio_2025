import { defineArrayMember, defineField } from "sanity";
import ToggleButtonGroup from "@/sanity/components/radioButtons/toggleButtons.group";
import FieldComponentWithNoLabelOrDescription from "@/sanity/components/field";

export const types = [
    defineArrayMember(
        {
            type: 'image',
            fields: [
                defineField({
                    name: 'alt',
                    type: 'string',
                    title: 'Alternative text',
                    validation: rule => rule.custom((value, context) => {
                        const parent = context?.parent as { asset?: { _ref?: string } }

                        return !value && parent?.asset?._ref ? 'Alt text is required when an image is present' : true
                    }),
                }),
                defineField({
                    name: 'variant',
                    type: 'string',
                    title: 'image Size',
                    options: {
                        list: ['normal','hero','banner','figure'],
                        layout: 'radio',
                    },
                    description: 'Set to "Figure" to enable image captions. Locked when caption text is present.',
                    readOnly: ({parent}) => parent?.variant === 'figure' && Boolean(parent?.caption?.trim()),
                    initialValue: 'normal',
                    components: {
                        field: FieldComponentWithNoLabelOrDescription,
                        input: ToggleButtonGroup
                    }
                }),
                defineField({
                    name: 'caption',
                    type: 'string',
                    hidden: ({ parent }) => parent?.variant !== 'figure'
                })
            ]
        },
    )
]