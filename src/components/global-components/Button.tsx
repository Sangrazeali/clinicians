import { forwardRef } from 'react';
import { Button as NextUIButton, ButtonProps as NextButtonProps } from '@nextui-org/react';



export interface IButtonProps extends NextButtonProps { }

const Button = forwardRef<HTMLButtonElement, IButtonProps>(
  ({ ...props }, ref) => {


    return <NextUIButton ref={ref} radius='sm'  {...props} />;
  }
);

Button.displayName = 'Button';
export default Button;
