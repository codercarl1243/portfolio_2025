import type { EnumListProps, StringInputProps, StringSchemaType, TitledListValue } from 'sanity';

export type OptionsList = { title: string; value: string }[];

export type StringListSchemaType = StringSchemaType & {
  options: EnumListProps<string>;
};

export type StringInputPropsWithList = Omit<StringInputProps, 'schemaType'> & {
  schemaType: StringListSchemaType;
};