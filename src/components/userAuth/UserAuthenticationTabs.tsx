import { Center, Box, Tabs, VStack } from "@chakra-ui/react";
import { useState } from "react";
import UserSignUpForm from "@/components/userAuth/UserSignUpForm";
import UserSignInForm from "@/components/userAuth/UserSignInForm";
import { useThemeCheck } from "@/context/themeCheck";
import { colors } from "../utils";

enum AuthTabStateEnum {
  signIn = "signIn",
  signUp = "signUp",
}

const UserAuthenticationTabs = () => {
  const [selectedTab, setSelectedTab] = useState<AuthTabStateEnum>(
    AuthTabStateEnum.signIn
  );
  const { isDarkTheme } = useThemeCheck();
  return (
    <Center w="100%" p={5}>
      <VStack
        w="100%"
        maxW="500px"
        border="1px solid #00000030"
        boxShadow="md"
        p={4}
        borderRadius="16px"
        bg={isDarkTheme ? colors.greyColor[8] : colors.greyColor[1]}
      >
        <Box w="100%" alignSelf="center">
          <Tabs.Root
            variant="enclosed"
            value={selectedTab}
            lazyMount
            unmountOnExit
            fitted
            onValueChange={(e) => {
              setSelectedTab(e.value as AuthTabStateEnum);
            }}
          >
            <Tabs.List w="100%" mb={4}>
              <Tabs.Trigger w="100%" value={AuthTabStateEnum.signUp} px={4}>
                Sign Up
              </Tabs.Trigger>
              <Tabs.Trigger w="100%" value={AuthTabStateEnum.signIn} px={4}>
                Sign In
              </Tabs.Trigger>
            </Tabs.List>
            <Tabs.Content value={AuthTabStateEnum.signUp} pb={2}>
              <UserSignUpForm />
            </Tabs.Content>
            <Tabs.Content value={AuthTabStateEnum.signIn} pb={2}>
              <UserSignInForm />
            </Tabs.Content>
          </Tabs.Root>
        </Box>
      </VStack>
    </Center>
  );
};

export default UserAuthenticationTabs;
