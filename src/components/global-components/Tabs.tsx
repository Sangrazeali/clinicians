import { forwardRef } from 'react';
import { Tabs as NextTabs, Tab as NextTab, TabsProps as NextTabsProps } from '@nextui-org/react';


export interface ITabsProps extends Omit<NextTabsProps, 'variant'> {
    items: {
        label: string; index: number, children?: React.ReactNode | string
    }[];
    customVariant?: 'primary' | 'secondary' | 'bordered_b_Primary' | 'bordered_b_Secondary' | undefined;
}

const Tabs = forwardRef<HTMLDivElement, ITabsProps>((props, ref) => {
    const { className, items, customVariant = 'bordered', ...restProps } = props;

    return (
        <NextTabs
            ref={ref}
            classNames={{
                base:"w-full ",
                tabList:"w-full bg-white border rounded-full",
                cursor:"!bg-white rounded-full shadow-none",
                tab:"rounded-full data-[selected=true]:border data-[selected=true]:bg-white"
            }}
            color='default'
            {...restProps}
        >
            {items.map((item) => (
                <NextTab key={item.index} title={item.label}>
                    {item.children}
                </NextTab>
            ))}
        </NextTabs>
    );
});

Tabs.displayName = 'Tabs';

export default Tabs;
