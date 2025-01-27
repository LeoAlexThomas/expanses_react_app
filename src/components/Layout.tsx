import { VStack, Box, Text, HStack, IconButton } from "@chakra-ui/react";
import { colors, logout, unAutherizedPath } from "./utils";
import UserProfile from "./UserProfile";
import { useRouter } from "next/router";
import { ArrowIosBackOutline } from "@emotion-icons/evaicons-outline/ArrowIosBackOutline";
import { LogOut } from "@emotion-icons/boxicons-regular/LogOut";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <VStack
      alignItems="stretch"
      h="100vh"
      bgGradient="to-bl"
      gradientFrom="#356a9a10"
      gradientTo="#356a9a90"
    >
      <Header />
      {children}
    </VStack>
  );
};

const Header = () => {
  const router = useRouter();
  const showBackButton =
    router.asPath !== "/" && !unAutherizedPath.includes(router.asPath);
  return (
    <Box px={6} py={4} bg={colors.greyColor[7]}>
      <HStack justifyContent="space-between">
        <HStack>
          {showBackButton && (
            <IconButton
              aria-label="Back"
              onClick={() => router.back()}
              size="xs"
              variant="outline"
              borderRadius="8px"
              _icon={{
                width: "25px",
                height: "25px",
                color: "white",
              }}
            >
              <ArrowIosBackOutline />
            </IconButton>
          )}
          <Text
            fontFamily="Playfair Display"
            fontSize={[20, null, 26]}
            fontWeight={800}
            lineHeight="1.25"
            color={colors.greyColor[0]}
          >
            Expenses
          </Text>
        </HStack>
        <HStack>
          <UserProfile />
          <IconButton
            aria-label="Back"
            onClick={() => {
              logout();
              router.reload();
            }}
            variant="outline"
            borderRadius="8px"
            borderColor="white"
            _icon={{
              width: "25px",
              height: "25px",
              color: "white",
            }}
            _hover={{
              bg: "whiteAlpha.100",
            }}
          >
            <LogOut />
          </IconButton>
        </HStack>
      </HStack>
    </Box>
  );
};

export default Layout;
