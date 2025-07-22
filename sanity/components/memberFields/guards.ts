import { PortableTextBlock } from 'next-sanity';
import type { ArraySchemaType, BooleanSchemaType, EnumListProps, Fieldset, FieldSetMember, FileSchemaType, ImageSchemaType, ObjectMember, ObjectSchemaType, ReferenceSchemaType, SchemaType, StringSchemaType } from 'sanity';

export function isPortableText(schemaType: SchemaType): schemaType is ArraySchemaType<PortableTextBlock> {
    return (
        schemaType.jsonType === 'array' &&
        Array.isArray(schemaType.of) &&
        schemaType.of.some((ofType) => ofType.name === 'block')
    );
}

export function isFile(schemaType: SchemaType): schemaType is FileSchemaType {
    const name = schemaType.name;
    const typeName = schemaType.type?.name;
    return name === 'file' || typeName === 'file';
}

export function isImage(schemaType: SchemaType): schemaType is ImageSchemaType {
    const name = schemaType.name;
    const typeName = schemaType.type?.name;
    return name === 'image' || typeName === 'image';
}

export function isFieldSet(schemaType: SchemaType): schemaType is ObjectSchemaType & {
    fieldsets: Fieldset[];
} {
    return (
        schemaType.jsonType === 'object' &&
        Array.isArray(schemaType.fieldsets) &&
        schemaType.fieldsets.length > 0
    );
}

export function hasCustomLayout(schemaType: SchemaType): schemaType is SchemaType & { options?: { layout: 'radio' | 'dropdown' } } {
    const layout = schemaType.options?.layout;
    return layout === 'radio' || layout === 'dropdown';
}

export function isArrayWithListOptions(schemaType: SchemaType): schemaType is ArraySchemaType<unknown> {
    return schemaType.jsonType === 'array' && !!schemaType.options?.list;
}

export function isReference(schemaType: SchemaType): schemaType is ReferenceSchemaType {
    return schemaType.name === 'reference';
}


export function isBoolean(schemaType: SchemaType): schemaType is BooleanSchemaType {
    return schemaType.jsonType === 'boolean';
}