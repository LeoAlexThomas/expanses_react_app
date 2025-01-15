import Head from "next/head";
import { VStack, Box, Text, IconButton, useDisclosure } from "@chakra-ui/react";
import { colors } from "@/components/utils";
import { AddCircle } from "@emotion-icons/fluentui-system-regular/AddCircle";
import ProjectFormModel from "@/components/project/ProjectFormModel";

export default function Home() {
  const { open: isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Head>
        <title>Expanses</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <VStack alignItems="stretch">
        <Header />
        <ProjectFormModel isOpen={isOpen} onClose={onClose} />
        <IconButton
          pos="fixed"
          bottom={4}
          right={4}
          rounded="full"
          aria-label="add project"
          size={["md", null, "xl"]}
          _icon={{
            boxSize: ["30px", null, "35px"],
          }}
          onClick={onOpen}
        >
          <AddCircle />
        </IconButton>
      </VStack>
    </>
  );
}

const Header = () => {
  return (
    <Box px={6} py={4} bg={colors.greyColor[7]}>
      <Text
        fontFamily="Playfair Display"
        fontSize={[20, null, 26]}
        fontWeight={800}
        lineHeight="1.25"
        color={colors.greyColor[0]}
      >
        Expanses
      </Text>
    </Box>
  );
};
