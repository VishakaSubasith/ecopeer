import { Box, Button, Center, Select, Text } from "@chakra-ui/react";
import React from "react";
import MainLayout from "../../../../../components/Layout/MainLayout";
import { useGetIntId } from "../../../../../utils/useGetIntId";
import { Formik, Form } from "formik";
import router from "next/router";
import InputField from "../../../../../components/Core/InputField";
import { useRateOwnerMutation } from "../../../../../generated/graphql";

interface evaluationProps {}

const Evaluation: React.FC<evaluationProps> = ({}) => {
  const jobId = useGetIntId();

  const [, rateOwner] = useRateOwnerMutation();

  return (
    <MainLayout showSidebar>
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
            initialValues={{ comment: "", rating: "" }}
            validate={(values) => {
              const errors: any = {};
              if (!values.comment) {
                errors.comment = "必須";
              }
              if (!values.rating) {
                errors.rating = "必須";
              }

              return errors;
            }}
            onSubmit={async (values) => {
              const res = await rateOwner({
                input: {
                  jobId: jobId,
                  comment: values.comment,
                  rating: parseInt(values.rating),
                },
              });
              router.push("/user/maintainer/job");
            }}
          >
            {({ isSubmitting, values, handleChange, errors }) => (
              <Form>
                <InputField
                  type={"tex"}
                  name="comment"
                  placeholder="コメント"
                  label="コメント"
                />
                <Text color={"red.500"} textAlign="right" fontSize={"sm"}>
                  ※5が最も良い評価です。
                </Text>
                <Select
                  id="rating"
                  name="rating"
                  value={values.rating}
                  onChange={handleChange}
                  placeholder="評価"
                >
                  <option value="5">5</option>
                  <option value="4">4</option>
                  <option value="3">3</option>
                  <option value="2">2</option>
                  <option value="1">1</option>
                </Select>
                <Text my={2} color={"red.500"} fontSize={"sm"}>
                  {errors.rating}
                </Text>
                <Button
                  type="submit"
                  rounded={"lg"}
                  px={6}
                  py={3}
                  mt={4}
                  isLoading={isSubmitting}
                >
                  評価する
                </Button>
              </Form>
            )}
          </Formik>
        </Box>
      </Center>
    </MainLayout>
  );
};

export default Evaluation;
