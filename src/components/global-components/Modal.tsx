import React, { forwardRef } from "react";
import { Modal as NextModal, ModalProps as NextModalProps, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/react";
import Button from "./Button";

export interface IModalProps extends NextModalProps {
    title?: string,
    bodyContent?: string | React.ReactNode,
    primaryButtonLabel?: string,
    secondaryButtonLabel?: string,
    children: React.ReactNode | string,
    btncolor?: "default" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined,
    btnClasses?: string
}
const Modal = forwardRef<HTMLDivElement, IModalProps>((props, ref) => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const { children, title, btncolor, bodyContent, primaryButtonLabel, secondaryButtonLabel,btnClasses, ...rest } = props;
    return (
        <>
            <Button onPress={onOpen} color={btncolor} size="md" fullWidth={true} className={btnClasses} radius="sm" >{children}</Button>
            <NextModal ref={ref} {...rest} isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false}  isKeyboardDismissDisabled={true}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
                            <ModalBody>
                                {bodyContent}
                            </ModalBody>
                            {secondaryButtonLabel || primaryButtonLabel && (
                                <ModalFooter>
                                    <Button color="danger" variant="light" onPress={onClose}>
                                        {secondaryButtonLabel}
                                    </Button>
                                    <Button color="primary">
                                        {primaryButtonLabel}
                                    </Button>
                                </ModalFooter>
                            )}

                        </>
                    )}
                </ModalContent>
            </NextModal>
        </>
    );
});

Modal.displayName = 'Modal';

export default Modal;