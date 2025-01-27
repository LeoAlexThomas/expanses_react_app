import UserAuthenticationTabs from "@/components/userAuth/UserAuthenticationTabs";
import { colors } from "@/components/utils";
import { Center, Image, SimpleGrid, Text, VStack } from "@chakra-ui/react";

const SignIn = () => {
  return (
    <VStack
      w="100%"
      alignItems="stretch"
      bgGradient="to-br"
      gradientFrom={colors.blueColor[1]}
      gradientTo={colors.blueColor[8]}
      h="100vh"
      justifyContent="center"
      gap={[10, null, 50]}
    >
      <Text
        fontFamily="Playfair Display"
        fontSize={["42px", null, "52px"]}
        textAlign="center"
        color={colors.greyColor[0]}
      >
        Expenses
      </Text>
      <SimpleGrid templateColumns={["1fr", null, "1fr 1fr"]}>
        <Center display={["none", null, "flex"]}>
          <Image
            src="/images/intro.png"
            alt="intro"
            w="100%"
            h="100%"
            maxW="700px"
            style={{
              aspectRatio: 1,
              objectFit: "contain",
            }}
          />
        </Center>
        <UserAuthenticationTabs />
      </SimpleGrid>
    </VStack>
  );
};

export default SignIn;
