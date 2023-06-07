import { Box, Flex, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import React, {useEffect} from "react";

interface AppFooterProps {}
const AppFooter: React.FC<AppFooterProps> = ({}) => {
  let width = 0;

  useEffect(()=>{
    width = screen.width;
    console.log("width===>>",width)
  },[])

  return (
    <Box textAlign={"center"}  pt={4} pb={2} backgroundColor={"orange.500"}>
      <Flex
        flexDirection={["column", "row"]}
        justifyContent={"center"}
        textColor={"white"}
      >
        <NextLink href="/about/terms">利用規約</NextLink>
        <Text as={"span"} display={["none", "inline"]}>
          ｜
        </Text>
        <NextLink href="/about/how-to-use">使用方法</NextLink>
        <Text as={"span"} display={["none", "inline"]}>
          ｜
        </Text>
        <NextLink href="/about/disclaimer">免責事項</NextLink>
        <Text as={"span"} display={["none", "inline"]}>
          ｜
        </Text>
        <NextLink href="/about/privacy">個人情報保護方針</NextLink>
        <Text as={"span"} display={["none", "inline"]}>
          ｜
        </Text>
        {/* <NextLink href="#">推奨環境</NextLink>
        <Text as={"span"} display={["none", "inline"]}>
          ｜
        </Text> */}
        {/* <NextLink href="#">ECOPEERへのリンクについて</NextLink>
        <Text as={"span"} display={["none", "inline"]}>
          ｜
        </Text> */}
        <NextLink href="/about/contact-us">お問合せ</NextLink>
        <Text as={"span"} display={["none", "inline"]}>
          ｜
        </Text>
        <NextLink href="/about/company-profile">運営会社</NextLink>
      </Flex>
      <Text>Copyright © ECOPEER All Rights Reserved.</Text>
    </Box>
  );
};

export default AppFooter;
