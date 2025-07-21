'use client'
import { forwardRef } from "react";
import { IconButtonProps } from "./Button.type";
import Button from ".";
import clsx from "clsx";
import Icon from "../icon";


/**
 * Requires either aria-label or aria-labelledBy to be passed
 */
export default function IconButton({
    children,
    className,
    icon,
    iconProps,
    ref,
    ...props }: IconButtonProps) {
    return (
        <Button
            className={clsx("iconButton", className)}
            ref={ref}
            {...props}
        >
            {children}
            {icon && <Icon icon={icon} {...iconProps} />}
        </Button>
    )
}