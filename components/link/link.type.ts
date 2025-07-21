
export type LinkVariant = 'internal' | 'external' | 'tel' | 'mailto' | 'onPage';
export type LinkProps = {
    variant?: LinkVariant;
} & React.ComponentPropsWithRef<'a'>;