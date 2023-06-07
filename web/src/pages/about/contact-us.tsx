import { EmailIcon } from "@chakra-ui/icons";
import {
  Container,
  Flex,
  Box,
  Heading,
  Text,
  Button,
  VStack,
  Wrap,
  WrapItem,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Textarea,
  Center,
  Checkbox,
  Select,
  Link,
  HStack,
  useToast,
} from "@chakra-ui/react";
// import {
//   MdPhone,
//   MdEmail,
//   MdLocationOn,
//   MdFacebook,
//   MdOutlineEmail,
// } from "react-icons/md";
// import { BsGithub, BsDiscord, BsPerson } from "react-icons/bs";
import React from "react";
import MainLayout from "../../components/Layout/MainLayout";
import NextLink from "next/link";
import { Form, Formik } from "formik";
import InputField from "../../components/Core/InputField";
import SelectInputField from "../../components/Core/Input/SelectInputField";
import InputTextArea from "../../components/Core/Input/InputTextArea";
import CheckboxInputField from "../../components/Core/Input/CheckboxInputField";
import { useContactUsMutation } from "../../generated/graphql";

interface ContactUsProps {}

interface ErrorFields {
  name?: string;
  email?: string;
  classification?: string;
  message?: string;
  acceptTerms?: string;
}

const ContactUs: React.FC<ContactUsProps> = ({}) => {
  const [, sendEmail] = useContactUsMutation();
  const toast = useToast();
  return (
    <MainLayout varient={"pure"}>
      <Container
        // bg="white"
        maxW="full"
        mt={0}
        centerContent
        overflow="hidden"
      >
        <Box
          bg="white"
          color="black"
          shadow={"lg"}
          borderRadius="xl"
          border={"1px solid"}
          borderColor={"gray.200"}
          m={{ sm: 4, md: 16, lg: 10 }}
          p={{ sm: 5, md: 5, lg: 16 }}
        >
          <Center>
            <Heading>お問合せ</Heading>
          </Center>
          <Box p={4}>
            <Wrap spacing={{ base: 20, sm: 3, md: 5, lg: 10 }}>
              <WrapItem>
                <Box>
                  <Box textAlign={"left"}>
                    <Text mt={{ sm: 3, md: 3, lg: 5 }} color="gray.600">
                      サービスの改善などのご要望がございましたら
                    </Text>
                    <Text mt={{ sm: 3, md: 3, lg: 5 }} color="gray.600">
                      どんな些細な事でもお知らせ頂ければ幸いです。
                    </Text>
                    <Text mt={{ sm: 3, md: 3, lg: 5 }} color="gray.600">
                      返信は確約できかねますが、貴重なご意見として
                    </Text>
                    <Text mt={{ sm: 3, md: 3, lg: 5 }} color="gray.600">
                      今後の運営上の参考にさせていただきます。
                    </Text>
                  </Box>
                  {/* <Box py={{ base: 5, sm: 5, md: 8, lg: 10 }}>
                      <VStack pl={0} spacing={3} alignItems="flex-start">
                        <Button
                          size="md"
                          height="48px"
                          width="200px"
                          variant="ghost"
                          color="black"
                          textColor={"black"}
                          _hover={{ border: "2px solid #1C6FEB" }}
                          leftIcon={<EmailIcon color="black" w={8} h={8} />}
                        >
                          info@ecopeer.net
                        </Button>
                      </VStack>
                    </Box> */}
                </Box>
              </WrapItem>
              <WrapItem>
                <Box bg="white" borderRadius="lg" w={"lg"}>
                  <Box m={8} color="#0B0E3F">
                    <Formik
                      onSubmit={async (values,{setErrors,resetForm}) => {
                        // @ts-ignore
                       const result = await sendEmail({ input: {name:values.name,email:values.email,message:values.message,classification:values.classification.label} });
                       if (result.data?.contactUs){
                         toast({
                           title: "認証メール送信",
                           description: "（ご登録のメールアドレスをご確認ください）",
                           position: "top-right",
                           status: "success",
                           duration: 9000,
                           isClosable: true,
                         });
                         resetForm();
                       }
                      }}
                      initialValues={{
                        name: "",
                        email: "",
                        classification: "",
                        message: "",
                        acceptTerms: "",
                      }}
                      validate={(values) => {
                        const errors: ErrorFields = {};
                        if (!values.name) errors.name = "必須";

                        if (!values.email) errors.email = "必須";

                        if (!values.acceptTerms)
                          errors.acceptTerms = "確認してください";
                        return errors;
                      }}
                    >
                      {({ isSubmitting, errors }) => (
                        <Form>
                          <InputField
                            name="name"
                            placeholder=""
                            label="お名前"
                            required
                          />
                          <InputField
                            name="email"
                            placeholder=""
                            label="メールアドレス"
                            required
                          />

                          <SelectInputField
                            name="classification"
                            label="分類"
                            optionValues={[
                              {
                                label: "発電所オーナー",
                                value: "発電所オーナー",
                              },
                              {
                                label: "業者",
                                value: "業者",
                              },
                            ]}
                            placeholder="分類"
                          />

                          <InputTextArea
                            name="message"
                            label="内容"
                            placeholder="メッセージ"
                          />
                          <CheckboxInputField
                            name="acceptTerms"
                            formLabelComponent={
                              <>
                                <Text as={"span"}>
                                  <NextLink href={"/about/privacy"} passHref>
                                    <Link color={"blue.500"}>
                                      個人情報保護方針{" "}
                                    </Link>
                                  </NextLink>
                                </Text>
                                <Text as={"span"}>に同意をする</Text>
                              </>
                            }
                            label="terms"
                          />
                          <HStack justifyContent={"right"}>
                            <Button
                              type="submit"
                              isLoading={isSubmitting}
                              disabled={
                                errors.name ||
                                errors.email ||
                                errors.acceptTerms
                                  ? true
                                  : false
                              }
                              // onClick={() => (values.status = "REGISTERED")}
                            >
                              送信
                            </Button>
                          </HStack>
                        </Form>
                      )}
                    </Formik>
                  </Box>
                </Box>
              </WrapItem>
            </Wrap>
          </Box>
        </Box>
      </Container>
    </MainLayout>
  );
};

export default ContactUs;
