import { Button, Center, Spinner, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";

import MainLayout from "../../../components/Layout/MainLayout";
import {
  PaymentStatus,
  useUpdateUserPaymentStatusMutation,
} from "../../../generated/graphql";

interface paymentFailedProps {
  // test: string | string[] | undefined;
}

const PaymentFailed: NextPage<paymentFailedProps> = () => {
  // useEffect(() => {

  //   setTimeout(() => router.push("/user/profile"), 5000);
  // });
  const router = useRouter();
  const paymentId: any = router.query.paymentId;
  const [, updateStatus] = useUpdateUserPaymentStatusMutation();
  return (
    <MainLayout>
      <Center>
        <VStack>
          <Text fontSize={"xl"}>Payment Failed</Text>
          <Text fontSize={"large"}>
            You will be redirected back to the payment page
          </Text>
          <Spinner size={"xl"} />
          <Button
            onClick={async () => {
              await updateStatus({
                transactionId: paymentId,
                paymentStatus: PaymentStatus.Failed,
              });
              router.push("/user/profile")
            }}
          >
            Click here to continue
          </Button>
        </VStack>
      </Center>
    </MainLayout>
  );
};

// paymentFailed.getInitialProps = async ({ req }) => {
//   let body: any;
//   if (req?.method == "POST") {
//     body = "";
//     req.on("data", (chunk) => {
//       console.log(typeof chunk);
//       body += chunk;
//     });
//     req.on("end", () => {
//       console.log(typeof body);
//       console.log(body);
//     });
//   }
//   return { test: body.PORTAL_CODE };
// };

export default PaymentFailed;
