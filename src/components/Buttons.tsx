import { Button, ButtonProps } from "@/components/ui/button";
import { useThemeCheck } from "@/context/themeCheck";
import { colors } from "./utils";

const PrimaryButton = (props: ButtonProps) => {
  const { isDarkTheme } = useThemeCheck();
  return (
    <Button
      backgroundColor={isDarkTheme ? colors.blueColor[2] : colors.blueColor[3]}
      color="white"
      borderRadius="12px"
      _hover={{
        bgColor: isDarkTheme ? colors.blueColor[1] : colors.blueColor[2],
      }}
      px={4}
      {...props}
    />
  );
};

const SecondaryButton = (props: ButtonProps) => {
  const { isDarkTheme } = useThemeCheck();
  return (
    <Button
      variant="outline"
      color={isDarkTheme ? colors.blueColor[0] : colors.blueColor[4]}
      borderRadius="12px"
      border="1px solid"
      borderColor={isDarkTheme ? colors.blueColor[0] : colors.blueColor[4]}
      _hover={{
        bgColor: isDarkTheme ? colors.blueColor[6] : colors.blueColor[0],
        borderColor: colors.blueColor[6],
      }}
      px={4}
      {...props}
    />
  );
};

export { PrimaryButton, SecondaryButton };
