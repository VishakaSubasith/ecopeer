import { Box, Button } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import router from "next/router";
import React from "react";
import InputTextArea from "../../components/Core/Input/InputTextArea";
import InputField from "../../components/Core/InputField";
import MainLayout from "../../components/Layout/MainLayout";
import { useCreateQuestionMutation } from "../../generated/graphql";

interface AskProps {}

const Ask: React.FC<AskProps> = ({}) => {
  const [, createQuestion] = useCreateQuestionMutation();
  return (
    <MainLayout>
      <Box
        border="1px"
        borderColor={"gray.100"}
        shadow={"xl"}
        mt={[8, 20]}
        mb={[8, 20]}
        rounded={"2xl"}
        minWidth={["xs", "2xl"]}
        // maxWidth={{base: "xs", md: "unset"}}
      >
        <Formik
          initialValues={{
            title: "",
            text: "",
          }}
          //   validate={(values) => {
          //     const errors: errorFormFields = {};
          //     if (!values.name) {
          //       errors.name = "発電所の名前を入力してください";
          //     }
          //     if (!values.regionId) {
          //       errors.regionId = "地域を選択してください";
          //     }
          //     if (!values.cityId) {
          //       errors.cityId = "都市を選択してください";
          //     }
          //     // if (!values.location || !values.lat || !values.lng) {
          //     //   errors.name = "無効なアドレス"
          //     // }
          //     return errors;
          //   }}
          onSubmit={async (values, { setErrors }) => {
            // const totalPowerOutput = parseFloat(values.totalPowerOutput)
            await createQuestion({ input: { ...values } });
            router.push("/qa");
          }}
        >
          {({ values, isSubmitting }) => (
            <Form>
              <Box p={10} mt={[10, 0]}>
                <InputField name="title" placeholder="title" label="Title" />
                <InputTextArea name="text" label="Question" />

                <Box
                  px={{ base: 4, sm: 6 }}
                  py={3}
                  bg={"gray.50"}
                  textAlign="right"
                >
                  <Button
                    isLoading={isSubmitting}
                    type="submit"
                    colorScheme="orange"
                    _focus={{ shadow: "" }}
                    fontWeight="md"
                  >
                    Ask
                  </Button>
                </Box>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    </MainLayout>
  );
};

export default Ask;
