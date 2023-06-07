import { Box, BoxProps, useColorModeValue } from "@chakra-ui/react";

const Card = (props: BoxProps) => (
  <Box
    bg={useColorModeValue("white", "gray.700")}
    rounded={{ md: "lg" }}
    shadow="base"
    overflow="hidden"
    {...props}
  />
);

export default Card;
