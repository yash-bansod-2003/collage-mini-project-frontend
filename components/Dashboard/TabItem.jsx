import { Tabs } from 'flowbite-react';

const TabItem = ({ title, icon, children }) => {
    return (
        <Tabs.Item title={title} icon={icon}>
            {children}
        </Tabs.Item>
    );
};

export default TabItem;
