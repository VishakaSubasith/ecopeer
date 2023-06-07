import {
  Box,
  BoxProps,
  CloseButton,
  ComponentWithAs,
  Flex,
  IconProps,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import NavItem from "./NavItem";
import React from "react";
import { SidebarLinkItem } from "../../../utils/types";

interface SidebarContentProps extends BoxProps {
  onClose: () => void;
  linkItems: SidebarLinkItem[];
}

const SidebarContent: React.FC<SidebarContentProps> = ({
  onClose,
  linkItems,
  ...rest
}) => {
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: '70' }}
      // pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
        Myダッシュボード
        </Text>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {linkItems.map((link) => (
        <NavItem key={link.name} icon={link.icon} url={link.url}>
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};

export default SidebarContent;
