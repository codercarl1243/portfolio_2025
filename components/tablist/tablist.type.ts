import React, { ReactElement } from "react";

export type TabPanelProps = { 
    label: React.ReactNode;
    id: string;
} & React.HTMLAttributes<HTMLDivElement>;


export type TabListProps = {
    onChange?: (tabId: string) => void;
    activeTabId?: string;
    defaultActiveTabId?: string;
    orientation?: 'vertical' | 'horizontal';
    children?: ReactElement<TabPanelProps> | ReactElement<TabPanelProps>[];
} & React.HTMLAttributes<HTMLDivElement>;