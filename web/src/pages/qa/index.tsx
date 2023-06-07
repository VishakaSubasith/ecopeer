import React from "react";
import MainLayout from "../../components/Layout/MainLayout";
import QuestionCard from "../../components/QA/questionCard";
import { useMeQuery, useQuestionsQuery } from "../../generated/graphql";
import NextLink from "next/link";
import { HStack, Button, Flex, VStack } from "@chakra-ui/react";

interface QAProps {}

const QA: React.FC<QAProps> = ({}) => {
  const [{ data: dataMe }] = useMeQuery();
  const [{ data }] = useQuestionsQuery({ requestPolicy: "cache-and-network" });
    console.log("data======",data)
  return (
    <MainLayout>
      {dataMe?.me?.id && (
        <HStack justifyContent={"flex-end"}>
          <NextLink href={"/qa/ask"}>
            <Button>Ask a question</Button>
          </NextLink>
        </HStack>
      )}
      <VStack>
        {data?.questions.map((question) => (
          <QuestionCard
            key={question.id}
            questionId={question.id}
            title={question.title}
            text={question.text}
            createdDate={parseInt(question.createdAt)}
            email={question.user.email}
          />
        ))}
      </VStack>
    </MainLayout>
  );
};

export default QA;
