import {
  useLogoutMutation,
  useMarkNotificationAsReadMutation,
  useMeQuery,
  UserType,
  useUnReadChannelsQuery,
  useUserNotificationsQuery,
} from "../../generated/graphql";
import NextLink from "next/link";
import {
  Button,
  Flex,
  HStack,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
  Spacer,
  Text,
  Box,
  useColorModeValue,
} from "@chakra-ui/react";
import { ChevronDownIcon, SearchIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";
import { DarkModeSwitch } from "../DarkModeSwitch";
import AppLogo from "../Core/AppLogo";
import { FiBell } from "react-icons/fi";

interface AppNavbarProps {}

const AppNavbar: React.FC<AppNavbarProps> = ({}) => {
  const [, logout] = useLogoutMutation();
  const [{ data, fetching }] = useMeQuery();
  const [{ data: dataUnReadChannels }] = useUnReadChannelsQuery({
    requestPolicy: "cache-and-network",
  });
  const [{ data: dataNotifications }, getNotifications] =
    useUserNotificationsQuery({ requestPolicy: "network-only" });

  const [, markNotificationAsRead] = useMarkNotificationAsReadMutation();
  const router = useRouter();
  const listColor = useColorModeValue("gray.50", "gray.700");

  const unReadMessages =
    dataUnReadChannels?.channels.channelsExtraInfo &&
    dataUnReadChannels?.channels.channelsExtraInfo.length > 0
      ? dataUnReadChannels?.channels.channelsExtraInfo.reduce((pVal, nVal) => {
          return {
            unReadCount: pVal.unReadCount + nVal.unReadCount,
          };
        })
      : { unReadCount: 0 };

  // Notifications
  const unReadNotifications = dataNotifications?.userNotifications.filter(
    (notification) => notification.isRead === false
  );

  const readNotifications = dataNotifications?.userNotifications.filter(
    (notification, index) => index < 5 && notification.isRead === true
  );

  // Handlers
  const logoutOnClickHandler = () => {
    logout();
    router.push("/");
  };
  const notificationOnCloseHandler = () => {
    markNotificationAsRead();
    getNotifications();
  };

  let body: {} | null | undefined = null;
  let leftBody: {} | null | undefined = null;

  const getUserLabel = () => {
    if (data?.me?.userType == UserType.Owner) {
      return "発電所オーナー";
    }
    if (data?.me?.userType == UserType.Maintainer) {
      return "業者";
    }
    return "unknown";
    // if (data?.me?.userType == UserType.OwnerMaintainer) {
    //   return "Power Plant Owner and Maintainer";
    // }
  };
  const userLabel = getUserLabel();

  if (fetching) {
  } else if (!data?.me) {
    body = (
      <>
        <NextLink passHref href="/login">
          <Button variant={"ghost"}>ログイン</Button>
        </NextLink>
        <NextLink passHref href="/register">
          <Button variant={"ghost"}>新規登録</Button>
        </NextLink>
      </>
    );
  } else if (data?.me.userType === UserType.PendingProfile) {
    body = (
      <NextLink passHref href="/user/profile/create">
        <Button variant={"ghost"}>プロフィール作成</Button>
      </NextLink>
    );
  } else {
    leftBody = (
      <>
        <NextLink passHref href="/">
          <Button variant={"ghost"} textColor={"black"} rounded={"3xl"}>
            <SearchIcon />
            <Text>仲間を探す</Text>
          </Button>
        </NextLink>
        <NextLink passHref href="/job">
          <Button variant={"ghost"} textColor={"black"}>
            <SearchIcon />
            <Text> 仕事を依頼する</Text>
          </Button>
        </NextLink>
        <NextLink passHref href="/">
          <Button variant={"ghost"} textColor={"black"}>
            <SearchIcon />
            <Text>イベントを探す</Text>
          </Button>
        </NextLink>
        <NextLink passHref href="/">
          <Button variant={"ghost"} textColor={"black"}>
            <SearchIcon />
            <Text>知恵を探す</Text>
          </Button>
        </NextLink>
      </>
    );
    body = (
      <Flex justifyContent={"center"} alignItems={"center"}>
        <Menu placement="bottom" onClose={notificationOnCloseHandler}>
          <MenuButton
            as={Button}
            aria-label="Options"
            mx={2}
            size="lg"
            rightIcon={<FiBell />}
            variant="ghost"
            position={"relative"}
          >
            {unReadNotifications?.length ? (
              <Text
                as={"span"}
                p={1}
                px={2}
                bgColor={"#B50A0A"}
                fontSize={"sm"}
                textColor={"white"}
                borderRadius={"50%"}
                position={"absolute"}
                top={0}
                left={2}
              >
                {unReadNotifications?.length}
              </Text>
            ) : null}
          </MenuButton>
          <MenuList bgColor={listColor}>
            {readNotifications?.length === 0 &&
              unReadNotifications?.length === 0 && (
                <MenuItem minH="48px">
                  <span>新しい通知はありません</span>
                </MenuItem>
              )}
            {/* <MenuDivider /> */}

            {unReadNotifications && unReadNotifications.length > 0 && (
              <MenuGroup title={"未読"}>
                {unReadNotifications?.map((notification) => (
                  <MenuItem
                    bgColor={"white"}
                    disabled
                    my={2}
                    key={notification.id}
                    maxWidth={"400px"}
                    minH="48px"
                    _hover={{ backgroundColor: "white" }}
                    _focus={{ backgroundColor: "white" }}
                  >
                    <span>{notification.content}</span>
                  </MenuItem>
                ))}
              </MenuGroup>
            )}

            <MenuDivider />

            {readNotifications && (
              <MenuGroup title={"既読"}>
                {readNotifications?.map((notification) => (
                  <MenuItem
                    disabled
                    my={2}
                    key={notification.id}
                    maxWidth={"400px"}
                    minH="48px"
                  >
                    <span>{notification.content}</span>
                  </MenuItem>
                ))}
              </MenuGroup>
            )}
          </MenuList>
        </Menu>
        <Menu>
          <MenuButton
            as={Button}
            rightIcon={<ChevronDownIcon />}
            rounded={"3xl"}
            position={"relative"}
          >
            {data.me.email}

            {unReadMessages?.unReadCount && unReadMessages?.unReadCount > 0 ? (
              <Text
                as={"span"}
                p={1}
                px={2}
                bgColor={"#B50A0A"}
                fontSize={"sm"}
                textColor={"white"}
                borderRadius={"50%"}
                position={"absolute"}
                top={-1}
                left={-2}
              >
                {unReadMessages?.unReadCount}
              </Text>
            ) : null}
          </MenuButton>
          <MenuList>
            <MenuGroup title={userLabel}>
              <NextLink passHref href={"/user/profile"}>
                <MenuItem>Myページ</MenuItem>
              </NextLink>
              <NextLink passHref href="/chat">
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
              {data.me.userType === UserType.Maintainer && (
                <>
                  <NextLink passHref href="/user/maintainer/job">
                    <MenuItem>Myビジネス</MenuItem>
                  </NextLink>
                  <NextLink passHref href="#">
                    <MenuItem>セミナーを開催する</MenuItem>
                  </NextLink>
                </>
              )}
              {data.me.userType === UserType.Owner && (
                <>
                  <NextLink passHref href="/approvedJobs">
                    <MenuItem>Myビジネス</MenuItem>
                  </NextLink>
                  <NextLink passHref href="/user/owner/job">
                    <MenuItem>My仕事</MenuItem>
                  </NextLink>
                  <MenuItem>My仲間</MenuItem>
                  <NextLink passHref href="/user/owner/powerplant">
                    <MenuItem>My発電所</MenuItem>
                  </NextLink>
                  <NextLink passHref href={"/user/owner/job/payment"}>
                    <MenuItem>Myペイ</MenuItem>
                  </NextLink>
                  <MenuItem>オフ会</MenuItem>
                  <MenuItem>My知恵</MenuItem>
                </>
              )}
            </MenuGroup>
            <MenuDivider />
            <MenuGroup title="セッション">
              <MenuItem onClick={logoutOnClickHandler}>ログアウト</MenuItem>
            </MenuGroup>
          </MenuList>
        </Menu>
      </Flex>
    );
  }

  return (
    <Flex
      borderBottom={"1px"}
      borderColor={"gray.200"}
      shadow={"md"}
      px={10}
      py={2}
      rounded={"md"}
      alignItems={"center"}
      h={"48px"}
      // mb={5}
    >
      <HStack>
        <NextLink passHref href="/">
          <HStack>
            <NextLink passHref href="/">
              <Box height={30} width={100} cursor={"pointer"}>
                <AppLogo />
              </Box>
            </NextLink>
            <NextLink passHref href={"/info"}>
              <Button variant={"ghost"} textColor={"black"}>
                ECOPEERとは
              </Button>
            </NextLink>
          </HStack>
        </NextLink>
        {leftBody}
      </HStack>
      <Spacer />
      <DarkModeSwitch />
      <HStack ml={5} spacing={4}>
        {body}
      </HStack>
    </Flex>
  );
};

export default AppNavbar;
