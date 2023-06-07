import { BellIcon, ChevronDownIcon } from "@chakra-ui/icons";
import {
  Flex,
  FlexProps,
  IconButton,
  StatUpArrow,
  useColorModeValue,
  Text,
  HStack,
  Menu,
  MenuButton,
  Avatar,
  VStack,
  MenuList,
  Box,
  MenuItem,
  MenuDivider,
  MenuGroup,
  Spacer,
  Tooltip,
  Button,
} from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";
import { DarkModeSwitch } from "../../DarkModeSwitch";
import { AiFillHome } from "react-icons/ai";
import AppLogo from "../../Core/AppLogo";
import { UserType, useUnReadChannelsQuery } from "../../../generated/graphql";
import { FiBell } from "react-icons/fi";
import NotificationsDropDown from "../NotificationsDropDown";

interface MobileNavProps extends FlexProps {
  onOpen: () => void;
  userLabel: string;
  userType: UserType | undefined;
  email: string | undefined;
  logoutHandler: () => void;
  showSidebar: boolean;
}

const MobileNav: React.FC<MobileNavProps> = ({
  onOpen,
  userLabel,
  userType,
  email,
  logoutHandler,
  showSidebar,
  ...rest
}) => {
  const [{ data: dataUnReadChannels }] = useUnReadChannelsQuery({
    requestPolicy: "cache-and-network",
  });

  const unReadMessages =
    dataUnReadChannels?.channels.channelsExtraInfo &&
    dataUnReadChannels?.channels.channelsExtraInfo.length > 0
      ? dataUnReadChannels?.channels.channelsExtraInfo.reduce((pVal, nVal) => {
          return {
            unReadCount: pVal.unReadCount + nVal.unReadCount,
          };
        })
      : { unReadCount: 0 };

  const bgColor = useColorModeValue("white", "gray.900");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  let rightBody;
  if (!userType) {
    rightBody = (
      <>
        <NextLink href="/login" passHref>
          <Button variant={"ghost"}>ログイン</Button>
        </NextLink>
        <NextLink href="/register" passHref>
          <Button variant={"ghost"}>新規登録</Button>
        </NextLink>
      </>
    );
  } else if (userType === UserType.PendingProfile) {
    rightBody = (
      <NextLink href="/user/profile/create">
        <Button variant={"ghost"}>プロフィール作成</Button>
      </NextLink>
    );
  } else {
    rightBody = (
      <>
        <NextLink href={"/user/dashboard"} passHref>
          <Box>
            <Tooltip
              hasArrow
              label="Myダッシュボード"
              size={"lg"}
              rounded={"md"}
              p={2}
            >
              <IconButton
                icon={<AiFillHome />}
                colorScheme={"gray"}
                size={"md"}
                aria-label="Home"
              />
            </Tooltip>
          </Box>
        </NextLink>
        {/* <Tooltip hasArrow label="通知" size={"lg"} rounded={"md"} p={2}> */}
        <NotificationsDropDown />
        {/* </Tooltip> */}

        <Flex alignItems={"center"}>
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: "none" }}
            >
              <HStack>
                <Avatar size={"sm"} src={""} name={email} />
                <VStack
                  display={{ base: "none", md: "flex" }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2"
                >
                  <Text fontSize="sm">{email}</Text>
                  <Text fontSize="xs" color="gray.600">
                    {userLabel}
                  </Text>
                </VStack>
                {unReadMessages?.unReadCount &&
                unReadMessages?.unReadCount > 0 ? (
                  <Text
                    as={"span"}
                    py={1}
                    px={2}
                    bgColor={"#B50A0A"}
                    fontSize={"sm"}
                    textColor={"white"}
                    borderRadius={"50%"}
                  >
                    {unReadMessages?.unReadCount}
                  </Text>
                ) : null}
                <Box display={{ base: "none", md: "flex" }}>
                  <ChevronDownIcon />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList bg={bgColor} borderColor={borderColor}>
              <MenuGroup title={userLabel}>
                <NextLink href={"/user/profile"} passHref>
                  <MenuItem>Myページ</MenuItem>
                </NextLink>
                <NextLink href="/chat" passHref>
                  <MenuItem>
                    Myチャット
                    {unReadMessages?.unReadCount &&
                    unReadMessages?.unReadCount > 0 ? (
                      <Text
                        as={"span"}
                        p={1}
                        px={3}
                        bgColor={"#B50A0A"}
                        fontSize={"sm"}
                        textColor={"white"}
                        borderRadius={"50%"}
                      >
                        {unReadMessages?.unReadCount}
                      </Text>
                    ) : null}
                  </MenuItem>
                </NextLink>
                <NextLink href={"/user/dashboard"} passHref>
                  <MenuItem>Myダッシュボード</MenuItem>
                </NextLink>
                <MenuDivider />
                <MenuGroup title="セッション">
                  <MenuItem onClick={logoutHandler}>ログアウト</MenuItem>
                </MenuGroup>
              </MenuGroup>
            </MenuList>
          </Menu>
        </Flex>
      </>
    );
  }
  return (
    <Flex
      ml={{ base: 0, md: 0 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={bgColor}
      borderBottomWidth="1px"
      borderBottomColor={borderColor}
      justifyContent={{ base: "space-between", md: "unset" }}
      {...rest}
    >
      {showSidebar && (
        <IconButton
          display={{ base: "flex", md: "none" }}
          onClick={onOpen}
          variant="outline"
          aria-label="open menu"
          icon={<StatUpArrow />}
        />
      )}
      <NextLink href="/">
        <Box height={30} width={100} cursor={"pointer"}>
          <AppLogo />
        </Box>
      </NextLink>
      <Spacer display={{ base: "none", md: "flex" }} />

      <HStack spacing={{ base: "0", md: "6" }}>
        <NextLink href={"/qa"} passHref>
          <Button
            display={{ base: "none", md: "flex" }}
            variant={"ghost"}
            textColor={"black"}
          >
            {"Q&A"}
          </Button>
        </NextLink>
        <NextLink href={"/info"} passHref>
          <Button
            // display={{ base: "none", md: "flex" }}
            variant={"ghost"}
            textColor={"black"}
          >
            ECOPEERとは
          </Button>
        </NextLink>

        {/* <DarkModeSwitch /> */}
        {rightBody}
      </HStack>
    </Flex>
  );
};

export default MobileNav;
