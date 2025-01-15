import {
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogFooterProps,
  DialogHeader,
  DialogHeaderProps,
  DialogRoot,
} from "@chakra-ui/react";

const CustomModel = ({
  isOpen,
  onClose,
  title,
  modalTitleProps,
  children,
  footer,
  modalFooterProps,
}: {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  modalTitleProps?: DialogHeaderProps;
  footer: React.ReactNode;
  modalFooterProps?: DialogFooterProps;
  children: React.ReactNode;
}) => {
  return (
    <DialogRoot
      open={isOpen}
      onOpenChange={(data) => {
        if (!data.open) {
          onClose();
        }
      }}
      placement="center"
      size="lg"
    >
      <DialogContent>
        <DialogHeader {...modalTitleProps}>{title}</DialogHeader>
        <DialogBody bg="blue.50">{children}</DialogBody>
        <DialogFooter py={2} pr={4} {...modalFooterProps}>
          {footer}
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  );
};

export default CustomModel;
