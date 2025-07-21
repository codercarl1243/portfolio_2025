import TabListComponent from "./tablist";
import TabPanel from "./panel";
import type { TabListProps, TabPanelProps } from "./tablist.type";
export type { TabListProps, TabPanelProps };

const TabList = Object.assign(TabListComponent, { Panel: TabPanel });

export default TabList;
