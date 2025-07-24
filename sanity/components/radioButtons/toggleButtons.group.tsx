import { ToggleButton } from "@/components/button"
import { PatchEvent, set, StringInputProps } from "sanity";
import { hasOptionsList } from "./guards";
import { useId, useMemo } from "react";

export default function ImageSizeToggleGroup(props: StringInputProps) {

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
        if (props.value !== value ) {
            props.onChange(PatchEvent.from(set(value)));
        }
    }


    const ToggleButtonList = () => {
        return list.map((value, index) => (
            <ToggleButton
                key={value + index}
                onClick={() => handleChange(value)}
                toggled={props.value === value}
                disabled={props.value === value || props.readOnly}
            >
                {value}
            </ToggleButton>
        ))
    }

    return (
            <fieldset id={props.id} className="p-0 m-0 border-none">
                {props.schemaType.title && (
                    <legend id={labelId} className="memberfield__field--label">
                        {props.schemaType.title}
                    </legend>
                )}
                <p className="memberfield__field--description">{props.schemaType.description}</p>
                <ToggleButtonList />
            </fieldset>
    )
}