import React from "react";
import { HStack, Text } from "@chakra-ui/react";
import { formatDate } from "../../../utils/formaters";

interface NewUserCardProps {
  date: number;
  name: string;
}

const NewUserCard: React.FC<NewUserCardProps> = ({ date, name }) => {
  return (
    <HStack
      px={{ base: 4, md: 8 }}
      py={"5"}
      justifyContent={"flex-start"}
      shadow={"md"}
      border={"1px solid"}
      borderColor={"gray.300"}
      rounded={"xl"}
      w={"100%"}
      spacing={15}
    >
      <Text>{formatDate(date)}</Text>
      <Text>{`${name}さんが仲間に加わりました。`}</Text>
    </HStack>
  );
};

export default NewUserCard;
