import { Flex, Heading } from "@chakra-ui/react";

interface Props {
  title: string;
  //   action?: React.ReactNode
}

const CardHeader = (props: Props) => {
  //   const { title, action } = props
  const { title } = props;
  return (
    <Flex
      align="center"
      justifyContent="center"
      px="6"
      py="4"
      borderBottomWidth="1px"
    >
      <Heading fontSize="lg">{title}</Heading>
      {/* {action} */}
    </Flex>
  );
};

export default CardHeader;
