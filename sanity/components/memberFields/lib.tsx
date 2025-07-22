import { ObjectMember, FieldMember } from "sanity"

/**
* @returns The matching `FieldMember`, or `undefined` if not found.
*/
export const getFieldMember = (members: ObjectMember[], name: string): FieldMember | undefined => {
    return members.find((member): member is FieldMember => member.kind === 'field' && member.name === name)
}

// Simple debounce utility function (no hook)
export const debounce = (fn: (...args: any[]) => void, delay: number) => {
    let timeoutId: NodeJS.Timeout;
    return function (...args: any[]) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => fn(...args), delay);
    };
}



type MergeableAttributes = {
    [key: string]: any;
};

/**
 * Safely merges two sets of HTML attributes, combining only known safe keys
 * like `className`, `aria-describedby`, and `aria-labelledby`.
 * All other keys will be overridden by `overrideAttrs`.
 *
 * @param baseAttrs - Base/internal attributes
 * @param overrideAttrs - External attributes (e.g. from props)
 * @param mergeKeys - Keys to merge as space-separated strings
 */
export function mergeAttributesSafe(
    baseAttrs: MergeableAttributes,
    overrideAttrs: MergeableAttributes,
    mergeKeys = ["className", "aria-describedby", "aria-labelledby"]
): MergeableAttributes {
    const result: MergeableAttributes = { ...baseAttrs };

    for (const key in overrideAttrs) {
        if (mergeKeys.includes(key)) {
            result[key] = [baseAttrs[key], overrideAttrs[key]].filter(Boolean).join(" ");
        } else {
            result[key] = overrideAttrs[key];
        }
    }

    return result;
}