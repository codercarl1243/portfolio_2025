import { Bold, Italic, Underline } from "@/components";
import { BlockDecoratorDefinition } from "sanity";

import { RiBold, RiItalic, RiUnderline } from "@remixicon/react";


export const decoratorStyles: BlockDecoratorDefinition[] = [
    { title: 'bold', value: 'b', icon: RiBold, component: ({ children }) => <Bold>{children}</Bold> },
    { title: 'italic', value: 'i', icon: RiItalic, component: ({ children }) => <Italic>{children}</Italic> },
    { title: 'Underline', value: 'underline', icon: RiUnderline, component: ({ children }) => <Underline>{children}</Underline> },
]