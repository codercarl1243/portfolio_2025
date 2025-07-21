
'use client';
import Button from "../button";
import clsx from "clsx";
import useTabList from "./useTablist";
import { TabListProps } from "./tablist.type";
import TabPanel from "./panel";


export default function TabList({ onChange, activeTabId, defaultActiveTabId, children, orientation = "horizontal", ...props }: TabListProps) {

    const { activeId, handleTabSelection, handleKeyDown, refs, validChildren } = useTabList(
        { tabs: children, orientation, controlledId: activeTabId, defaultActiveTabId, onChange }
    );

    const isActive = (id: string) => id === activeId;

    return (
        <div
            className="tablist"
        >
            <div
                className="tablist__header"
                role="tablist"
                onKeyDown={handleKeyDown}
                aria-orientation={orientation}
                {...props}
            >
                {validChildren.map((tab, index) => {
                    const { id, label } = tab.props
                    return (
                        <Button
                            key={`tab-${index}`}
                            role="tab"
                            id={`tab-${id}`}
                            aria-selected={isActive(id)}
                            aria-controls={`panel-${id}`}
                            tabIndex={isActive(id) ? 0 : -1}
                            className={clsx(
                                'tablist__header-tab px-4 py-2',
                                isActive(id)
                                    ? 'border-b-2 border-current font-medium'
                                    : 'opacity-60'
                            )}
                            ref={refs.current[index].tabRef}
                            onClick={() => handleTabSelection(id)}
                        >
                            {label}
                        </Button>
                    )
                }

                )}
            </div>
            <div className="tablist__content">
                {validChildren.map((tab, index) => {
                    const { id, ...rest } = tab.props;
                    return (
                        <TabPanel
                            key={`panel-${index}`}
                            id={`panel-${id}`}
                            aria-labelledby={`tab-${id}`}
                            hidden={!isActive(id)}
                            ref={refs.current[index].panelRef}
                            tabIndex={-1}
                            {...rest}
                        >
                            {tab.props.children}
                        </TabPanel>
                    )
                }
                )}
            </div>

        </div>
    )
}
