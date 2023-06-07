import React from "react";
import { Box, Flex } from "@chakra-ui/layout";
import { Stack, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import AppLogo from "../Core/AppLogo";
import SpeechBubble from "../Core/SpeechBubble";

interface IndexBannerProps {}

const IndexBanner: React.FC<IndexBannerProps> = ({}) => {
  return (
    <Stack
      direction={["column", "row"]}
      spacing={[4, 10]}
      alignItems={"center"}
      justifyContent={"space-around"}
    >
      <NextLink href="/">
        <Box cursor={"pointer"}>
          <AppLogo height={80} width={300} />
        </Box>
      </NextLink>
      <Flex fontSize={"xl"} direction={"column"} alignItems={"center"}>
        <Text textColor={"ecoGray"}>
          発電所を
          <Text as={"span"} color={"ecoOrange"}>
            作る
          </Text>
          ・
          <Text as={"span"} color={"ecoBlue"}>
            守る
          </Text>
          に関わる
          {/* にお仕事依頼！ */}
        </Text>
        <Text textColor={"ecoGray"}>
          公募型お仕事マッチングサイト
          {/* <Text as={"span"} color={"orange.400"}>
            最適管理！
          </Text> */}
        </Text>
      </Flex>
      <Box position={"relative"}>
        <Box position={"absolute"} top={"-45px"} right={"0px"}>
          <SpeechBubble text="未稼働もOK!" />
        </Box>
        <NextLink href="/register" passHref>
          <Box
            textAlign={"center"}
            fontSize={"md"}
            bgColor={"ecoOrange"}
            rounded={"lg"}
            py={2}
            px={5}
            mr={4}
            cursor={"pointer"}
          >
            <Text> 発電所オーナー登録は</Text>
            <Text>コチラ（登録無料）</Text>
          </Box>
        </NextLink>
      </Box>

      {/* <Text color={"orange.500"}>業者登録はコチラ！（有料）</Text> */}
      <NextLink href="/register" passHref>
        <Box
          bgColor={"ecoBlue"}
          rounded={"lg"}
          py={2}
          px={5}
          textAlign={"center"}
          cursor={"pointer"}
        >
          <Text> 業者登録は</Text>
          <Text>コチラ（登録無料）</Text>
        </Box>
      </NextLink>
      {/* <Flex direction={["row", "column"]} p={[2, 0]}>
        <NextLink href="/register">
          <Button variant={"ghost"}>ゲストさん</Button>
        </NextLink>
        <NextLink href="/login">
          <Button
            bgColor={"teal.400"}
            textColor={"white"}
            rounded={"md"}
            _hover={{ bgColor: "teal.600" }}
          >
            ログイン
          </Button>
        </NextLink>
      </Flex> */}
    </Stack>
  );
};

export default IndexBanner;
