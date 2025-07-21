import { P, H1, H2, H3, H4, Blockquote } from "@/components";
import { BlockDecoratorDefinition } from "sanity";
import { RiFontSize } from "@remixicon/react";


export const textStyles: BlockDecoratorDefinition[] = [
    { title: 'p', value: 'normal', component: ({ children }) => <P>{children}</P> },
    { title: 'H1', value: 'h1', component: ({ children }) => <H1>{children}</H1> },
    { title: 'H2', value: 'h2', component: ({ children }) => <H2>{children}</H2> },
    { title: 'H3', value: 'h3', component: ({ children }) => <H3>{children}</H3> },
    { title: 'H4', value: 'h4', component: ({ children }) => <H4>{children}</H4> },
    { title: 'Quote', value: 'blockquote', component: ({ children }) => <Blockquote>{children}</Blockquote> },
    { title: 'small', value: 'small', icon: RiFontSize, component: ({ children }) => <small>{children}</small> },
]