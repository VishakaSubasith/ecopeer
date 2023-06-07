import { Text, Center, Flex } from "@chakra-ui/react";
import Image from "next/image";

interface CategoryIconProps {
  label: string;
  image_location: string;
  variant?: "icon" | "iconExpanded";
}

const CategoryIcon: React.FC<CategoryIconProps> = ({
  label,
  image_location,
  variant = "icon",
}) => {
  let description = <Text mt={3}>{label}</Text>;
  if (variant === "iconExpanded") {
    description = (
      <Text
        alignSelf={"normal"}
        my={3}
        px={2}
        py={2}
        roundedRight={"md"}
        backgroundColor={"blue.200"}
      >
        {label}
      </Text>
    );
  }
  return (
    <Flex
      direction={variant === "icon" ? "column" : "row"}
      alignItems={"center"}
    >
      <Center
        // rounded={"lg"}
        // shadow={"md"}
        // border={"1px"}
        // borderColor={"gray.100"}
        p={1}
      >
        <Image
          src={image_location}
          height={100}
          width={100}
          priority={true}
          alt=""
        />
      </Center>
      {description}
    </Flex>
  );
};

export default CategoryIcon;
