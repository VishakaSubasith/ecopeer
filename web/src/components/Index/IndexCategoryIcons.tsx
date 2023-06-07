import { Stack } from "@chakra-ui/layout";
import React from "react";
import CategoryIcon from "../Core/CategoryIcon";

interface IndexCategoryIconsProps {}

const IndexCategoryIcons: React.FC<IndexCategoryIconsProps> = ({}) => {
  return (
    <Stack
      direction={"row"}
      flexWrap={["wrap", "nowrap"]}
      justifyContent={["space-around"]}
    >
      <CategoryIcon
        label={"発電所オーナー"}
        image_location={"/images/icons/square/owner.png"}
      />
      <CategoryIcon
        label={"業者"}
        image_location={"/images/icons/square/maintainer.png"}
      />
      <CategoryIcon label={"お仕事"} image_location={"/images/icons/square/job.png"} />
      <CategoryIcon
        label={"低圧発電所"}
        image_location={"/images/icons/square/lowVoltagePowerplant.png"}
      />
      <CategoryIcon
        label={"高圧発電所"}
        image_location={"/images/icons/square/highVoltagePowerplant.png"}
      />
      <CategoryIcon
        label={"セミナー"}
        image_location={"/images/icons/square/seminar.png"}
      />
      <CategoryIcon
        label={"オフ会"}
        image_location={"/images/icons/square/offParty.png"}
      />
    </Stack>
  );
};

export default IndexCategoryIcons;
