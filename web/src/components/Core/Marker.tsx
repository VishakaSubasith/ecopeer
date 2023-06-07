import { Image, Box, Flex } from "@chakra-ui/react";

interface MarkerProps {
  key?: string;
  lat: number;
  lng: number;
  draggable?: boolean;
  variant:
    | "owner"
    | "powerplant"
    | "highVoltagePowerplant"
    | "lowVoltagePowerplant"
    | "cluster"
    | "job"
    | "maintainer"
    | "seminar"
    | "offParty";
  pointCount?: number;
  pointsLength?: number;
}

const imageMap = {
  owner: "/images/icons/owner.png",
  powerplant: "/images/icons/owner.png",
  highVoltagePowerplant: "/images/icons/highVoltagePowerplant.png",
  lowVoltagePowerplant: "/images/icons/lowVoltagePowerplant.png",
  job: "/images/icons/job.png",
  maintainer: "/images/icons/maintainer.png",
  seminar: "/images/icons/seminar.png",
  offParty: "/images/icons/offParty.png",
};

const Marker: React.FC<MarkerProps> = ({
  key,
  lat,
  lng,
  draggable,
  variant,
  pointCount = 0,
  pointsLength = 0,
}) => {
  let markerIcon;

  if (variant === "cluster") {
    markerIcon = (
      <Flex
        rounded={"full"}
        color={"white"}
        width={25 + (pointCount / pointsLength) * 10 + "px"}
        height={25 + (pointCount / pointsLength) * 10 + "px"}
        backgroundColor={"blue.700"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        {pointCount}
      </Flex>
    );
  } else if (
    variant === "highVoltagePowerplant" ||
    variant === "lowVoltagePowerplant"
  ) {
    markerIcon = (
      <Image src={imageMap[variant]} width={"40px"} height={"40px"} alt="" />
    );
  } else {
    markerIcon = (
      <Image
        // rounded={"md"}
        // shadow={"lg"}
        // border={"1px"}
        // borderColor={"gray.500"}
        src={imageMap[variant]}
        width={"40px"}
        height={"40px"}
        alt=""
      />
    );
  }
  return <Box key={key}>{markerIcon}</Box>;
};

export default Marker;
