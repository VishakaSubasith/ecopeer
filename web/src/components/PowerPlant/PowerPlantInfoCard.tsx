import React from "react";
import { Box, Flex, HStack, Icon, Spacer, Text } from "@chakra-ui/react";
import { FaSolarPanel, FaMapPin, FaAddressCard } from "react-icons/fa";
import { BsLightningFill } from "react-icons/bs";

interface PowerPlantInfoCardProps {
  officialId?: string | null | undefined;
  name?: string;
  location?: string | null | undefined;
  classification?: string | null | undefined;
  totalPowerOutput?: number | null | undefined;
  ownerName?: string | null | undefined;
  ownerAddress?: string | undefined;
  linked: boolean | null | undefined;
}

const PowerPlantInfoCard: React.FC<PowerPlantInfoCardProps> = ({
  officialId,
  classification,
  location,
  name,
  ownerAddress,
  ownerName,
  totalPowerOutput,
  linked,
  children,
}) => {
  return (
    <Flex
      direction={"column"}
      shadow={"md"}
      py={4}
      px={6}
      rounded={"xl"}
      mb={4}
      border={"1px"}
      borderColor={"gray.300"}
    >
      <Box>
        <HStack alignItems={"flex-start"}>
          <Text fontSize={"2xl"} fontWeight={"bold"}>
            {officialId}
          </Text>
          <Spacer />
          <Text
            ml="auto"
            rounded={"lg"}
            p={1}
            bgColor={"orange.500"}
            color={"white"}
            fontSize={"sm"}
            fontWeight={"bold"}
          >
            {classification}
          </Text>
          {/*<Text*/}
          {/*    ml="auto"*/}
          {/*    rounded={"lg"}*/}
          {/*    p={1}*/}
          {/*    bgColor={"blue.500"}*/}
          {/*    color={"white"}*/}
          {/*    fontSize={"sm"}*/}
          {/*    fontWeight={"bold"}*/}
          {/*>*/}
          {/*  【所有者情報】*/}
          {/*</Text>*/}
          {linked && (
            <Text
              ml="auto"
              rounded={"lg"}
              p={1}
              bgColor={"blue.500"}
              color={"white"}
              fontSize={"sm"}
              fontWeight={"bold"}
            >
              リンク
            </Text>
          )}
        </HStack>
        <Text py={3} color={"gray.700"}>
          {location}
        </Text>
        <HStack>
          <Text>【所有者情報】</Text>
        </HStack>
        {name ? (
          <HStack>
            <Icon fontSize="16" as={FaSolarPanel} />
            <Text>{name}</Text>
          </HStack>
        ) : null}
        {ownerAddress ? (
          <HStack>
            <Icon fontSize="16" as={FaMapPin} />
            <Text>{ownerAddress}</Text>
          </HStack>
        ) : null}
        {totalPowerOutput ? (
          <HStack>
            <Icon fontSize="16" as={BsLightningFill} />
            <Text>{totalPowerOutput} kw</Text>
          </HStack>
        ) : null}
        {ownerName ? (
          <HStack>
            <Icon fontSize="16" as={FaAddressCard} />
            <Text>{ownerName}</Text>
          </HStack>
        ) : null}
      </Box>

      <Box p={5}>{children}</Box>
    </Flex>
  );
};

export default PowerPlantInfoCard;
