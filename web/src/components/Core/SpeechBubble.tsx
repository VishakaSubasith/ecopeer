import { Box, Text } from "@chakra-ui/react";
import React from "react";

interface SpeechBubbleProps {
  text: string;
}

const SpeechBubble: React.FC<SpeechBubbleProps> = ({ text }) => {
  return (
    <Box
      w={"150px"}
      padding={"8px"}
      textAlign={"center"}
      position={"relative"}
      bgColor={"#f8b62d"}
      rounded={"md"}
      m={0}
    >
      <Text
        _before={{
          content: '""',
          width: "0px",
          height: "0px",
          position: "absolute",
          borderLeft: "8px solid #f8b62d",
          borderRight: "8px solid transparent",
          borderTop: "8px solid #f8b62d",
          borderBottom: "8px solid transparent",
          bottom: "-15px",
        //   top: "6px",
        }}
      >
        {text}
      </Text>
    </Box>
  );
};

export default SpeechBubble;
