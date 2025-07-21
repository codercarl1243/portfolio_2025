'use client'
import { ButtonProps } from "./Button.type";
import useButton from "./useButton";
import clsx from "clsx";
import { forwardRef } from "react";


/**
type="button" by default — Prevents accidental form submissions ✅

clsx for class merging — Clean and flexible.

Custom useButton hook — Allows for standardized behavior (logging, error handling, etc.).

Props spread last — Ensures intentional override behavior.

composable
 * */

export default function Button(
    {
        type = "button",
        onClick,
        children,
        className,
        ref,
        ...props

    }: ButtonProps) {

    const { handleClick } = useButton();

    return (
        <button
            className={clsx("button", className)}
            onClick={handleClick(onClick)}
            type={type}
            ref={ref}
            {...props}
        >
            {children}
        </button>
    )
}