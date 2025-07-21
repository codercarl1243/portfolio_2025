'use client'
import { forwardRef } from "react";
import { SwitchButtonProps } from "./Button.type";
import Button from ".";
import clsx from "clsx";


export default function SwitchButton({
    isChecked = false,
    children,
    className,
    showCheckedState = false,
    ref,
    ...props }: SwitchButtonProps) {

    const OnOffLabel = () => (
        <span className={clsx(isChecked ? "on" : "off", "on-off-label")} aria-hidden="true">
            {isChecked ? "On" : "Off"}
        </span>
    );

    return (
        <Button
            className={clsx("switchButton", { "switch__only": !showCheckedState && !children }, className)}
            ref={ref}
            role="switch"
            aria-checked={isChecked}
            data-checked={isChecked}
            {...props}
        >
            {children ?
                <span className="switch__content" data-checked={isChecked}>
                    {children}
                </span>
                : null
            }
            <span className="switch" data-checked={isChecked} />
            {showCheckedState ? <OnOffLabel /> : null}
        </Button>
    )
}