import React from "react";
import { IconProps } from "../icon/icon.type";

export type ButtonProps = React.ComponentPropsWithRef<"button">

// Enforce either aria-label or aria-labelledby
type AccessibleLabel =
  | { 'aria-label': string; 'aria-labelledby'?: never }
  | { 'aria-labelledby': string; 'aria-label'?: never };

export type IconButtonProps = ButtonProps & AccessibleLabel & {
  icon?: React.ElementType;
  iconProps?: Omit<IconProps, 'icon'>;
}

export type ToggleButtonProps = ButtonProps & {
  toggled?: boolean;
  on?: React.ReactNode;
  off?: React.ReactNode;
}

export type SwitchButtonProps = Omit<ButtonProps, 'aria-checked'> & {
  isChecked: boolean;
  showCheckedState?: boolean;
}