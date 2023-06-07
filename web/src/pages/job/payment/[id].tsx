import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Select,
  Spinner,
  Text,
} from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import MainLayout from "../../../components/Layout/MainLayout";
import {
  usePaymentTransactionQuery,
  useUpdateTransactiontProcessingMutationMutation,
} from "../../../generated/graphql";
import { formatCurrency } from "../../../utils/formaters";
import { useGetStrId } from "../../../utils/useGetStrId";
import ConfirmDialog from "./ConfirmDialog";
import NextLink from "next/link";

interface paymentProps {}

const Payment: React.FC<paymentProps> = ({}) => {
  const PAYMENT_ENDPOINT =
    "https://www.e5.billingjapan.co.jp/NASApp/bjp/PB71SelectBankServlet";

  const PORTAL_CODE = "000230";
  const SHOP_CODE = "1256201050";

  const INVALID_RETURN_URL =
    (process.env.NEXT_PUBLIC_SERVER_BASE_URL as string) +
    "/api/payment-post-checkout";
  const VALID_RETURN_URL =
    (process.env.NEXT_PUBLIC_SERVER_BASE_URL as string) +
    "/api/payment-post-checkout";

  const BANK_CODES = {
    MPN: "MJ01",
    ATM: "AT01",
  };

  const KESSAI_FLAGS = {
    MPN: "MJ",
    ATM: "AT",
  };

  const paymentTransactionId = useGetStrId();
  const [{ data, fetching }] = usePaymentTransactionQuery({
    variables: { paymentTransactionId },
  });

  const [, updatePaymentProcessing] =
    useUpdateTransactiontProcessingMutationMutation();

  const [KESSAI_FLAG, setKESSAI_FLAG] = useState<string>("");
  const [BANK_CODE, setBANK_CODE] = useState<string>();

  const formRef = useRef<any>(null);
  const onConfirmHandler = () => {
    updatePaymentProcessing({
      input: {
        transactionId: data?.paymentTransaction.transactionId
          ? data?.paymentTransaction.transactionId
          : "",
      },
    });

    formRef.current.submit();
  };
  return (
    <MainLayout>
      {fetching ? (
        <Spinner />
      ) : data ? (
        <Box
          shadow={"lg"}
          px={[10, 30]}
          py={[5, 10]}
          my={[5, 20]}
          rounded={"xl"}
          maxWidth={["xs", "xl"]}
          mx={"auto"}
          borderColor={"gray.200"}
          borderStyle={"solid"}
          borderWidth={"thin"}
        >
          {/* <Formik
          initialValues={{
            PORTAL_CODE,
            SHOP_CODE,
            BANK_CODE: BANK_CODES.MPN,
            KESSAI_FLAG: KESSAI_FLAGS.MPN,
            TRAN_AMOUNT: "0",
            CTRL_NO,
            INVALID_RETURN_URL,
                VALID_RETURN_URL,
          }}
          onSubmit={async (values, { setErrors, setSubmitting }) => {
            if (values.BANK_CODE === BANK_CODES.MPN) {
              values.KESSAI_FLAG = KESSAI_FLAGS.MPN;
            } else {
              values.KESSAI_FLAG = KESSAI_FLAGS.Edy;
            }

            values.TRAN_AMOUNT = values.TRAN_AMOUNT.toLocaleString()

            // const request = new Request(PAYMENT_ENDPOINT, {
            //   method: "POST",
            //   headers: {
            //     "content-type": "application/x-www-form-urlencoded",
            //   },
            //   credentials: "include",
            //   mode: "no-cors",
            //   body: new URLSearchParams({
            //     PORTAL_CODE,
            //     SHOP_CODE,
            //     BANK_CODE: values.BANK_CODE,
            //     KESSAI_FLAG: values.KESSAI_FLAG,
            //     CTRL_NO,
            //     TRAN_AMOUNT: values.TRAN_AMOUNT.toString(),
            //     INVALID_RETURN_URL,
            //     VALID_RETURN_URL,
            //   }),
            // })

            // const response = await fetch(request);
            // const data = await response;
            // console.log(data);
          }}
        >
          {({ isSubmitting, values, handleChange }) => ( */}
          <form
            action="https://www.e5.billingjapan.co.jp/NASApp/bjp/PB71SelectBankServlet"
            method="POST"
            ref={formRef}
          >
            <Heading textAlign={"center"} mb={6}>
              {"仮払"}
            </Heading>
            <input name="PORTAL_CODE" value={PORTAL_CODE} type="hidden" />
            <input name="SHOP_CODE" value={SHOP_CODE} type="hidden" />
            <input name="KESSAI_FLAG" value={KESSAI_FLAG} type="hidden" />
            <input
              name="CTRL_NO"
              value={data?.paymentTransaction.transactionId}
              type="hidden"
            />
            <input
              name="INVALID_RETURN_URL"
              value={INVALID_RETURN_URL}
              type="hidden"
            />
            <input
              name="VALID_RETURN_URL"
              value={VALID_RETURN_URL}
              type="hidden"
            />

            <Text color="red.600">※お支払方法を選択してください</Text>
            <Select
              id="BANK_CODE"
              name="BANK_CODE"
              placeholder="お支払方法"
              value={BANK_CODE}
              variant={"filled"}
              onChange={(e) => {
                const bankCode = e.target.value;
                setBANK_CODE(bankCode);
                if (bankCode === BANK_CODES.MPN) {
                  setKESSAI_FLAG(KESSAI_FLAGS.MPN);
                } else {
                  setKESSAI_FLAG(KESSAI_FLAGS.ATM);
                }
                console.log(KESSAI_FLAG);
                console.log(BANK_CODE);
              }}
            >
              <option value={BANK_CODES.MPN}>ペイジー決済</option>
              {/* <option value={BANK_CODES.ATM}>ATM</option> */}
            </Select>
            <input
              name="TRAN_AMOUNT"
              value={data?.paymentTransaction.amount}
              type="hidden"
            />
            <Flex
              justifyContent={"space-between"}
              bgColor={"gray.300"}
              my={6}
              p={5}
              rounded={"lg"}
            >
              <Text>支払う金額</Text>
              <Text>
                {formatCurrency(
                  data?.paymentTransaction.amount
                    ? data?.paymentTransaction.amount
                    : 0
                )}
              </Text>
            </Flex>
            {BANK_CODE === BANK_CODES.ATM ? (
              <>
                <FormControl>
                  <FormLabel>Name and Last name in Kana</FormLabel>
                  <Input name="CUST_NAME" type="text" />
                </FormControl>
                <FormControl>
                  <FormLabel>Name and Last name</FormLabel>
                  <Input name="CUST_NAME_1" type="text" />
                </FormControl>
              </>
            ) : (
              ""
            )}
            <HStack>
              <NextLink href="/user/owner/job" passHref>
                <Button>戻る</Button>
              </NextLink>
              <ConfirmDialog onConfirmHandler={onConfirmHandler} />
            </HStack>
          </form>
          {/* )}
       </Formik> */}
        </Box>
      ) : (
        <Heading>Invalid Payment</Heading>
      )}
    </MainLayout>
  );
};

export default Payment;
