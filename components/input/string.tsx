'use client';
import clsx from "clsx";
import { BaseInputProps } from "./input.type";
import { useCallback, useRef } from "react";

export default function StringInput({ className, onChange, ...props }: BaseInputProps) {
    const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {

        if (debounceTimeout.current) {
            clearTimeout(debounceTimeout.current);
        }

        debounceTimeout.current = setTimeout(() => {
            onChange?.(e);
        }, 250);
    }, [onChange]);

    return (
        <input
            className={clsx("input input__string", className)}
            type="text"
            onChange={handleChange}
            {...props}
        />
    )
}