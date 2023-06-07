import {Button} from "@chakra-ui/button";
import {Box, Center, Flex, Link} from "@chakra-ui/layout";
import {Form, Formik} from "formik";
import {useRouter} from "next/dist/client/router";
import InputField from "../components/Core/InputField";
import MainLayout from "../components/Layout/MainLayout";
import {useLoginMutation, UserType} from "../generated/graphql";
import {toErrorMap} from "../utils/toErrorMap";
import NextLink from "next/link";
import {useToast} from "@chakra-ui/react";

const Login: React.FC<{}> = ({}) => {
  const router = useRouter();
  const [, login] = useLoginMutation();
    const toast = useToast();
  return (
    <MainLayout>
      <Center>
        <Box
          shadow={"lg"}
          px={[10, 30]}
          py={[5, 10]}
          mt={[8, 20]}
          rounded={"lg"}
          minWidth={["xs", "xl"]}
        >
          <Formik
            initialValues={{ email: "", password: "" }}
            onSubmit={async (values, { setErrors }) => {
              const response = await login(values);
                console.log("response===",response)
              if (response.data?.login.errors) {
                  if (response.data?.login.errors[0].field == "unverified")
                      toast({
                          title: "ログインできません",
                          description: "認証メールを確認してください。エラーが続く場合は、お手数ですが、お問合せ画面よりご連絡ください。",
                          position: "top-right",
                          status: "error",
                          duration: 9000,
                          isClosable: true,
                      });
                  else {
                      toast({
                          title: "無効なプロファイル",
                          description: "パスワードが間違っています.",
                          position: "top-right",
                          status: "error",
                          duration: 9000,
                          isClosable: true,
                      });
                      setErrors(toErrorMap(response.data.login.errors));
                  }
              } else if (response.data?.login.user) {
                const user = response.data?.login.user;
                if (user.userType === UserType.Admin) {
                  router.push("/admin/dashboard");
                }
                else if (user.hasverified === false ) {
                    toast({
                        title: "ログインできません",
                        description: "認証メールを確認してください。エラーが続く場合は、お手数ですが、お問合せ画面よりご連絡ください。",
                        position: "top-right",
                        status: "error",
                        duration: 9000,
                        isClosable: true,
                    });
                } else {
                  router.push("/");
                }
              }
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <InputField name="email" placeholder="メールアドレス" label="メールアドレス" />
                <InputField
                  name="password"
                  placeholder="パスワード"
                  label="パスワード"
                  type="password"
                />
                <Flex mt={2}>
                  <NextLink href={"/forgot-password"} passHref >
                    <Link ml={"auto"} fontSize={"xs"} textColor={"gray.700"}>
                      パスワードをお忘れの方はこちらから
                    </Link>
                  </NextLink>
                </Flex>
                <Button
                  type="submit"
                  rounded={"lg"}
                  px={6}
                  py={3}
                  isLoading={isSubmitting}
                >
                  ログイン
                </Button>
              </Form>
            )}
          </Formik>
        </Box>
      </Center>
    </MainLayout>
  );
};

export default Login;
