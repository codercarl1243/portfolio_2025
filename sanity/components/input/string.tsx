import StringInput from "@/components/input/string";
import React from "react";
import { PatchEvent, set, StringInputProps } from "sanity";

export default function SanityStringInput({ onChange, readOnly, value, ...props }: StringInputProps) {

    console.log("string input props", {props})
    function handleChange(e: React.ChangeEvent<HTMLInputElement>){
        console.log("handlechange inboked")
        onChange(PatchEvent.from(set(e.currentTarget.value)));
    }

    return (
        <StringInput
            onChange={handleChange}
            disabled={readOnly}
            value={value ?? ""}
        />
    )
}