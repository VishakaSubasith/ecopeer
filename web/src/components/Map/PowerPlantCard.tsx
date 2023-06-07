import { Box, Button, Text } from "@chakra-ui/react";
import React from "react";
import { SolarPowerPlant, SolarPowerPlantOwner } from "../../generated/graphql";
import { LatLngPoint } from "../../utils/types";

interface PowerPlantCardProps {
  item: Pick<
    SolarPowerPlant,
    | "officialId"
    | "location"
    | "totalPowerOutput"
    | "classification"
    | "lat"
    | "lng"
  > & {
    solarPowerPlantOwner: Pick<SolarPowerPlantOwner, "nickname">;
  };
  showMarkerHandler: (location: LatLngPoint) => void;
}

const PowerPlantCard: React.FC<PowerPlantCardProps> = ({
  item: powerPlant,
  showMarkerHandler,
}) => {
  return (
    <Box shadow={"md"} p={4} rounded={"lg"} mb={2}>
      <Text>{powerPlant.officialId}</Text>
      <Text>{powerPlant.classification}</Text>
      <Text>{powerPlant.location}</Text>
      <Text>{powerPlant.solarPowerPlantOwner.nickname}</Text>
      <Text>
        {powerPlant.totalPowerOutput ? powerPlant.totalPowerOutput : 0}
      </Text>
      <Button
        variant={"outline"}
        onClick={() =>
          showMarkerHandler({ lat: powerPlant.lat!, lng: powerPlant.lng! })
        }
      >
        場所
      </Button>
    </Box>
  );
};

export default PowerPlantCard;
