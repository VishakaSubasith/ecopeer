import { Box, Avatar, HStack, Text, Stack, Image } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getRelativeTime } from "../../utils/relativeTimeFormater";

interface MessageProps {
  sender: boolean;
  content: string;
  uploadedFile?: any;
  timestamp: Date;
}

const Message: React.FC<MessageProps> = ({
  sender,
  content,
  uploadedFile,
  timestamp,
}) => {
  const [relT, setRelT] = useState("");

  useEffect(() => {
    const relativeTime = getRelativeTime(timestamp);
    setRelT(relativeTime);
  }, []);
  return (
    <Stack alignItems={sender ? "flex-end" : ""}>
      <HStack>
        {!sender ? <Avatar /> : null}
        <Text
          bgColor={sender ? "#d3e1fb" : "gray.100"}
          textColor={sender ? "#4d75b2" : "black"}
          fontWeight={"600"}
          rounded={"xl"}
          px={3}
          py={3}
          maxWidth={400}
          minWidth={70}
        >
          {content}
        </Text>
      </HStack>
      {uploadedFile ? (
        <Image src={uploadedFile.storageLocation} h={60} w={60} alt={"image"} />
      ) : null}
      <Box>
        <Text>{relT}</Text>
      </Box>
    </Stack>
  );
};

export default Message;
