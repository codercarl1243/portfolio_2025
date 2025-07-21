import { IconProps, sizeMap } from "./icon.type";

export default function Icon({
  icon: IconComponent,
  size = "md",
  color = "currentColor",
  ...props
}: IconProps) {

  const resolvedSize =
    typeof size === "string" && size in sizeMap
      ? sizeMap[size as keyof typeof sizeMap]
      : size;

  return (
    <IconComponent
      width={resolvedSize}
      height={resolvedSize}
      color={color}
      aria-hidden="true"
      focusable="false"
      {...props}
    />
  );
}