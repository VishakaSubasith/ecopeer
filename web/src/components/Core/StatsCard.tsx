import { Stat, StatLabel, StatNumber } from "@chakra-ui/react";
import React from "react";

interface StatsCardProps {
  title: string;
  stat: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ title, stat }) => {
  return (
    <Stat
      px={{ base: 4, md: 8 }}
      py={"5"}
      shadow={"xl"}
      border={"1px solid"}
      borderColor={"gray.300"}
      rounded={"lg"}
    >
      <StatLabel fontWeight={"medium"} isTruncated>
        {title}
      </StatLabel>
      <StatNumber fontSize={"2xl"} fontWeight={"medium"}>
        {stat}
      </StatNumber>
    </Stat>
  );
};

export default StatsCard;
