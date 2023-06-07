import React from "react";
import MainLayout from "../components/Layout/MainLayout";
import NextImage from "next/image";
import { Box } from "@chakra-ui/react";

const Info: React.FC = () => {
  return (
    <MainLayout varient={"pure"}>
      <Box>
        <NextImage
          src={"/images/pages/info/info_01.jpg"}
          //   height={"4000px"}
          //   width={"1000px"}
          width={"100%"}
          height={"100%"}
          layout={"responsive"}
          objectFit={"contain"}
          priority
        />
        <NextImage
          src={"/images/pages/info/info_02.jpg"}
          //   height={"4000px"}
          //   width={"1000px"}
          width={"100%"}
          height={"100%"}
          layout={"responsive"}
          objectFit={"contain"}
          priority
        />
        <NextImage
          src={"/images/pages/info/info_03.jpg"}
          //   height={"4000px"}
          //   width={"1000px"}
          width={"100%"}
          height={"100%"}
          layout={"responsive"}
          objectFit={"contain"}
          priority
        />
      </Box>
    </MainLayout>
  );
};

export default Info;
