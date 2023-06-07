import { Box, Center, Flex, Text } from "@chakra-ui/react";
import React from "react";
import MainLayout from "../../components/Layout/MainLayout";

interface ComingSoonProps {}

const ComingSoon: React.FC<ComingSoonProps> = ({}) => {
  return (
    <MainLayout showSidebar >
    <Flex h={"200px"} alignItems={"center"} justifyContent={"center"} >
        <Text fontWeight={"bold"} fontSize={"3xl"} >Coming soon.....</Text>
    </Flex>

    </MainLayout>
  );
};

export default ComingSoon;
