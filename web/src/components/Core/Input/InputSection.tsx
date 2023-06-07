import { Box, Text } from "@chakra-ui/react";

interface InputSectionProps {
  sectionTitle: string;
}

const InputSection: React.FC<InputSectionProps> = ({
  sectionTitle,
  children,
}) => {
  return (
    <>
      <Text
        border="1px"
        borderColor={"orange.200"}
        rounded={"2xl"}
        shadow={"md"}
        bgColor={"orange.200"}
        pl={5}
        py={2}
        my={5}
        mx={0}
        fontWeight={"bold"}
        fontSize={"xl"}
      >
        {sectionTitle}
      </Text>
      <Box px={[10, 50]} pb={[0, 2]}>
        {children}
      </Box>
    </>
  );
};

export default InputSection;
