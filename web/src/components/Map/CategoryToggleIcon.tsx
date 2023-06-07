import { Flex, Center, Text } from "@chakra-ui/react";
import React, { MouseEventHandler } from "react";
import Image from "next/image";

interface CategoryToggleIconProps {
  imageLocation: string;
  label: string;
  toggle: boolean;
  toggleHandler: MouseEventHandler<HTMLDivElement>;
  comingSoon?: boolean;
}

const CategoryToggleIcon: React.FC<CategoryToggleIconProps> = ({
  imageLocation,
  label,
  toggle,
  toggleHandler,
  comingSoon = false,
}) => {
  return (
    <Flex
      direction={"column"}
      alignItems={"center"}
      onClick={toggleHandler}
      cursor={"pointer"}
      p={1}
    >
      {comingSoon ? <Text color={"ecoOrange"} >Coming soon</Text> : <Text mb={6}>{""}</Text>}

      <Center
        rounded={"lg"}
        border={toggle ? "2px" : "none"}
        borderColor={toggle ? "orange.500" : "gray.200"}
        p={1}
      >
        <Image src={imageLocation} height={70} width={70} alt="" />
      </Center>
      <Text
        px={6}
        py={1}
        bgColor={toggle ? "orange.500" : "gray.200"}
        textColor={toggle ? "white" : "black"}
        rounded={"lg"}
        mt={3}
      >
        {label}
      </Text>
    </Flex>
  );
};

export default CategoryToggleIcon;
