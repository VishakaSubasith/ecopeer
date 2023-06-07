import { CheckCircleIcon } from "@chakra-ui/icons";
import { Spinner, Text, Center, Box, Heading, Button } from "@chakra-ui/react";
import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import FailedResult from "../../components/Core/Result/FailedResult";
import { UserType, useVerifyEmailMutation } from "../../generated/graphql";
import { toErrorMap } from "../../utils/toErrorMap";
import NextLink from "next/link";

const VerifyEmail: NextPage<{ token: string }> = ({ token }) => {
  const [{ fetching, data }, verifyEmail] = useVerifyEmailMutation();

  useEffect(() => {
    verifyEmail({ input: { token } });
  }, [token]);

  return (
    <Box maxW={["xs", "6xl"]} minWidth={["xs", "6xl"]} mx={"auto"} flex={"1"}>
      <Center>
        <Box
          textAlign="center"
          shadow={"lg"}
          px={[10, 30]}
          py={[5, 10]}
          mt={[8, 20]}
          rounded={"lg"}
          minWidth={["xs", "xl"]}
          borderColor={"gray.300"}
          borderWidth={"1px"}
        >
          {fetching && <Spinner size={"xl"} />}
          {!fetching &&
            !data?.verifyEmail.errors
            //   &&
            // data?.verifyEmail.user?.userType === UserType.PendingProfile
              && (
              <>
                <CheckCircleIcon boxSize={"50px"} color={"green.500"} />
                <Heading as="h2" size="xl" mt={6} mb={2}>
                  認証完了しました。
                </Heading>
                <Text color={"gray.500"}>必要に応じMyページを編集してください。</Text>
                {/*<NextLink href={"/user/profile/create"}>*/}
                {/*  <Button>プロフィールを作成する</Button>*/}
                {/*</NextLink>*/}
              </>
            )}
          {!fetching && data?.verifyEmail.errors && (
            <FailedResult
              heading="認証に失敗しました"
              message={"再度、新規登録をしてください"}
            />
          )}
        </Box>
      </Center>
    </Box>
  );
};

VerifyEmail.getInitialProps = ({ query }) => {
  return {
    token: query.token as string,
  };
};

export default VerifyEmail;
