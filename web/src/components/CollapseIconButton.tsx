import { DeleteIcon } from "@chakra-ui/icons";
import { Flex, Collapse, useDisclosure, Text } from "@chakra-ui/react";
import React from "react";

interface CollapseIconButtonProps {}

const CollapseIconButton: React.FC<CollapseIconButtonProps> = ({}) => {
  const { isOpen: isOpenButton, onToggle: onToggleButton } = useDisclosure();

  return (
    <Flex
      p={2}
      rounded={"xl"}
      alignItems={"center"}
      bgColor={"red.500"}
      color={"white"}
      _hover={{ cursor: "pointer", bgColor: "red.600" }}
      onMouseEnter={onToggleButton}
      onMouseLeave={onToggleButton}
      onClick={onToggleButton}
    >
      <DeleteIcon h={"21px"} w={"18px"} mx={1} />
      <Collapse in={isOpenButton} animateOpacity={true}>
        <Text p={0} mx={2}>
          Delete
        </Text>
      </Collapse>
    </Flex>
  );
};

export default CollapseIconButton;
