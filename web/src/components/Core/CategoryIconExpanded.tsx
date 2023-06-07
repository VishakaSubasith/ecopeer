import { Box } from "@chakra-ui/react";
import React from "react";
import CategoryIcon from "./CategoryIcon";

interface CategoryIconExpandedProps {
  label: string;
  image_location: string;
}

const CategoryIconExpanded: React.FC<CategoryIconExpandedProps> = ({
  label,
  image_location,
}) => {
  return (
    <Box>
      <CategoryIcon image_location={image_location} label={label} />
    </Box>
  );
};

export default CategoryIconExpanded;
