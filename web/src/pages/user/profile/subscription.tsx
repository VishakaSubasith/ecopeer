import { Box, Button, Flex, Heading, Text, VStack } from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";
import MainLayout from "../../../components/Layout/MainLayout";
import {
  PaymentStatus,
  useGetSubscriptionsQuery,
} from "../../../generated/graphql";

interface subscriptionProps {}

const Subscription: React.FC<subscriptionProps> = ({}) => {
  const [{ data: subscriptions }] = useGetSubscriptionsQuery();

  return (
    <MainLayout>
      {subscriptions?.getSubscriptions &&
      subscriptions.getSubscriptions.filter(
        (sub) => sub.status === PaymentStatus.Successful
      ).length > 0 ? (
        <>
          <Heading>Current subscriptions</Heading>
          {subscriptions.getSubscriptions.map((subscription) => (
            <VStack
              shadow={"md"}
              alignItems={"flex-start"}
              p={5}
              rounded={"xl"}
              mb={5}
              fontWeight={"bold"}
              px={[10, 30]}
              py={[5, 10]}
              my={[5, 10]}
              key={subscription.id}
            >
              <Text>料金: {subscription.price}</Text>
              <Text>Started on: {subscription.createdAt}</Text>
              <Text>無料期間: 90 day</Text>
              <Text>Status: {subscription.status}</Text>
              <Box alignSelf="flex-end">
                <NextLink href="">
                  <Button disabled>閉じる</Button>
                </NextLink>
              </Box>
            </VStack>
          ))}
        </>
      ) : (
        <>
          <Heading>毎月のシステムご利用料金</Heading>
          <VStack
            shadow={"md"}
            p={5}
            alignItems={"flex-start"}
            rounded={"xl"}
            mb={5}
            fontWeight={"bold"}
            px={[10, 30]}
            py={[5, 10]}
            my={[5, 10]}
          >
            <Text>料金: 2,980円（税別）</Text>
            <Text>無料期間: 3ヶ月以内（※3か月以内でのご解約の場合は、料金は発生いたしません）</Text>
            <Box alignSelf="flex-end">
              <NextLink
                href={{
                  pathname: "/user/payment/checkout",
                  query: { subscriptionType: "90" },
                }}
              >
                <Button>次へ</Button>
              </NextLink>
            </Box>
          </VStack>
        </>
      )}
    </MainLayout>
  );
};

export default Subscription;
