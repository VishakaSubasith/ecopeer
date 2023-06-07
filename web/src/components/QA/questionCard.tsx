import React from "react";
import {
  chakra,
  Box,
  Text,
  Flex,
  useColorModeValue,
  Link,
  Avatar,
  VStack,
  HStack,
} from "@chakra-ui/react";
import { formatDate } from "../../utils/formaters";
import NextLink from "next/link";

interface QuestionCardProps {
  createdDate: number;
  title: string;
  text: string;
  email: string;
  questionId: number;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  createdDate,
  title,
  text,
  email,
  questionId,
}) => {
  return (
    <Box
      mx="auto"
      px={8}
      py={4}
      rounded="lg"
      shadow="lg"
      bg={useColorModeValue("white", "gray.800")}
      maxW="2xl"
      minW={["sm", "xl"]}
    >
      <Flex justifyContent="space-between" alignItems="center">
        <chakra.span
          fontSize="sm"
          color={useColorModeValue("gray.600", "gray.400")}
        >
          {formatDate(createdDate)}
        </chakra.span>
        {/* <Link
            px={3}
            py={1}
            bg="gray.600"
            color="gray.100"
            fontSize="sm"
            fontWeight="700"
            rounded="md"
            _hover={{ bg: "gray.500" }}
          >
            Design
          </Link> */}
      </Flex>

      <Box mt={2}>
        <Text
          fontSize="2xl"
          color={useColorModeValue("gray.700", "white")}
          fontWeight="700"
        >
          {title}
        </Text>
        <chakra.p mt={2} color={useColorModeValue("gray.600", "gray.300")}>
          {text}
        </chakra.p>
      </Box>

      <Flex justifyContent="space-between" alignItems="center" mt={4}>
        <NextLink href={`/qa/question/${questionId}`}>
          <Link
            color={useColorModeValue("brand.600", "brand.400")}
            _hover={{ textDecor: "underline" }}
          >
            Check answers
          </Link>
        </NextLink>

        <HStack>
          <Avatar size={"sm"} src={""} name={email} />
          <VStack
            display={{ base: "none", md: "flex" }}
            alignItems="flex-start"
            spacing="1px"
            ml="2"
          >
            <Text fontSize="sm">{email.slice(0,5)+"*********"}</Text>
          </VStack>
        </HStack>
      </Flex>
    </Box>
  );
};

export default QuestionCard;
