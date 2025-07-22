import { ToggleButton } from "@/components/button"
import { Card } from "@sanity/ui"
import { OptionsList } from "./radioButtons.type";
import { PatchEvent, set, StringInputProps } from "sanity";
import { hasOptionsList } from "./guards";
import { useId, useMemo, useState } from "react";
import { Italic } from "@/components";

export default function ToggleButtonGroup(props: StringInputProps) {

    if (!hasOptionsList(props)) {
        return props.renderDefault(props);
    }
    console.log("ToggleButtonGroup props", props)
    const labelId = useId();

    const list = useMemo(() => (props.schemaType.options.list || [])
        .map(item => typeof item === "string" ? item : item.value)
        .filter(item => item !== undefined)
        , [props.schemaType.options.list]);

    function handleChange(value: string) {
        props.onChange(PatchEvent.from(set(value)));
    }


    const ToggleButtonList = () => {
        return list.map((value, index) => (
            <ToggleButton
                key={value + index}
                onClick={() => handleChange(value)}
                toggled={props.value === value}
            >
                {value}
            </ToggleButton>
        ))
    }

    return (
        <Card>
            <fieldset id={props.id}>
                {props.schemaType.title && (
                    <legend id={labelId} className="font-weight-bold font-lg">
                        {props.schemaType.title}
                    </legend>
                )}
                <p className="font-weight-light italic">{props.schemaType.description}</p>
                <ToggleButtonList />
            </fieldset>
        </Card>
    )
}