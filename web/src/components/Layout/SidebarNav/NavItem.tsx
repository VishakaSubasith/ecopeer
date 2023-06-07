import {
  ComponentWithAs,
  Flex,
  FlexProps,
  Icon,
  IconProps,
  Link,
} from "@chakra-ui/react";
import React from "react";

import { ReactText } from "react";
import NextLink from "next/link";
import { IconType } from "react-icons";

interface NavItemProps extends FlexProps {
  icon: ComponentWithAs<"svg", IconProps> | IconType;
  url: string;
  children: ReactText;
}

const NavItem: React.FC<NavItemProps> = ({ icon, url, children, ...rest }) => {
  return (
    <NextLink href={url}>
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: "cyan.400",
          color: "white",
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: "white",
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </NextLink>
  );
};

export default NavItem;
