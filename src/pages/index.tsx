import Head from "next/head";
import { VStack, Box, Text, IconButton, useDisclosure } from "@chakra-ui/react";
import { colors } from "@/components/utils";
import { AddCircle } from "@emotion-icons/fluentui-system-regular/AddCircle";

export default function Home() {
  const { open, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Head>
        <title>Expanses</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <VStack alignItems="stretch">
        <Header />
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
