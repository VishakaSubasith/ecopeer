import { Button } from "@chakra-ui/button";
import { Text } from "@chakra-ui/react";
import { Box, Flex } from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";

interface IndexMapRegionProps {
  area:
    | {
        __typename?: "Area" | undefined;
        id: number;
        name: string;
        regions: {
          __typename?: "Region" | undefined;
          id: number;
          name: string;
        }[];
      }
    | undefined;
  regionClass: string;
}

const regionOrder: any = {
  "北海道・東北": ["北海道", "青森県", "岩手県", "宮城県", "秋田県", "山形県", "福島県"],
  関東: ["茨城県", "栃木県", "群馬県", "埼玉県", "千葉県", "東京県", "神奈川県"],
  "北陸・甲信": ["新潟県", "東京都", "石川県", "福井県", "山梨県", "長野県"],
  東海: ["岐阜県", "静岡県", "愛知県", "三重県"],
  関西: ["滋賀県", "京都府", "大阪府", "兵庫県", "奈良県", "和歌山県"],
  "中国・四国": [
    "鳥取県",
    "島根県",
    "岡山県",
    "広島県",
    "山口県",
    "徳島県",
    "香川県",
    "愛媛県",
    "高知県",
  ],
  "九州・沖縄": [
    "福岡県",
    "佐賀県",
    "長崎県",
    "熊本県",
    "大分県",
    "宮崎県",
    "鹿児島県",
    "沖縄県",
  ],
};

const IndexMapRegion: React.FC<IndexMapRegionProps> = ({
  area,
  regionClass,
}) => {
  const orderer = area?.name
    ? regionOrder[area?.name]
      ? regionOrder[area?.name]
      : []
    : [];
  if (area?.name && area.regions) {
    area.regions.sort((a, b) => {
      let indexOfa = orderer.indexOf(a.name);
      let indexOfb = orderer.indexOf(b.name);

      if (indexOfa < 0) indexOfa = orderer.length;
      if (indexOfb < 0) indexOfb = orderer.length;

      if (indexOfa > indexOfb) return 1;
      if (indexOfa < indexOfb) return -1;
      return 0;
    });
  }

  return (
    <Box className={regionClass}>
      <Box>
        <Text borderBottom={"1px"} borderColor={"gray.700"} fontWeight={"bold"}>
          {area?.name}
        </Text>
      </Box>
      <Flex wrap={"wrap"}>
        {area?.regions.map((region) => {
          return (
            <NextLink href={`/region/${region.id}`} key={region.id}>
              <Button
                m={1}
                variant={"ghost"}
                shadow={
                  "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)"
                }
                colorScheme={"gray"}
                borderWidth={"1px"}
                borderColor={"gray.300"}
                rounded={"lg"}
              >
                {region.name}
              </Button>
            </NextLink>
          );
        })}
      </Flex>
    </Box>
  );
};

export default IndexMapRegion;
