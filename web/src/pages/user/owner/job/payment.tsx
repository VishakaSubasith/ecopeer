import { Box, Text, Button, Flex } from "@chakra-ui/react";
import MainLayout from "../../../../components/Layout/MainLayout";
import {
  PaymentStatus,
  useUserPaymentQuery,
} from "../../../../generated/graphql";
import NextLink from "next/link";

interface paymentProps {}

const Payment: React.FC<paymentProps> = ({}) => {
  const [{ data }] = useUserPaymentQuery();
  return (
    <MainLayout showSidebar>
      <Flex wrap={"wrap"} justifyContent={"flex-start"}>
        {data?.currentUserDetails?.paymentTransactions
          .map((transaction) => (
            <Box
              flex={"1 1 30%"}
              p={5}
              m={5}
              maxWidth={"45%"}
              rounded={"lg"}
              shadow={"lg"}
              bgColor={"gray.100"}
              border={"2px solid #d2d9d3"}
              key={transaction.id}
              _hover={{ shadow: "xl", border: "2px solid #dd6b20a1" }}
            >
              <Text>Title:{transaction.job.title}</Text>
              <Text>Amout:{transaction.amount}</Text>
              <Text>Status:</Text>
              <Text>{transaction.status}</Text>
              {transaction.status === PaymentStatus.Pending && (
                <Flex justifyContent={"flex-end"}>
                  <NextLink
                    passHref
                    href={`/job/payment/${transaction.transactionId}`}
                  >
                    <Button mt={5} mx={5} rounded={"lg"} shadow={"lg"}>
                      Pay Now
                    </Button>
                  </NextLink>
                </Flex>
              )}
            </Box>
          ))}
      </Flex>
    </MainLayout>
  );
};

export default Payment;
