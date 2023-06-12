import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  Spinner,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  HStack,
  Image,
  useToast,
  SimpleGrid,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import MainLayout from "../../../../components/Layout/MainLayout";
import {
  SolarPowerPlant,
  useDisassociatePowerPlantMutation,
  useOwnerSolarPowerPlantsQuery,
  useUpdatePowerplantMutation,
} from "../../../../generated/graphql";
import NextLink from "next/link";
import GoogleMapReact from "google-map-react";
import PowerPlantInfoCard from "../../../../components/PowerPlant/PowerPlantInfoCard";

interface myPowerplantsProps {
  solarPowerPlant: ({
    __typename?: "SolarPowerPlant" | undefined;
  } & Pick<
    SolarPowerPlant,
    "lat" | "lng" | "id" | "officialId" | "location"
  >)[];
}

const OwnerPowerplants: React.FC<myPowerplantsProps> = ({}) => {
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [
    { data: dataPowerPlants, fetching: fetchingPowerPlants },
    fetchPlants,
  ] = useOwnerSolarPowerPlantsQuery();

  const inputOnChangeHandler = (searchTerm: string) => {
    setSearchKeyword(searchTerm);
    let searchResult =
      dataPowerPlants?.ownerSolarPowerPlants.solarPowerPlants.filter(
        (powerPlant) => powerPlant.officialId?.includes(searchKeyword)
      );
  };

  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const changeLocationOnClickHandler = (
    id: number,
    lat: number,
    lng: number,
    name: string
  ) => {
    setMapCenter({ lat: lat, lng: lng });
    setMarkerCenter({ lat: lat, lng: lng });
    setCurrentPowerPlantId(id);
    setPowerPlantName(name);
    onOpen();
  };

  const [mapCenter, setMapCenter] = useState({ lat: 0, lng: 0 });
  const [markerCenter, setMarkerCenter] = useState({ lat: 0, lng: 0 });
  const [mapDraggable, setMapDraggable] = useState(true);
  const [currentPowerPlantId, setCurrentPowerPlantId] = useState(0);
  const [powerPlantName, setPowerPlantName] = useState("");

  const Marker = (props: any) => (
    <Image
      src={`/images/icons/owner.png`}
      width={"30px"}
      height={"30px"}
      borderRadius={"0%"}
      alt="marker"
    />
  );

  const onMouseDown = (childKey: any, childProps: any, mouse: any) => {
    setMapDraggable(false);
  };

  const onMouseMove = (
    childKey: any,
    childProps: any,
    mouse: React.SetStateAction<{ lat: number; lng: number }>
  ) => {
    setMarkerCenter(mouse);
  };

  const onMouseUp = (
    childKey: any,
    childProps: any,
    mouse: React.SetStateAction<{ lat: number; lng: number }>
  ) => {
    setMapCenter(mouse);
    setMarkerCenter(mouse);
    setMapDraggable(true);
  };

  const [, updatePowerplant] = useUpdatePowerplantMutation();
  const [, removePowerPlant] = useDisassociatePowerPlantMutation();

  const saveNewLocationOnClickHandler = async () => {
    const res = await updatePowerplant({
      lat: markerCenter.lat,
      lng: mapCenter.lng,
      name: powerPlantName,
      solarPowerPlantId: currentPowerPlantId,
    });
    onClose();
    fetchPlants({ requestPolicy: "network-only" });
  };

  const deletePowerPlantHandler = async (powerPlantId: number) => {
    const res = await removePowerPlant({ input: { powerPlantId } });
    if (res.data?.disassociatePowerPlant.status) {
      toast({
        title: "成功しました",
        description: "発電所を削除できました",
        position: "top-right",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    } else {
      toast({
        title: "失敗しました",
        description: "発電所を削除できませんでした",
        position: "top-right",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
    fetchPlants({ requestPolicy: "network-only" });
  };

  const ownerInfo = dataPowerPlants?.ownerSolarPowerPlants;
  return (
    <MainLayout showSidebar>
      <Heading>My発電所</Heading>
      <HStack justifyContent={"flex-end"} alignItems={"flex-end"}>
        <VStack>
          {/* <Text color={"ecoOrange"}>Coming soon</Text> */}
          <NextLink href={"/user/owner/powerplant/create-powerplant"}>
          <Button 
          // disabled
          > 
            システム改修
          </Button>
          </NextLink> 
        </VStack>
        <NextLink passHref href={"/user/owner/powerplant/add-existing"}>
          <Button>設備認定ＩＤから探して新規登録</Button>
        </NextLink>
      </HStack>
      <Box my={5} w={"full"} h={500} rounded={"lg"}>
        <GoogleMapReact
          bootstrapURLKeys={{
            key: "AIzaSyChJRkBEs1W_dUTSmDso2LJSp8CZAt9B18",
          }}
          defaultCenter={{
            lat: 37.6681625,
            lng: 139.6007836,
          }}
          defaultZoom={6}
          options={{ mapTypeControl: true }}
          draggable={mapDraggable}
        >
          {dataPowerPlants?.ownerSolarPowerPlants.solarPowerPlants.map(
            (powerPlant, index) => (
              <Marker key={index} lat={powerPlant.lat} lng={powerPlant.lng} />
            )
          )}
        </GoogleMapReact>
      </Box>
      <Flex direction={"row"} justifyContent={"center"} my={6}>
        <Flex direction={"row"} justifyContent={"space-between"}>
          <Input
            placeholder={"フリーワード検索"}
            rounded={"2xl"}
            shadow={"md"}
            value={searchKeyword}
            width={"md"}
            onChange={(event) => inputOnChangeHandler(event.target.value)}
          />
          <Button
            ml={4}
            rounded={"2xl"}
            onClick={(event) => {
              console.log(searchKeyword);
            }}
          >
            検索
          </Button>
        </Flex>
      </Flex>

      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={3}>
        {fetchingPowerPlants ? (
          <Flex justifyContent={"center"} alignItems={"center"} m={1}>
            <Spinner size={"lg"} />
          </Flex>
        ) : (
          dataPowerPlants?.ownerSolarPowerPlants.solarPowerPlants
            ?.filter((powerplant) => {
              if (searchKeyword) {
                return (
                  powerplant.officialId?.includes(searchKeyword) ||
                  powerplant.location?.includes(searchKeyword)
                );
              } else {
                return true;
              }
            })
            .map((solarPowerPlant) => {
              return (
                <PowerPlantInfoCard
                  key={solarPowerPlant.id}
                  name={solarPowerPlant.name}
                  officialId={solarPowerPlant.officialId}
                  location={solarPowerPlant.location}
                  classification={solarPowerPlant.classification}
                  totalPowerOutput={solarPowerPlant.totalPowerOutput}
                  ownerName={dataPowerPlants?.ownerSolarPowerPlants.nickname}
                  linked={solarPowerPlant.linked}
                >
                  <HStack p={5}>
                    <Button
                      onClick={() =>
                        changeLocationOnClickHandler(
                          solarPowerPlant.id,
                          solarPowerPlant.lat as number,
                          solarPowerPlant.lng as number,
                          solarPowerPlant.name
                        )
                      }
                    >
                      編集
                    </Button>
                    <NextLink passHref href={`/powerplant/${solarPowerPlant.id}`}>
                      <Button disabled>詳細を表示</Button>
                    </NextLink>
                    <Button
                      onClick={() =>
                        deletePowerPlantHandler(solarPowerPlant.id)
                      }
                      colorScheme={"red"}
                    >
                      消去
                    </Button>
                  </HStack>
                </PowerPlantInfoCard>
              );
            })
        )}
      </SimpleGrid>

      <Modal
        closeOnOverlayClick={false}
        isOpen={isOpen}
        size={"4xl"}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign={"center"}>編集</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Text fontWeight={"bold"} fontSize={"lg"}>
              地域を変更
            </Text>
            <Box maxWidth={"full"} h={["sm", "md", "xl"]}>
              <GoogleMapReact
                bootstrapURLKeys={{
                  key: process.env.NEXT_PUBLIC_GMAPS_KEY,
                  region: "JP",
                  language: "ja",
                }}
                defaultCenter={mapCenter}
                defaultZoom={11}
                options={{ mapTypeControl: true }}
                draggable={mapDraggable}
                onChildMouseDown={onMouseDown}
                onChildMouseMove={onMouseMove}
                onChildMouseUp={onMouseUp}
              >
                <Marker lat={markerCenter.lat} lng={markerCenter.lng} />
              </GoogleMapReact>
            </Box>
            <Text>発電所名をつける(任意）</Text>
            <Input
              onChange={(e) => setPowerPlantName(e.target.value)}
              value={powerPlantName}
            />
          </ModalBody>

          <ModalFooter>
            <Button
              onClick={saveNewLocationOnClickHandler}
              colorScheme="blue"
              mr={3}
            >
              保存
            </Button>
            <Button onClick={onClose}>閉じる</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </MainLayout>
  );
};

export default OwnerPowerplants;
