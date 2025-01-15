import {
    Checkbox as NextUICheckbox,
    CheckboxProps as NextUICheckboxProps,
  } from "@nextui-org/react";
  import { forwardRef } from "react";
  
  interface CheckboxProps extends NextUICheckboxProps {
    label?: string;
  }
  
  const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
    ({ label, ...props }, ref) => {
      return (
        <NextUICheckbox
          radius={props.radius ? props.radius : "sm"}
          ref={ref}
          classNames={{
            base:"cursor-pointer border-none rounded-lg gap-2 p-4 border-2 border-transparent",
            wrapper:"border border-app-primary shadow-none before:!border-none group-data-[selected=true]:!bg-app-primary",
          }}
          {...props}
        >
          {label}
        </NextUICheckbox>
      );
    }
  );
  
  Checkbox.displayName = "Checkbox";
  
  export default Checkbox;
  