export const sizeMap = {
  sm: 16,
  md: 24,
  lg: 32,
} as const;

export type PresetSize = keyof typeof sizeMap;

export type IconProps = {
  icon: React.ElementType;
  size?: PresetSize | number | string;
  color?: string;
} & React.SVGProps<SVGSVGElement>;

