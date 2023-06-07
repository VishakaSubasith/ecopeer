import NextLink from "next/link";
import { Box, Button, Flex, VStack, Spacer, Text } from "@chakra-ui/react";
import { useLogoutMutation } from "../../generated/graphql";
import { useRouter } from "next/router";

interface AdminLayoutProps {}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const [, logout] = useLogoutMutation();
  const router = useRouter();

  const logoutOnClickHandler = () => {
    logout();
    router.push("/");
  };

  return (
    <Flex h={"100vh"}>
      <Box flex={"2"} py={4} px={2} borderRight={"1px solid gray"}>
        <VStack h={"100%"}>
          <Text textAlign={"center"} fontSize={"2xl"} mb={2}>
            Pages
          </Text>
          <NextLink passHref href={"/admin/dashboard"}>
            <Button rounded={"md"} w={"100%"}>
              仕事一覧
            </Button>
          </NextLink>
          <NextLink passHref href={"/admin/transactions"}>
            <Button rounded={"md"} w={"100%"}>
              前払
            </Button>
          </NextLink>
          <NextLink passHref href={"/admin/users"}>
            <Button rounded={"md"} w={"100%"}>
              ユーザー
            </Button>
          </NextLink>
          <NextLink passHref href={"/admin/withdrawalUsers"}>
            <Button rounded={"md"} w={"100%"}>
            削除希望アカウント
            </Button>
          </NextLink>
          <Spacer />
          <Button w={"100%"} onClick={logoutOnClickHandler}>
            ログアウト
          </Button>
        </VStack>
      </Box>
      <Box flex={"12"} p={5}>
        {children}
      </Box>
    </Flex>
  );
};

export default AdminLayout;
