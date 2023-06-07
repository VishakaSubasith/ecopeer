import {
  HStack,
  Avatar,
  VStack,
  Text,
  Box,
  chakra,
  Button,
} from "@chakra-ui/react";
import React from "react";
import MainLayout from "../../../components/Layout/MainLayout";
import {
  useCreateAnswerMutation,
  useCreateQuestionMutation,
  useMeQuery,
  useQuestionQuery,
} from "../../../generated/graphql";
import { formatDate } from "../../../utils/formaters";
import { useGetIntId } from "../../../utils/useGetIntId";
import NextLink from "next/link";
import { Formik, Form } from "formik";
import router from "next/router";
import InputTextArea from "../../../components/Core/Input/InputTextArea";
import InputField from "../../../components/Core/InputField";

interface QuestionProps {}

const Question: React.FC<QuestionProps> = ({}) => {
  const questionId = useGetIntId();
  const [{ data }, getQuestion] = useQuestionQuery({
    pause: questionId === -1,
    variables: { input: { questionId: questionId } },
  });
  const [{ data: dataMe }] = useMeQuery();
  const [, createAnswer] = useCreateAnswerMutation();

  return (
    <MainLayout>
      {data && <Text>{formatDate(parseInt(data.question.createdAt))}</Text>}
      <HStack>
        <Avatar size={"sm"} src={""} name={data?.question.user.email} />
        <VStack
          display={{ base: "none", md: "flex" }}
          alignItems="flex-start"
          spacing="1px"
          ml="2"
        >
          <Text fontSize="sm">{data?.question.user.email.slice(0,5)+"*********"}</Text>
        </VStack>
      </HStack>

      <Box my={4}>
        <Text fontSize="2xl" color={"gray.700"} fontWeight="700">
          {data?.question.title}
        </Text>
        <chakra.p mt={2} color={"gray.600"}>
          {data?.question.text}
        </chakra.p>
      </Box>
      <Text fontSize="2xl" color={"gray.700"} fontWeight="700">
        Answers
      </Text>
      {!data?.question.answers.length && <Text>No answers yet</Text>}
      {data?.question.answers.map((answer) => (
        <Box key={answer.id} m={2}>
          <Text>{answer.text}</Text>
          <HStack>
            <Avatar size={"sm"} src={""} name={answer.user.email} />
            <VStack
              display={{ base: "none", md: "flex" }}
              alignItems="flex-start"
              spacing="1px"
              ml="2"
            >
              <Text fontSize="sm">{answer.user.email.slice(0,5)+"*********"}</Text>
            </VStack>
          </HStack>
        </Box>
      ))}
      {dataMe?.me?.id && (
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
              await createAnswer({ input: { ...values, questionId } });
              values.text = "";
              getQuestion({ requestPolicy: "network-only" });
            }}
          >
            {({ values, isSubmitting }) => (
              <Form>
                <Box p={10} mt={[10, 0]}>
                  <InputTextArea name="text" label="Answer Question" />

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
                      Answer
                    </Button>
                  </Box>
                </Box>
              </Form>
            )}
          </Formik>
        </Box>
      )}
    </MainLayout>
  );
};

export default Question;
