import { Center, Box, Button } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import React, { useState } from "react";
import InputField from "../components/Core/InputField";
import { useForgotPasswordMutation } from "../generated/graphql";

const ForgotPassword: React.FC = ({}) => {
  const [isComplete, setIsComplete] = useState(false);
  const [, forgotPassword] = useForgotPasswordMutation();
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
            initialValues={{ email: "" }}
            onSubmit={async (values) => {
              await forgotPassword(values);
              setIsComplete(true);
            }}
          >
            {({ isSubmitting }) =>
              isComplete ? (
                <Box>ご登録のメールアドレスをご確認の上、パスワードを再設定してください. </Box>
              ) : (
                <Form>
                  <InputField name="email" placeholder="メールアドレス" label="メールアドレス" />
                  <Button
                    type="submit"
                    rounded={"lg"}
                    px={6}
                    py={3}
                    isLoading={isSubmitting}
                  >
                      パスワードをリセットする
                  </Button>
                </Form>
              )
            }
          </Formik>
        </Box>
      </Center>
    </Box>
  );
};

export default ForgotPassword;
