'use client'
import { forwardRef } from "react";
import { ButtonProps } from "./Button.type";
import styles from './button.module.css'
import Button from ".";
import clsx from "clsx";


export default function SubmitButton({
    children,
    className,
    ref,
    ...props
}: Omit<ButtonProps, 'type'>) {

    return (
        <Button
            className={clsx(styles.SubmitButton, className)}
            ref={ref}
            {...props}
            type="submit"
        >
            {children}
        </Button>
    )
}
