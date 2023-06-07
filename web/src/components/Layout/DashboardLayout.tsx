import { Box } from "@chakra-ui/layout";
import { Flex } from "@chakra-ui/react";
import React from "react";
import AppFooter from "./AppFooter";
import AppNavbar from "./AppNavbar";
import Head from "next/head";
import AppSidebar from "./AppSidebar";

interface DashboardLayoutProps {}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <Flex direction={"column"} minHeight={"100vh"}>
      <Head>
        <link rel="shortcut icon" href="/images/logo.svg" />
      </Head>
      <AppSidebar>
        {/* <AppNavbar /> */}
        <Box
          maxW={["xs", "6xl"]}
          minWidth={{ base: "xs", "2xl": "6xl" }}
          mx={"auto"}
          flex={"1"}
        >
          {children}
        </Box>
      </AppSidebar>
      <AppFooter />
    </Flex>
  );
};

export default DashboardLayout;
