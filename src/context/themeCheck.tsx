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
    const themeChangeListener = (event: any) => {
      if (event.matches) {
        setCurrentTheme(ThemeEnum.dark);
        setIsDarkTheme(true);
      } else {
        setCurrentTheme(ThemeEnum.light);
        setIsDarkTheme(false);
      }
    };

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    mediaQuery.addEventListener("change", themeChangeListener);

    return () => {
      mediaQuery.removeEventListener("change", themeChangeListener);
    };
  }, []);

  useEffect(() => {
    if (currentTheme === ThemeEnum.light) {
    }
  }, [currentTheme]);

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
