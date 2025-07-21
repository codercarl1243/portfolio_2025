import { handleKey } from "@/utils/keyboardHandlers";
import React, { ReactElement, useEffect, useRef, useState } from "react";
import { TabListProps, TabPanelProps } from "./tablist.type";

type useTablistProps = {
    tabs: TabListProps['children'];
    orientation: TabListProps['orientation'];
    controlledId?: string;
    defaultActiveTabId?: string;
    onChange?: (tabId: string) => void;
}

export default function useTabList({
    tabs = [],
    orientation,
    controlledId,
    defaultActiveTabId,
    onChange
}: useTablistProps
) {
    const tabArray = React.Children.toArray(tabs).filter(
                        (child): child is ReactElement<TabPanelProps> =>
                                React.isValidElement<TabPanelProps>(child) &&
                                !!child.props.id &&
                                child.props.label != null
                        );
    const [activeId, setActiveId] = useState<string | null>(() => {
        if (controlledId !== undefined) return controlledId;
        return defaultActiveTabId || tabArray[0]?.props.id || null;
    });

    const refs = useRef(tabArray.map(tab => ({
        id: tab.props.id,
        tabRef: React.createRef<HTMLButtonElement>(),
        panelRef: React.createRef<HTMLDivElement>(),
    })));

    useEffect(() => {
        if (controlledId !== undefined) {
            setActiveId(controlledId);
        }
    }, [controlledId]);

    const selectItem = () => {
        if (!refs?.current) return;

        const activePanel = refs.current.find(item => item.id === activeId);
        console.log("focusing on ",  activePanel?.panelRef.current)
        activePanel?.panelRef.current?.focus();
    };


    const handleTabSelection = (id: string) => {
        if (controlledId === undefined) {
            setActiveId(id);
        }
        if (onChange) {
            onChange(id);
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {

        const currentIndex = refs.current.findIndex(tab => tab.id === activeId);
        const lastIndex = refs.current.length - 1;

        const noop = () => { };

        function moveNext() {
            e.stopPropagation();
            const newIndex = currentIndex === lastIndex ? 0 : currentIndex + 1;
            handleTabSelection(refs.current[newIndex].id);
        }
        function movePrev() {
            e.stopPropagation();
            const newIndex = currentIndex === 0 ? lastIndex : currentIndex - 1;
            handleTabSelection(refs.current[newIndex].id);
        }

        const keyMap = orientation === 'vertical'
            ? {
                ArrowDown: moveNext,
                ArrowUp: movePrev,
                ArrowRight: noop,
                ArrowLeft: noop,
                Tab: selectItem
            }
            : {
                ArrowRight: moveNext,
                ArrowLeft: movePrev,
                ArrowDown: noop,
                ArrowUp: noop,
                Tab: selectItem
            };

        handleKey(e, keyMap);
    };


    return {
        activeId, handleTabSelection, handleKeyDown, refs, validChildren: tabArray
    }
}