import { SunIcon, MoonIcon } from "@chakra-ui/icons";
import {
  useColorMode,
  Switch,
  HStack,
} from "@chakra-ui/react";

export const DarkModeSwitch = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const isDark = colorMode === "dark";
  return (
    <HStack>
      <SunIcon boxSize={6} />
      <Switch colorScheme={"orange"} isChecked={isDark} onChange={toggleColorMode} />
      <MoonIcon boxSize={6} />
    </HStack>
  );
};
