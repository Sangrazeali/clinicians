import { forwardRef } from "react";
import {
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
    Dropdown as NextDropdown,
    DropdownProps as NextDropdownProps,
} from "@nextui-org/react";

export interface IDropdownProps extends NextDropdownProps {
    className?: string;
    array: any[];
    baseClasses?: string[];
}

const Dropdown = forwardRef<HTMLDivElement, IDropdownProps>((props, ref) => {
    const { className, children, baseClasses, array, ...restProps } = props;

    return (
        <NextDropdown
            ref={ref}
            className={className}
            {...restProps}
        >
            <DropdownTrigger children={children?.[0]} />

            <DropdownMenu
                itemClasses={{
                    base: baseClasses
                }}
            >
                {array?.map((item) => (
                    <DropdownItem key={item} value={item}>
                        {item}
                    </DropdownItem>
                ))}
            </DropdownMenu>
        </NextDropdown>
    );
});

Dropdown.displayName = "Dropdown";

export default Dropdown;
