import { Center, VStack, Spinner, Text, Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import MainLayout from "../../../components/Layout/MainLayout";
import {
  PaymentStatus,
  useUpdateUserPaymentStatusMutation,
} from "../../../generated/graphql";

interface paymentSuccessfulProps {}

const PaymentSuccessful: React.FC<paymentSuccessfulProps> = ({}) => {
  const router = useRouter();
  const paymentId: any = router.query.paymentId;
  const [, updateStatus] = useUpdateUserPaymentStatusMutation();
  return (
    <MainLayout>
      <Center>
        <VStack>
          <Text fontSize={"xl"}>Payment was completed successfully</Text>
          <Text fontSize={"large"}>You will redirect to the jobs page</Text>
          <Spinner size={"xl"} />
          <Button
            onClick={async () => {
              await updateStatus({
                transactionId: paymentId,
                paymentStatus: PaymentStatus.Successful,
              });
              router.push("/user/profile/subscription");
            }}
          >
            Click here to continue
          </Button>
        </VStack>
      </Center>
    </MainLayout>
  );
};

export default PaymentSuccessful;
