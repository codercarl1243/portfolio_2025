import { forwardRef } from "react";
import { TabPanelProps } from "./tablist.type";
import clsx from "clsx";


/**
 * TabPanel Component
 * 
 * This component represents the content area for a single tab in a TabList.
 * It is rendered as a `<div>` with the ARIA `role="tabpanel"` for accessibility.
 * 
 * Props:
 * - Accepts all standard HTMLDivElement attributes.
 * - `label` prop is required by the parent TabList for tab header rendering but is not rendered in the DOM.
 *   It is destructured and intentionally ignored to prevent it from appearing as a DOM attribute.
 * 
 * Example:
 * ```tsx
 * <TabPanel id="panel1" label="Tab 1">
 *   <p>This is the content of Tab 1</p>
 * </TabPanel>
 * ```
 * 
 * Notes:
 * - Do not rely on the `label` prop inside this component. It is for parent use only.
 * - The component should always be used inside a TabList for proper ARIA management.
 */
export const TabPanel = forwardRef<HTMLDivElement, TabPanelProps>(
    ({
        children,
        className,
        ...props }, ref) => {

        const { label: _ignored, ...rest } = props
        console.log("props", props)
        return (
            <div
                role="tabpanel"
                className={clsx("tablist__content-panel", className)}
                ref={ref}
                {...rest}
            >
                {children}
            </div>
        )
    }
)

TabPanel.displayName = "TabPanel";

export default TabPanel;