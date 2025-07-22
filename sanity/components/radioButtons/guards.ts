import { StringInputProps } from "sanity";
import { StringInputPropsWithList } from "./radioButtons.type";

export function hasOptionsList(propObject: StringInputProps): propObject is StringInputPropsWithList {
  return (
    !!propObject &&
    typeof propObject === 'object' &&
    'schemaType' in propObject &&
    typeof propObject.schemaType === 'object' &&
    'options' in propObject.schemaType &&
    typeof propObject.schemaType.options === 'object' &&
    'list' in propObject.schemaType.options &&
    Array.isArray((propObject.schemaType.options as any).list)
  );
}