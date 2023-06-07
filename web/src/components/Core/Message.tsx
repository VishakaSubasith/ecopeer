import { Box } from "@chakra-ui/layout";
import {
  Avatar,
  AvatarBadge,
  HStack,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { UserType } from "../../generated/graphql";

interface MessageProps {
  content: string;
  varient: "sender" | "receiver";
  userType: UserType | undefined;
  messageTimestamp: Date;
  uploadedFile?: any;
}

const Message: React.FC<MessageProps> = ({
  content,
  varient,
  userType,
  messageTimestamp,
  uploadedFile,
}) => {
  let imageLocation;
  if (userType === UserType.Owner) {
    imageLocation = "/images/icons/owner.png";
  } else if (userType === UserType.Maintainer) {
    imageLocation = "/images/icons/maintainer.png";
  } else {
    imageLocation = "/images/icons/job.png";
  }
  return (
    <HStack
      alignItems={"flex-start"}
      alignSelf={varient === "sender" ? "flex-end" : "flex-start"}
      mb={2}
    >
      {varient !== "sender" ? (
        <Avatar src={imageLocation}>
          {" "}
          <AvatarBadge boxSize="1.25em" bg="green.500" />
        </Avatar>
      ) : (
        ""
      )}
      <VStack alignItems={varient === "sender" ? "flex-end" : "flex-start"}>
        <Box
          w={"fit-content"}
          bgColor={varient === "sender" ? "blue.500" : "gray.200"}
          py={2}
          px={6}
          rounded={"3xl"}
        >
          <Text color={varient === "sender" ? "white" : "black"}>
            {content}
          </Text>
          {uploadedFile ? (
            <Image src={uploadedFile.storageLocation} h={60} w={60} />
          ) : (
            ""
          )}
        </Box>
        <Text
          pl={varient === "sender" ? 0 : 2}
          pr={varient === "sender" ? 2 : 2}
          color={"gray.500"}
          fontSize={"x-small"}
        >
          {messageTimestamp.toLocaleString()}
        </Text>
      </VStack>
      {varient === "sender" ? <Avatar src={imageLocation} /> : ""}
    </HStack>
  );
};

export default Message;
