'use client'
import { useCallback, useState } from "react";
import { ToggleButtonProps } from "./Button.type";
import Button from ".";
import clsx from "clsx";


export default function ToggleButton({
    toggled = false,
    on = "on",
    off = "off",
    onClick,
    children,
    className,
    ref,
    ...props
}: ToggleButtonProps) {
    const [isToggled, setIsToggled] = useState(toggled);

    const handleClick = useCallback(
        (event: React.MouseEvent<HTMLButtonElement>) => {
            setIsToggled(prev => !prev);
            onClick?.(event);
        },
        [onClick]
    );

    return (
        <Button
            className={clsx("toggleButton", className)}
            ref={ref}
            onClick={handleClick}
            aria-pressed={isToggled}
            data-pressed={isToggled}

            {...props}
        >
            {children ?
                children :
                (<>{isToggled ? on : off}</>)
            }
        </Button>
    )
}