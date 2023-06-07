import { Avatar, Box, HStack, Spacer, Text } from "@chakra-ui/react";
import { UserType } from "../../generated/graphql";

interface ChannelProps {
  receiver:
    | {
        user: {
          id: number;
          email: string;
          userType: UserType;
          solarPowerPlantOwner?:
            | {
                id: number;
                nickname?: string | null;
              }
            | null
            | undefined;
          solarPowerPlantMaintainer?:
            | {
                id: number;
                name: string;
                representative?:
                    |{
                    nickname: string;

                    }
                    | null
                    | undefined
              }
            | null
            | undefined;
        };
      }
    | undefined;
  channelClickHandler: Function;
  channelId: number;
  isActive: boolean;
  unReadCount: number | undefined;
}

const Channel: React.FC<ChannelProps> = ({
  channelId,
  receiver,
  channelClickHandler,
  isActive,
  unReadCount,
}) => {

    console.log("receiver===???",receiver)
  const userType = receiver?.user.userType;
  let imageLocation;
  let name;
  if (userType === UserType.Owner) {
    imageLocation = "/images/icons/chat/owner.png";
    name = receiver?.user.solarPowerPlantOwner?.nickname;
  } else if (userType === UserType.Maintainer) {
    imageLocation = "/images/icons/chat/maintainer.png";
    name = receiver?.user.solarPowerPlantMaintainer?.representative?.nickname;
  } else {
    imageLocation = "/images/icons/square/job.png";
    name = "Unknown";
  }

  return (
    <HStack
      bgColor={isActive ? "orange.200" : "white"}
      onClick={() => channelClickHandler(channelId)}
      p={"2"}
      rounded={"2xl"}
      _hover={{
        bgColor: isActive ? "orange.400" : "gray.200",
        cursor: "pointer",
      }}
    >
      <Avatar name="Name" borderRadius={"xl"} src={imageLocation} bgColor={"unset"} />;
      <Text>{name}</Text>
      <Spacer />
      {unReadCount && unReadCount > 0 ? (
        <Box px={3} py={1} bgColor={"#B50A0A"} rounded={"full"}>
          <Text fontSize={"13px"} textColor={"white"}>
            {unReadCount}
          </Text>
        </Box>
      ) : null}
    </HStack>
  );
};

export default Channel;
