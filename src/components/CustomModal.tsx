import {
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
} from "@/components/ui/dialog";
import {
  DialogFooterProps,
  DialogHeaderProps,
  DialogRootProps,
} from "@chakra-ui/react";

const CustomModel = ({
  isOpen,
  onClose,
  title,
  modalTitleProps,
  children,
  footer,
  modalFooterProps,
  ...props
}: {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  modalTitleProps?: DialogHeaderProps;
  footer: React.ReactNode;
  modalFooterProps?: DialogFooterProps;
  children: React.ReactNode;
} & DialogRootProps) => {
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
      {...props}
    >
      <DialogContent>
        <DialogHeader
          fontFamily="Playfair Display"
          fontSize={["20px", null, "28px"]}
          fontWeight={800}
          px={6}
          py={4}
          {...modalTitleProps}
        >
          {title}
        </DialogHeader>

        <DialogBody px={6} py={4} bg="blue.50">
          {children}
        </DialogBody>
        <DialogFooter py={2} pr={4} {...modalFooterProps}>
          {footer}
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  );
};

export default CustomModel;
