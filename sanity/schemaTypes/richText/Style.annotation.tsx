import { P } from "@/components";
import { defineArrayMember } from "sanity";


export const annotationStyles = [
    defineArrayMember({
        name: 'link',
        type: 'object',
        title: 'Link',
        fields: [
            {
                name: 'text',
                type: 'string',
                title: 'Link Text',
                description: 'The text that will be displayed for the link.',
                options: {
                    wordCount: true,
                },
                validation: (Rule) =>
                    Rule.required()
                        .min(2)
                        .max(30)
                        .error('required characters between 5 and 30'),
            },
            {
                name: 'linkType',
                type: 'string',
                title: 'Link Type',
                options: {
                    list: ['internal', 'external', 'mailto', 'tel', 'onPage'],
                    layout: 'dropdown',
                },
                initialValue: 'external',
            },
            {
                name: 'onPageUrl',
                type: 'string',
                title: 'url',
                hidden: ({ parent }) => parent?.linkType !== 'onPage',
                // components: {
                //     input: () => P
                // }
            },
            {
                name: 'url',
                type: 'string',
                title: 'External URL',
                description: "Enter an external URL (e.g. www.example.com).",
                hidden: ({ parent }) => !['external', 'mailto', 'tel', ].includes(parent?.linkType),
                validation: Rule => [
                        // Check for whitespace
                        Rule.custom((value) => {
                            if (!value || typeof value !== 'string') return true;
                            if (value !== value.trim()) {
                                return "This link has whitespace at the beginning or end that may cause issues. Please remove the extra spaces.";
                            }
                            return true;
                        }).warning(),

                        // Check for insecure http scheme
                        Rule.custom((value) => {
                            if (!value || typeof value !== 'string') return true;
                            if (/^http:/.test(value.trim())) {
                                return `This link starts with "http:", did you mean "https:"?`;
                            }
                            return true;
                        }).warning(),

                        // Validate mailto: links
                        Rule.custom((value) => {
                            if (!value || typeof value !== 'string') return true;
                            const trimmed = value.trim();
                            if (/^mailto:/i.test(trimmed)) {
                                const email = trimmed.slice(7); // remove "mailto:"
                                const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
                                if (!isValidEmail) {
                                    return "This 'mailto:' link doesn't look like a valid email address,\n it should be similar to 'mailto:user@​example.com'.";
                                }
                            }
                            return true;
                        }).warning(),

                        // Check for malformed www patterns
                        Rule.custom((value) => {
                            if (!value || typeof value !== 'string') return true;
                            const trimmed = value.trim();
                            // Skip this check for mailto: and tel: schemes
                            if (/^(mailto:|tel:)/i.test(trimmed)) return true;

                            const noScheme = trimmed.replace(/^[a-zA-Z]+:\/{0,2}/, '');
                            if (/^w{1,2}\.|^w{4,}\./.test(noScheme)) {
                                return "Please check the start of the web address. It usually begins with 'www'.";
                            }
                            return true;
                        }).warning(),

                        // Errors

                        // Check for scheme with incorrect slashes (e.g. http:/ or https:/)
                        Rule.custom(value => {
                            if (!value || typeof value !== 'string') return true;
                            if (/^(mailto:|tel:)/i.test(value.trim().toLowerCase())) return true;

                            const schemeMatch = value.trim().match(/^([a-zA-Z]+):(\/?\/?)/);
                            if (schemeMatch && schemeMatch[2] !== "//") {
                                const scheme = schemeMatch[1];
                                const actualSlashes = schemeMatch[2].length;
                                const missingSlashCount = 2 - actualSlashes;

                                return `This link starts with "${scheme}:" but is missing "${"/".repeat(missingSlashCount)}". Did you mean "${scheme}://${value.trim().slice(scheme.length + 1 + actualSlashes)}"?`;
                            }
                            return true;
                        }).error(),

                        // Check for invalid scheme
                        Rule.custom(value => {
                            if (!value || typeof value !== 'string') return true;
                            if (/^(mailto:|tel:)/i.test(value.trim().toLowerCase())) return true;

                            const lower = value.trim().toLowerCase();
                            const schemePrefixMatch = lower.match(/^([a-zA-Z]+):\/\//);
                            const userScheme = schemePrefixMatch?.[1];

                            const hasValidScheme = /^(https?|mailto|tel)$/.test(userScheme ?? "");
                            if (!hasValidScheme && userScheme) {
                                return `This link starts with "${userScheme}:" which may not work. Try using https://, mailto:, or tel: at the beginning.`;
                            }
                            return true;
                        }).error(),

                        // Validate URL format
                        Rule.custom(value => {
                            if (!value || typeof value !== 'string') return true;
                            if (/^(mailto:|tel:)/i.test(value.trim().toLowerCase())) return true;

                            try {
                                const trimmed = value.trim();
                                const schemePrefixMatch = trimmed.toLowerCase().match(/^([a-zA-Z]+):\/\//);
                                const userScheme = schemePrefixMatch?.[1];

                                // Ensure that URL object can be made with the trimmed value
                                userScheme ? new URL(trimmed) : new URL(`https://${trimmed}`);
                                return true;
                            } catch (error) {
                                return "Hmm, that doesn't look like a valid link. Please double-check the address.";
                            }
                        }).error()
                    ]

            },
            {
                name: 'reference',
                type: 'reference',
                title: 'Internal Reference',
                to: [
                    { type: 'post' },
                ],
                hidden: ({ parent }) => parent?.linkType !== 'internal',
            }
        ],
    })
]