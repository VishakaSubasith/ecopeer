import { Button } from "@chakra-ui/button";
import { Center, Box } from "@chakra-ui/layout";
import { Formik, Form } from "formik";
import { NextPage } from "next";
import router from "next/router";
import React, { useState } from "react";
import InputField from "../../components/Core/InputField";
import { useResetPasswordMutation, UserType } from "../../generated/graphql";
import { toErrorMap } from "../../utils/toErrorMap";
import NextLink from "next/link";
import {Link, useToast} from "@chakra-ui/react";

const ResetPassword: NextPage<{ token: string }> = ({ token }) => {
  const [, resetPassword] = useResetPasswordMutation();
  const [tokenErrors, setTokenErrors] = useState("");
  const toast = useToast();
  return (
    <Box maxW={["xs", "6xl"]} minWidth={["xs", "6xl"]} mx={"auto"} flex={"1"}>
      <Center>
        <Box
          shadow={"lg"}
          px={[10, 30]}
          py={[5, 10]}
          mt={[8, 20]}
          rounded={"lg"}
          minWidth={["xs", "xl"]}
          borderColor={"gray.300"}
          borderWidth={"1px"}
        >
          <Formik
            initialValues={{ newPassword: "" , confirmPassword:""}}
            onSubmit={async (values, { setErrors }) => {

              if (values.newPassword === values.confirmPassword) {

              const response = await resetPassword({
                input: {newPassword: values.newPassword, token},
              });


                if (response.data?.resetPassword.errors) {
                  const errors = toErrorMap(response.data.resetPassword.errors);
                  if ("token" in errors) {
                    setTokenErrors(errors.token);
                  }
                  setErrors(errors);
                } else if (response.data?.resetPassword.user) {
                  const user = response.data?.resetPassword.user;
                  if (
                      user.userType === UserType.Unverified ||
                      user.userType === UserType.PendingProfile
                  ) {
                    router.push("/post-registration");
                  } else if (user.userType === UserType.Admin) {
                    router.push("/admin/dashboard");
                  } else {
                    router.push("/");
                  }
                }
            }else{
                toast({
                  title: "パスワードを再設定する",
                  description: "パスワードが一致しません",
                  position: "top-right",
                  status: "error",
                  duration: 9000,
                  isClosable: true,
                });
              }

            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <InputField
                  name="newPassword"
                  placeholder="新しいパスワード"
                  label="新しいパスワード"
                  type="password"
                />
                <InputField
                  name="confirmPassword"
                  placeholder="新しいパスワード"
                  label="新しいパスワード"
                  type="password"
                />
                {tokenErrors ? (
                  <Box my={4}>
                    <Box textColor={"red"}>{tokenErrors}</Box>
                    <NextLink href="/forgot-password">
                      <Link>Click here to generate a new token</Link>
                    </NextLink>
                  </Box>
                ) : null}
                <Button
                  type="submit"
                  rounded={"lg"}
                  px={6}
                  py={3}
                  isLoading={isSubmitting}
                >
                  パスワードを再設定する
                </Button>
              </Form>
            )}
          </Formik>
        </Box>
      </Center>
    </Box>
  );
};

ResetPassword.getInitialProps = ({ query }) => {
  return {
    token: query.token as string,
  };
};

export default ResetPassword;
