import NextLink from "next/link"
import { LinkProps } from "./link.type";
import useLink from "./useLink";
import Icon from "../icon";



export default function Link({ children, href = "/#", variant = 'internal', ...props }: LinkProps) {
    const { getIcon, getRel } = useLink();
    const rel = getRel(variant);

    if (variant === 'internal') {
        return (
            <NextLink
                href={href}
                {...props}
                data-variant={variant}
                rel={rel}
                prefetch
            >
                {children}
            </NextLink>
        )
    }

    const icon = getIcon(variant)

    return (
        <a
            href={href}
            rel={rel}
            {...props}
            data-variant={variant}
        >
            {children}
             {icon && <Icon icon={icon}/>}
        </a>
    )
}