import { VStack, Box, Text } from "@chakra-ui/react";
import { colors } from "./utils";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <VStack alignItems="stretch">
      <Header />
      {children}
    </VStack>
  );
};

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

export default Layout;
