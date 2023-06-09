// import { BellIcon } from "@chakra-ui/icons";
// import {
//   Avatar,
//   Box,
//   Collapse,
//   Drawer,
//   DrawerContent,
//   DrawerOverlay,
//   Flex,
//   Icon,
//   IconButton,
//   Input,
//   InputGroup,
//   InputLeftElement,
//   Text,
//   useColorModeValue,
//   useDisclosure,
// } from "@chakra-ui/react";
// import React from "react";

// const AppSidebar = ({children}: any) => {
//   const sidebar = useDisclosure();
//   const integrations = useDisclosure();

//   const NavItem = (props: any) => {
//     const { icon, children, ...rest } = props;
//     return (
//       <Flex
//         align="center"
//         px="4"
//         pl="4"
//         py="3"
//         cursor="pointer"
//         color={useColorModeValue("inherit", "gray.400")}
//         _hover={{
//           bg: useColorModeValue("gray.100", "gray.900"),
//           color: useColorModeValue("gray.900", "gray.200"),
//         }}
//         role="group"
//         fontWeight="semibold"
//         transition=".15s ease"
//         {...rest}
//       >
//         {icon && (
//           <Icon
//             mx="2"
//             boxSize="4"
//             _groupHover={{
//               color: useColorModeValue("gray.600", "gray.300"),
//             }}
//             as={icon}
//           />
//         )}
//         {children}
//       </Flex>
//     );
//   };

//   const SidebarContent = (props: any) => (
//     <Box
//       as="nav"
//       pos="fixed"
//       top="0"
//       left="0"
//       zIndex="sticky"
//       h="full"
//       pb="10"
//       overflowX="hidden"
//       overflowY="auto"
//       bg={useColorModeValue("white", "gray.800")}
//       borderColor={useColorModeValue("inherit", "gray.700")}
//       borderRightWidth="1px"
//       w="60"
//       {...props}
//     >
//       <Flex px="4" py="5" align="center">
//         <BellIcon />
//         <Text
//           fontSize="2xl"
//           ml="2"
//           color={useColorModeValue("brand.500", "white")}
//           fontWeight="semibold"
//         >
//           Choc UI
//         </Text>
//       </Flex>
//       <Flex
//         direction="column"
//         as="nav"
//         fontSize="sm"
//         color="gray.600"
//         aria-label="Main Navigation"
//       >
//         <NavItem icon={BellIcon}>Home</NavItem>
//         <NavItem icon={BellIcon}>Articles</NavItem>
//         <NavItem icon={BellIcon}>Collections</NavItem>
//         <NavItem icon={BellIcon}>Checklists</NavItem>
//         <NavItem icon={BellIcon} onClick={integrations.onToggle}>
//         </NavItem>
//         <Collapse in={integrations.isOpen}>
//           <NavItem pl="12" py="2">
//             Shopify
//           </NavItem>
//           <NavItem pl="12" py="2">
//             Slack
//           </NavItem>
//           <NavItem pl="12" py="2">
//             Zapier
//           </NavItem>
//         </Collapse>
//         <NavItem icon={BellIcon}>Changelog</NavItem>
//         <NavItem icon={BellIcon}>Settings</NavItem>
//       </Flex>
//     </Box>
//   );
//   return (
//     <Box
//       as="section"
//       bg={useColorModeValue("gray.50", "gray.700")}
//       minH="100vh"
//     >
//       <SidebarContent display={{ base: "none", md: "unset" }} />
//       <Drawer
//         isOpen={sidebar.isOpen}
//         onClose={sidebar.onClose}
//         placement="left"
//         size={"full"}
//       >
//         <DrawerOverlay />
//         <DrawerContent>
//           <SidebarContent w="full" borderRight="none" />
//         </DrawerContent>
//       </Drawer>
//       <Box ml={{ base: 0, md: 60 }} transition=".3s ease">
//         <Flex
//           as="header"
//           align="center"
//           justify="space-between"
//           w="full"
//           px="4"
//           bg={useColorModeValue("white", "gray.800")}
//           borderBottomWidth="1px"
//           borderColor={useColorModeValue("inherit", "gray.700")}
//           h="14"
//         >
//           <IconButton
//             aria-label="Menu"
//             display={{ base: "inline-flex", md: "none" }}
//             onClick={sidebar.onOpen}
//             icon={<BellIcon />}
//             size="sm"
//           />
//           <InputGroup w="96" display={{ base: "none", md: "flex" }}>
//             <InputLeftElement color="gray.500" children={<BellIcon />} />
//             <Input placeholder="Search for articles..." />
//           </InputGroup>

//           <Flex align="center">
//             <Icon color="gray.500" as={BellIcon} cursor="pointer" />
//             <Avatar
//               ml="4"
//               size="sm"
//               name="anubra266"
//               src="https://avatars.githubusercontent.com/u/30869823?v=4"
//               cursor="pointer"
//             />
//           </Flex>
//         </Flex>

//         <Box as="main" p="4">
//           {children}
//         </Box>
//       </Box>
//     </Box>
//   );
// };

// export default AppSidebar;

import React from 'react'

interface AppSidebar2Props {

}

const AppSidebar2: React.FC<AppSidebar2Props> = ({}) => {
    return (<p>Test</p>);
}

export default AppSidebar2;