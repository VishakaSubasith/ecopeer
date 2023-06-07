import { Box } from "@chakra-ui/layout";
import { Flex, Text } from "@chakra-ui/react";
import React from "react";
import { useAreasQuery } from "../../generated/graphql";
import IndexMapRegion from "./IndexMapRegion";

interface IndexMapProps {}

const IndexMap: React.FC<IndexMapProps> = ({}) => {
  const [{ data, fetching }] = useAreasQuery();
  return (
    <>
      <Box
        display={["none", "grid"]}
        mb={10}
        className="main-map custom-grid-container"
      >
        <Box className="custom-box">
          <Box
            fontSize={"2xl"}
            bgGradient='linear(to-b, ecoBlue, ecoOrange)'
            rounded={"xl"}
            textColor={"white"}
            mx={5}
            p={4}
            textAlign={"center"}
          >
            <Text>エコピアマップ</Text>
            <Text>🔍マップから探す</Text>
          </Box>
        </Box>
        <IndexMapRegion
          regionClass="hokkaido"
          area={data?.areas.filter((area) => area.name === "北海道・東北")[0]}
        />
        <IndexMapRegion
          regionClass="kanto"
          area={data?.areas.filter((area) => area.name === "関東")[0]}
        />
        <IndexMapRegion
          regionClass="kanto"
          area={data?.areas.filter((area) => area.name === "関東")[0]}
        />
        <IndexMapRegion
          regionClass="hokuriku"
          area={data?.areas.filter((area) => area.name === "北陸・甲信越")[0]}
        />
        <IndexMapRegion
          regionClass="tokai"
          area={data?.areas.filter((area) => area.name === "東海")[0]}
        />
        <IndexMapRegion
          regionClass="kansai"
          area={data?.areas.filter((area) => area.name === "関西")[0]}
        />
        <IndexMapRegion
          regionClass="chugoku"
          area={data?.areas.filter((area) => area.name === "中国・四国")[0]}
        />
        <IndexMapRegion
          regionClass="kyushu"
          area={data?.areas.filter((area) => area.name === "九州・沖縄")[0]}
        />
      </Box>
      {/* Mobile View */}
      <Flex direction={"column"} display={["flex", "none"]}>
        <IndexMapRegion
          regionClass="hokkaido"
          area={data?.areas.filter((area) => area.name === "北海道・東北")[0]}
        />
        <IndexMapRegion
          regionClass="kanto"
          area={data?.areas.filter((area) => area.name === "関東")[0]}
        />
        <IndexMapRegion
          regionClass="hokuriku"
          area={data?.areas.filter((area) => area.name === "北陸・甲信")[0]}
        />
        <IndexMapRegion
          regionClass="tokai"
          area={data?.areas.filter((area) => area.name === "東海")[0]}
        />
        <IndexMapRegion
          regionClass="kansai"
          area={data?.areas.filter((area) => area.name === "関西")[0]}
        />
        <IndexMapRegion
          regionClass="chugoku"
          area={data?.areas.filter((area) => area.name === "中国・四国")[0]}
        />
        <IndexMapRegion
          regionClass="kyushu"
          area={data?.areas.filter((area) => area.name === "九州・沖縄")[0]}
        />
      </Flex>
    </>
  );
};

export default IndexMap;
