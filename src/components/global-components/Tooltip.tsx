import { Tooltip as NextTooltip } from "@nextui-org/react";

export interface TooltipProps {
    message: string,
    children: React.ReactNode
}
function Tooltip(props: TooltipProps) {
    const { message, children } = props;
    return (
        <div>
            <NextTooltip color="foreground" showArrow={true} content={message}>
                {children}
            </NextTooltip>

        </div>
    )
}

export default Tooltip
