import React, { ReactNode } from 'react'
import {
    Box,
    useColorModeValue,
    Drawer,
    DrawerContent,
    useDisclosure,
  } from '@chakra-ui/react';
import SidebarContent from './SidebarNav/SidebarContent';
import MobileNav from './SidebarNav/MobileNav';


interface AppSidebarProps {
    children: ReactNode;
}

const AppSidebar: React.FC<AppSidebarProps> = ({children}) => {

    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
          {/* <SidebarContent
            onClose={() => onClose}
            display={{ base: 'none', md: 'block' }}
          />
          <Drawer
            autoFocus={false}
            isOpen={isOpen}
            placement="left"
            onClose={onClose}
            returnFocusOnClose={false}
            onOverlayClick={onClose}
            size="full">
            <DrawerContent>
              <SidebarContent onClose={onClose} />
            </DrawerContent>
          </Drawer>
          <MobileNav onOpen={onOpen} />
          <Box ml={{ base: 0, md: 60 }} p="4" >
            {children}
          </Box> */}
        </Box>
      );
}

export default AppSidebar;