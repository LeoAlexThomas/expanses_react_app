import { createContext, useContext, useEffect, useState } from "react";
import { ThemeEnum } from "@/types/common";

interface ContextInterface {
  currentTheme: ThemeEnum;
  isDarkTheme: boolean;
}

const ThemeCheckContext = createContext<ContextInterface>({
  currentTheme: ThemeEnum.light,
  isDarkTheme: false,
});

export const ThemeCheckProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [currentTheme, setCurrentTheme] = useState<ThemeEnum>(ThemeEnum.light);
  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    if (mediaQuery.matches) {
      setCurrentTheme(ThemeEnum.dark);
      setIsDarkTheme(true);
    } else {
      setCurrentTheme(ThemeEnum.light);
      setIsDarkTheme(false);
    }
  }, []);

  return (
    <ThemeCheckContext.Provider
      value={{
        isDarkTheme,
        currentTheme,
      }}
    >
      {children}
    </ThemeCheckContext.Provider>
  );
};

export const useThemeCheck = () => useContext(ThemeCheckContext);
