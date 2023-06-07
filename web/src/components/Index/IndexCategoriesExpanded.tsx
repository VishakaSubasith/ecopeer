import React from "react";
import Image from "next/image";
import { Box, Stack } from "@chakra-ui/react";
import CategoryIcon from "../Core/CategoryIcon";

interface IndexCategoriesExpandedProps {}

const IndexCategoriesExpanded: React.FC<
  IndexCategoriesExpandedProps
> = ({}) => {
  return (
    <Box mt={10}>
      <Image
        src={"/images/sections/peers1.png"}
        height={100}
        width={1500}
        alt=""
      />
      <Stack direction={["column", "row"]}>
        <CategoryIcon
          variant={"iconExpanded"}
          label={"description of the icon"}
          image_location={"/images/icons/owner.png"}
        />
        <CategoryIcon
          variant={"iconExpanded"}
          label={"description of the icon"}
          image_location={"/images/icons/maintainer.png"}
        />
        <CategoryIcon
          variant={"iconExpanded"}
          label={"description of the icon"}
          image_location={"/images/icons/owner.png"}
        />
        <CategoryIcon
          variant={"iconExpanded"}
          label={"description of the icon"}
          image_location={"/images/icons/job.png"}
        />
      </Stack>
    </Box>
  );
};

export default IndexCategoriesExpanded;
