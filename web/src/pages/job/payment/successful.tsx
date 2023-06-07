import { VStack, Button, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import MainLayout from "../../../components/Layout/MainLayout";

interface paymentSuccessfulProps {}

const paymentSuccessful: React.FC<paymentSuccessfulProps> = ({}) => {
  return (
    <MainLayout>
      <VStack
        justifyContent={"center"}
        p={5}
        my={[5, 20]}
        mx={"auto"}
        maxWidth={["xs", "lg"]}
        borderWidth={"thin"}
        borderColor={"gray.200"}
        rounded={"xl"}
        shadow={"lg"}
      >
        <Text fontSize={"xl"}>支払いは正常に完了しました</Text>
        <NextLink passHref href={"/user/owner/job"}>
          <Button>ジョブページへ</Button>
        </NextLink>
      </VStack>
    </MainLayout>
  );
};

export default paymentSuccessful;
