import { Box, chakra, SimpleGrid } from "@chakra-ui/react";
import React from "react";
import StatsCard from "../Core/StatsCard";

interface statisticsProps {
  jobs: number | undefined;
  powerplants: number | undefined;
  users: number | undefined;
}

const Statistics: React.FC<statisticsProps> = ({
  jobs = 0,
  powerplants = 0,
  users = 0,
}) => {
  return (
    <Box maxW="7xl" mx={"auto"} pt={5} px={{ base: 2, sm: 12, md: 17 }} mb={6}>
      <chakra.h1
        textAlign={"center"}
        fontSize={"4xl"}
        py={10}
        fontWeight={"bold"}
      >
        Statistics about the website
      </chakra.h1>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 5, lg: 8 }}>
        <StatsCard title={"Jobs added"} stat={`${jobs} Jobs added`} />
        <StatsCard title={"Users registered"} stat={`${users} Users added`} />
        <StatsCard
          title={"Powerplants Registered"}
          stat={`${powerplants} Powerplants registered`}
        />
      </SimpleGrid>
    </Box>
  );
};

export default Statistics;
