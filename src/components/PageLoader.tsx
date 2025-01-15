import {
  DialogBody,
  DialogContent,
  DialogRoot,
  Flex,
  Spinner,
} from "@chakra-ui/react";

interface PageLoaderProps {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
}

const PageLoader = (props: PageLoaderProps) => {
  return (
    <DialogRoot
      open={props.isOpen}
      closeOnInteractOutside={false}
      placement="center"
      role="dialog"
      onOpenChange={(data) => {
        if (!data.open) {
          props.onClose();
        }
      }}
      scrollBehavior="inside"
      size="xs"
    >
      <DialogContent>
        <DialogBody py={8}>
          <Flex justify="center" align="center" color="black">
            <Spinner color="highlightColor" mr={3} /> Loading...
          </Flex>
        </DialogBody>
      </DialogContent>
    </DialogRoot>
  );
};

export default PageLoader;
