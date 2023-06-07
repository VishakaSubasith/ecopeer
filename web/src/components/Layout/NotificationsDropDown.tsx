import {
  Menu,
  MenuButton,
  Button,
  MenuList,
  MenuItem,
  MenuGroup,
  MenuDivider,
  Text,
  useColorModeValue,
  IconButton,
  Box,
} from "@chakra-ui/react";
import React from "react";
import { FiBell } from "react-icons/fi";
import {
  useMarkNotificationAsReadMutation,
  useUserNotificationsQuery,
} from "../../generated/graphql";

interface NotificationsDropDownProps {}

const NotificationsDropDown: React.FC<NotificationsDropDownProps> = ({}) => {
  const [{ data: dataNotifications }, getNotifications] =
    useUserNotificationsQuery({ requestPolicy: "network-only" });

  const [, markNotificationAsRead] = useMarkNotificationAsReadMutation();
  const listColor = useColorModeValue("gray.50", "gray.700");

  // Notifications
  const unReadNotifications = dataNotifications?.userNotifications.filter(
    (notification) => notification.isRead === false
  );

  const readNotifications = dataNotifications?.userNotifications.filter(
    (notification, index) => index < 5 && notification.isRead === true
  );

  // Handlers
  const notificationOnCloseHandler = () => {
    getNotifications();
  };

  const notificationOnClickHandler = (notificationId: number) => {
    markNotificationAsRead({ input: { notificationId } });
    getNotifications();
  };

  return (
    <Menu placement="bottom" onClose={notificationOnCloseHandler}>
      <Box position={"relative"}>
        <MenuButton
          as={IconButton}
          colorScheme={"gray"}
          aria-label="Options"
          mx={2}
          icon={<FiBell />}
          // variant="ghost"
          //   position={"absolute"}
        />

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
      </Box>

      <MenuList bgColor={listColor}>
        {readNotifications?.length === 0 && unReadNotifications?.length === 0 && (
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
                onClick={() => notificationOnClickHandler(notification.id)}
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
  );
};

export default NotificationsDropDown;
