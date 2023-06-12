import {
  Box,
  Button,
  Center,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  HStack,
  Select,
  Spacer,
  Spinner,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { BBox } from "geojson";
import GoogleMapReact from "google-map-react";
import React, { useEffect, useRef, useState } from "react";
import { PointFeature } from "supercluster";
import useSupercluster from "use-supercluster";
import Marker from "../../components/Core/Marker";
import MainLayout from "../../components/Layout/MainLayout";
import MapCategoryToggleIcons from "../../components/Map/MapCategoryToggleIcons";
import {
  useExchangeQuery,
  useGetExchangeInformationQuery,
  useGetOffPartyLocationsQuery,
  useGetSeminarLocationsQuery,
  useMapOpenJobsQuery, useOwnerSolarPowerPlantsQuery,
  useRegionQuery,
  useSolarPowerPlantMaintainersQuery, useSolarPowerPlantsOwnerQuery, useUserRatingsQuery,UserType
} from "../../generated/graphql";
import { LatLngPoint,ExchangeInformation } from "../../utils/types";
import { useGetIntId } from "../../utils/useGetIntId";
import { useRouter } from "next/router";
import PowerPlantInfoCard from "../../components/PowerPlant/PowerPlantInfoCard";
import { formatDate } from "../../utils/formaters";
import {log} from "util";
import {loadFeatures} from "framer-motion/types/motion/features/definitions";
import ConfirmationDialog from "../../components/Core/ConfirmationDialog";
import DetailsBox from "../../components/Core/DetailsBox";
import RatingModal from "../../components/User/ratingModal";

interface RegionProps {
  PointFeature: PointFeature<{} | undefined>;
}

const Region: React.FC<RegionProps> = ({}) => {
  const mapRef = useRef<any>();
  const router = useRouter();

  const intId = useGetIntId();

  // Fetch Data
  const [{ data, error, fetching }] = useRegionQuery({
    pause: intId === -1,
    variables: {
      id: intId,
    },
  });
  const [{ data: dataMaintainer }] = useSolarPowerPlantMaintainersQuery();
  const [{ data: exchangeInformation }] = useExchangeQuery();
  const [{ data: dataOwner }] = useSolarPowerPlantsOwnerQuery();
  const [{ data: dataJobs }] = useMapOpenJobsQuery({
    requestPolicy: "cache-and-network",
  });
  console.log("exchangeInformation===>>>>",exchangeInformation)
  console.log("dataOwner===>>>>",dataOwner)

  const commentArr: { owner: string | null | undefined; userID: any; comment: any; lat :any ; lng: any}[] = [];

  // @ts-ignore
  if (exchangeInformation && dataOwner)
  { // @ts-ignore
    for (const ex of exchangeInformation?.getExchangeInformations){
        dataOwner?.solarPowerPlantsOwners.map((owner) =>{
          if(owner.user.id === ex.userId) {
            // @ts-ignore
            commentArr.push({owner:owner.nickname, userID:ex.userId, comment:ex.comment, lat:owner.lat, lng:owner.lng
            })
          }
        })
      }
  }
  console.log("commentArr===>>>>",commentArr)
  // @ts-ignore
  // if (dataOwner.length) {
    // @ts-ignore
    // for (const user of dataOwner?.solarPowerPlantsOwners) {
    //   // @ts-ignore
    //   // eslint-disable-next-line react-hooks/rules-of-hooks
    //   const result = useGetExchangeInformationQuery({
    //     variables: {userId: user.user.id},
    //     // pause: userId === -1,
    //   })
    //
    //   console.log("result====>>>>", result)
    //
    // }
  // }


  const [{ data: dataSeminar }] = useGetSeminarLocationsQuery();
  const [{ data: dataOffParty }] = useGetOffPartyLocationsQuery();



  const defaultCategory = router.query?.defaultCategory as any;
  const queryJobId = router.query?.jobId
    ? parseInt(router.query?.jobId as string)
    : null;
  const {
    isOpen: isOpenJob,
    onOpen: onOpenJob,
    onClose: onCloseJob,
  } = useDisclosure();
  const {
    isOpen: isOpenPowerPlantOwner,
    onOpen: onOpenPowerPlantOwner,
    onClose: onClosePowerPlantOwner,
  } = useDisclosure();
  const {
    isOpen: isOpenPowerPlant,
    onOpen: onOpenPowerPlant,
    onClose: onClosePowerPlant,
  } = useDisclosure();
  const {
    isOpen: isOpenMaintainer,
    onOpen: onOpenMaintianer,
    onClose: onCloseMaintainer,
  } = useDisclosure();



  const [bounds, setBounds] = useState<BBox>([0, 0, 0, 0]);
  const [zoom, setZoom] = useState<number>(11);

  const cities = data?.region.cities;

  const [generatorToggle, setGeneratorToggle] = useState(false);
  const [powerPlantOwnerToggle, setPowerPlantOwnerToggle] = useState(false);
  // const [professionalGeneratorToggle, setProfessionalGeneratorToggle] =
  //   useState(true);
  const [maintainerToggle, setMaintainerToggle] = useState(false);

  const [jobToggle, setJobToggle] = useState(false);
  const [lowVoltagePowerPlantToggle, setLowVoltagePowerPlantToggle] =
    useState(false);
  const [highVoltagePowerPlantToggle, setHighVoltagePowerPlantToggle] =
    useState(false);
  const [seminarToggle, setSeminarToggle] = useState(false);
  const [offPartyToggle, setOffPartyToggle] = useState(false);

  const [currentUserId, setCurrentUserId] = useState<number | null>(null);
  const [currentMaintainerName, setCurrentMaintainerName] = useState<string | null>("");
  const [currentMaintainerAddress, setCurrentMaintainerAddress] = useState<string | null>("");
  // eslint-disable-next-line react-hooks/rules-of-hooks
  // useEffect(()=>{
  //   console.log("dataOwner?.solarPowerPlantsOwners====>>>>", dataOwner?.solarPowerPlantsOwners)
    // @ts-ignore
    // if (dataOwner) {
    //
    //   for (const user of dataOwner?.solarPowerPlantsOwners) {
    //     // @ts-ignore
    //     // eslint-disable-next-line react-hooks/rules-of-hooks
    //     const result = useGetExchangeInformationQuery(user.user.id);
    //
    //     console.log("result====>>>>", result)
    //
    //   }
    // }


  // },[data])

  const categories = {
    発電所オーナー: setGeneratorToggle,
    発電者兼業者: setMaintainerToggle,
    低圧発電所: setLowVoltagePowerPlantToggle,
    高圧発電所: setHighVoltagePowerPlantToggle,
    セミナー: setSeminarToggle,
    オフ会: setOffPartyToggle,
  } as any;

  const [defaultCenter, setDefaultCenter] = useState({ lat: 0, lng: 0 });
  useEffect(() => {
    if (queryJobId && dataJobs?.mapOpenJobs) {
      const defaultJob = dataJobs.mapOpenJobs.find(
        (job) => job.id === queryJobId
      );
      if (defaultJob?.solarPowerPlant.lat && defaultJob.solarPowerPlant.lng)
        setDefaultCenter({
          lat: defaultJob.solarPowerPlant.lat,
          lng: defaultJob.solarPowerPlant.lng,
        });
      onOpenJob();
    } else if (data?.region.cities) {
      setDefaultCenter({
        lat: data?.region.cities[0]["lat"],
        lng: data?.region.cities[0]["lng"],
      });
    }

    // useGetExchangeInformationQuery({
    //   variables: {userId: owner.user.id},
    //   // pause: userId === -1,
    // })


  }, [data]);
  useEffect(() => {
    if (defaultCategory) {
      try {
        categories[defaultCategory](true);
      } catch (error) {
        console.log(error);
        setLowVoltagePowerPlantToggle(true);
        setHighVoltagePowerPlantToggle(true);
      }
    } else {
      setLowVoltagePowerPlantToggle(true);
      setHighVoltagePowerPlantToggle(true);
    }
  }, []);

  // useEffect(()=>{
    // @ts-ignore

  // },[dataOwner])

const userIdArr: number[] = []
  const newDataOwner = dataOwner?.solarPowerPlantsOwners.map((owner)=>{
    console.log("owner===",owner)
    let userId = -1
    if (owner.user.id){

      userIdArr.push(owner.user.id)
      // eslint-disable-next-line react-hooks/rules-of-hooks
      // const [{data: exchangeInformations, fetching: exchangeInformationFetching}] = useGetExchangeInformationQuery({
      //   variables: {userId: owner.user.id},
      //   pause: userId === -1,
      // })
      //
      // // let exchangeInformation: ExchangeInformation | undefined = undefined;
      // // // @ts-ignore
      // // if (!exchangeInformationFetching && exchangeInformations?.getExchangeInformationByUserId) {
      // //   // @ts-ignore
      // //   exchangeInformation = exchangeInformations?.getExchangeInformationByUserId[0];
      // // }
      // console.log("result===>>>",exchangeInformations)
    }
    // eslint-disable-next-line react-hooks/rules-of-hooks

  })

  // console.log("userId array", userIdArr)
  //
  // if (userIdArr.length){
  // userIdArr.map(userId=>{
  //   console.log(userId)
  //   // eslint-disable-next-line react-hooks/rules-of-hooks
  //   const [{data: exchangeInformations, fetching: exchangeInformationFetching}]  = useGetExchangeInformationQuery({
  //     variables: {userId: userId},
  //     pause: userId === -1,
  //   })
  //   console.log("result->>",exchangeInformations)
  //   console.log("exchangeInformationFetching->>",exchangeInformationFetching)
  // })
  // }


  let powerPlants = data
    ? data?.region.solarPowerPlants
        ?.filter(() => generatorToggle)
        .map((powerPlant) => {
          let powerplantType;
          if (powerPlant.totalPowerOutput && powerPlant.totalPowerOutput > 50) {
            powerplantType = "HIGH_VOLTAGE_POWERPLANT";
          } else if (
            powerPlant.totalPowerOutput &&
            powerPlant.totalPowerOutput <= 50
          ) {
            powerplantType = "LOW_VOLTAGE_POWERPLANT";
          } else {
            powerplantType = "POWERPLANT";
          }
          return {
            type: "Feature" as const,
            properties: {
              cluster: false,
              id: powerPlant.id,
              type: powerplantType,
              point_count: undefined,
            },
            geometry: {
              type: "Point" as const,
              coordinates: [
                powerPlant?.lng as number,
                powerPlant?.lat as number,
              ],
            },
          };
        })
    : [];

  // @ts-ignore
  let powerPlantOwners = dataOwner
    ? dataOwner?.solarPowerPlantsOwners
        .filter(() => powerPlantOwnerToggle)
        .map((owner) => {
          return {
            type: "Feature" as const,
            properties: {
              cluster: false,
              id: owner.id,
              type: "OWNER",
              point_count: undefined,
            },
            geometry: {
              type: "Point" as const,
              coordinates: [
                owner?.lng as number,
                owner?.lat as number,
              ],
            },
          };
        })
    : [];
  let powerPlantMaintainers = dataMaintainer
    ? dataMaintainer?.solarPowerPlantMaintainers
        .filter(() => maintainerToggle)
        .map((maintainer) => {
          return {
            type: "Feature" as const,
            properties: {
              cluster: false,
              id: maintainer.id,
              type: "MAINTAINER",
              point_count: undefined,
            },
            geometry: {
              type: "Point" as const,
              coordinates: [
                maintainer?.lng as number,
                maintainer?.lat as number,
              ],
            },
          };
        })
    : [];

  let lowVoltagePowerPlants = data
    ? data?.region.solarPowerPlants
        .filter(
          (solarPowerPlant) =>
            lowVoltagePowerPlantToggle &&
            solarPowerPlant.totalPowerOutput &&
            solarPowerPlant.totalPowerOutput <= 50
        )
        .map((powerPlant) => {
          return {
            type: "Feature" as const,
            properties: {
              cluster: false,
              id: powerPlant.id,
              type: "LOW_VOLTAGE_POWERPLANT",
              point_count: undefined,
            },
            geometry: {
              type: "Point" as const,
              coordinates: [
                powerPlant?.lng as number,
                powerPlant?.lat as number,
              ],
            },
          };
        })
    : [];

  let highVoltagePowerPlants = data
    ? data?.region.solarPowerPlants
        .filter(
          (solarPowerPlant) =>
            highVoltagePowerPlantToggle &&
            solarPowerPlant.totalPowerOutput &&
            solarPowerPlant.totalPowerOutput > 50
        )
        .map((powerPlant) => {
          return {
            type: "Feature" as const,
            properties: {
              cluster: false,
              id: powerPlant.id,
              type: "HIGH_VOLTAGE_POWERPLANT",
              point_count: undefined,
            },
            geometry: {
              type: "Point" as const,
              coordinates: [
                powerPlant?.lng as number,
                powerPlant?.lat as number,
              ],
            },
          };
        })
    : [];

  let jobs = dataJobs
    ? dataJobs.mapOpenJobs
        ?.filter(() => jobToggle)
        .map((job) => ({
          type: "Feature" as const,
          properties: {
            cluster: false,
            id: job.id,
            type: "JOB",
            point_count: undefined,
          },
          geometry: {
            type: "Point" as const,
            coordinates: [job.solarPowerPlant.lng!, job.solarPowerPlant.lat!],
          },
        }))
    : [];

  let seminars = dataSeminar
    ? dataSeminar.getSeminars
        .filter(() => seminarToggle)
        .map((seminar) => ({
          type: "Feature" as const,
          properties: {
            cluster: false,
            id: seminar.id,
            type: "SEMINAR",
            point_count: undefined,
          },
          geometry: {
            type: "Point" as const,
            coordinates: [seminar.lng!, seminar.lat!],
          },
        }))
    : [];

  let offParties = dataOffParty
    ? dataOffParty.getOffParties
        .filter(() => offPartyToggle)
        .map((item) => ({
          type: "Feature" as const,
          properties: {
            cluster: false,
            id: item.id,
            type: "OFF_PARTY",
            point_count: undefined,
          },
          geometry: {
            type: "Point" as const,
            coordinates: [item.lng!, item.lat!],
          },
        }))
    : [];

  const points = [
    ...powerPlants,
    ...powerPlantOwners,
    ...powerPlantMaintainers,
    ...lowVoltagePowerPlants,
    ...highVoltagePowerPlants,
    ...jobs,
    ...seminars,
    ...offParties,
  ];

  const { clusters, supercluster } = useSupercluster({
    points,
    bounds,
    zoom,
    options: { radius: 100, maxZoom: 20 },
  });

  const cityOnChangeHandler = (id: string) => {
    const cityId = parseInt(id);
    if (cityId != -1) {
      const city = cities?.find((city) => city.id === cityId);
      mapRef.current.setZoom(12);
      mapRef.current.panTo({ lat: city?.lat, lng: city?.lng });
    }
  };

  const generatorToggleHandler = () => {
    // setHighVoltagePowerPlantToggle(false);
    // setLowVoltagePowerPlantToggle(false);
    setGeneratorToggle(!generatorToggle);
  };
  const powerPlantOwnerToggleHandler = () => {
    // setHighVoltagePowerPlantToggle(false);
    // setLowVoltagePowerPlantToggle(false);
    setPowerPlantOwnerToggle(!powerPlantOwnerToggle);
  };
  // const professionalGeneratorToggleHandler = () => {
  //   setProfessionalGeneratorToggle(!professionalGeneratorToggle);
  // };
  const maintainerToggleHandler = () => {
    setMaintainerToggle(!maintainerToggle);
  };
  const jobToggleHandler = () => {
    setJobToggle(!jobToggle);
  };

  const lowVoltagePowerPlantToggleHandler = () => {
    // setGeneratorToggle(false);
    setLowVoltagePowerPlantToggle(!lowVoltagePowerPlantToggle);
  };
  const highVoltagePowerPlantToggleHandler = () => {
    // setGeneratorToggle(false);
    setHighVoltagePowerPlantToggle(!highVoltagePowerPlantToggle);
  };

  const seminarToggleHandler = () => setSeminarToggle(!seminarToggle);
  const offPartyToggleHandler = () => setOffPartyToggle((toggle) => !toggle);

  const showMarkerHandler = (location: LatLngPoint) => {
    mapRef.current.setZoom(20);
    mapRef.current.panTo(location);
  };

  const [isOpenDeleteConfirmation, setIsOpenDeleteConfirmation] =
      useState(false);

  const onOpenDeleteConfirmation = () => {
    setIsOpenDeleteConfirmation(true);
  };
  const onCloseDeleteConfirmation = () => {
    setIsOpenDeleteConfirmation(false);
  };


  const forceDeleteHandler = async () => {
    // onOpenDeleteConfirmation();
    // @ts-ignore
    // await deleteUserHandler(currentUserId);
    // // @ts-ignore
    // await forceDelete({ input: { currentUserId } });
    setIsOpenDeleteConfirmation(false);
    // getUsers();
  };
  const getRatings = async (userId: number | null, address:string | null, name : string | null ) => {
    onOpenDeleteConfirmation();

    // eslint-disable-next-line react-hooks/rules-of-hooks
    // const [{ data, fetching }] = useUserRatingsQuery({
    //   variables: { input: { userId } },
    //   pause: userId < 0,
    // });

    setCurrentMaintainerAddress(address)
    setCurrentMaintainerName(name)
    setCurrentUserId(userId);

  };

  // @ts-ignore
  // @ts-ignore
  // @ts-ignore
  return (
    <MainLayout>
      <HStack spacing={["2", "6"]} mb={8}>
        {fetching ? (
          <Center>
            <Spinner size={"lg"} mr={4} />
            <span>
              只今、発電所情報を読み込んでいます。もうしばらくお待ちください。
            </span>
          </Center>
        ) : (
          <Stack direction={["column", "row"]} width={"100%"}>
            <Text
              border={"1px"}
              borderStyle={"solid"}
              borderColor={"inherit"}
              fontSize={"large"}
              shadow={"md"}
              rounded={"xl"}
              px={6}
              py={1}
            >
              {data?.region.name}
            </Text>
            <Button mt={6} onClick={onOpenPowerPlant}>
              発電所の詳細
            </Button>
            <Button mt={6} onClick={onOpenMaintianer}>
              業者の詳細
            </Button>
            <Button mt={6} onClick={onOpenJob}>
              仕事の詳細
            </Button>
            <Button mt={6} onClick={onOpenPowerPlantOwner}>
              発電所オーナーの詳細
            </Button>
            <Spacer />
            <Select
              onChange={(event) => cityOnChangeHandler(event.target.value)}
              w={"xs"}
              rounded={"2xl"}
              shadow={"md"}
            >
              <option value={"-1"}>市町村</option>
              {cities?.map((city) => {
                return (
                  <option value={city.id} key={city.id}>
                    {city.name}
                  </option>
                );
              })}
            </Select>
          </Stack>
        )}
      </HStack>
      <Box
        w={"full"}
        h={[400, 600]}
        shadow={"md"}
        rounded={20}
        overflow={"hidden"}
      >
        <GoogleMapReact
          bootstrapURLKeys={{
            key: process.env.NEXT_PUBLIC_GMAPS_KEY,
            region: "JP",
            language: "ja",
          }}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map }) => {
            mapRef.current = map;
          }}
          defaultCenter={{ lat: 0, lng: 0 }}
          center={defaultCenter}
          defaultZoom={11}
          onChange={({ zoom, bounds }) => {
            setZoom(zoom);
            setBounds([
              bounds.nw.lng,
              bounds.se.lat,
              bounds.se.lng,
              bounds.nw.lat,
            ]);
          }}
          options={{ mapTypeControl: true }}
        >
          {clusters.map((cluster) => {
            const [lng, lat] = cluster.geometry.coordinates;
            const { cluster: isCluster, point_count: pointCount } =
              cluster.properties;

            if (isCluster) {
              return (
                <Marker
                  key={`cluster.${cluster.id}`}
                  lat={lat}
                  lng={lng}
                  variant={"cluster"}
                  pointCount={pointCount}
                  pointsLength={points?.length}
                />
              );
            }
            if (cluster.properties.type === "JOB") {
              return (
                <Marker
                  key={`powerPlant${cluster.properties.id}`}
                  lat={lat}
                  lng={lng}
                  variant={"job"}
                />
              );
            } else if (cluster.properties.type === "MAINTAINER") {
              return (
                <Marker
                  key={`powerPlant${cluster.properties.id}`}
                  lat={lat}
                  lng={lng}
                  variant={"maintainer"}
                />
              );
            } else if (cluster.properties.type === "OWNER") {
              return (
                <Marker
                  key={`powerPlant${cluster.properties.id}`}
                  lat={lat}
                  lng={lng}
                  variant={"owner"}
                />
              );
            } else if (cluster.properties.type === "SEMINAR") {
              return (
                <Marker
                  key={`powerPlant${cluster.properties.id}`}
                  lat={lat}
                  lng={lng}
                  variant={"seminar"}
                />
              );
            } else if (cluster.properties.type === "OFF_PARTY") {
              return (
                <Marker
                  key={`powerPlant${cluster.properties.id}`}
                  lat={lat}
                  lng={lng}
                  variant={"offParty"}
                />
              );
            } else if (cluster.properties.type === "HIGH_VOLTAGE_POWERPLANT") {
              return (
                <Marker
                  key={`powerPlant${cluster.properties.id}`}
                  lat={lat}
                  lng={lng}
                  variant={"highVoltagePowerplant"}
                />
              );
            } else if (cluster.properties.type === "LOW_VOLTAGE_POWERPLANT") {
              return (
                <Marker
                  key={`powerPlant${cluster.properties.id}`}
                  lat={lat}
                  lng={lng}
                  variant={"lowVoltagePowerplant"}
                />
              );
            } else {
              return (
                <Marker
                  key={`powerPlant${cluster.properties.id}`}
                  lat={lat}
                  lng={lng}
                  variant={"powerplant"}
                />
              );
            }
          })}
        </GoogleMapReact>
      </Box>

      <MapCategoryToggleIcons
        generatorToggle={generatorToggle}
        powerPlantOwnerToggle={powerPlantOwnerToggle}
        // professionalGeneratorToggle={professionalGeneratorToggle}
        maintainerToggle={maintainerToggle}
        jobToggle={jobToggle}
        lowVoltagePowerPlantToggle={lowVoltagePowerPlantToggle}
        highVoltagePowerPlant={highVoltagePowerPlantToggle}
        seminarToggle={seminarToggle}
        offPartyToggle={offPartyToggle}
        generatorToggleHandler={generatorToggleHandler}
        powerPlantOwnerToggleHandler={powerPlantOwnerToggleHandler}
        // professionalGeneratorToggleHandler={professionalGeneratorToggleHandler}
        maintainerToggleHandler={maintainerToggleHandler}
        jobToggleHandler={jobToggleHandler}
        lowVoltagePowerPlantToggleHandler={lowVoltagePowerPlantToggleHandler}
        highVoltagePowerPlantHandler={highVoltagePowerPlantToggleHandler}
        seminarToggleHandler={seminarToggleHandler}
        offPartyToggleHandler={offPartyToggleHandler}
      />

      <Drawer
        isOpen={isOpenPowerPlant}
        placement="right"
        onClose={onClosePowerPlant}
        size={"sm"}
      >
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>発電所</DrawerHeader>

            <DrawerBody>
              {data?.region.solarPowerPlants
                .filter((powerPlant) => {
                  // console.log("powerPlant===",powerPlant)
                  const lat = powerPlant.lat;
                  const lng = powerPlant.lng;
                  const [NWLng, SELat, SELng, NWLat] = bounds;
                  if (lat && lng) {
                    return (
                      lat > SELat && lat < NWLat && lng < SELng && lng > NWLng
                    );
                  } else {
                    return false;
                  }
                })
                .slice(0, 10)
                .map((powerPlant) => (
                  <PowerPlantInfoCard
                    key={powerPlant.id}
                    name={powerPlant.name}
                    officialId={powerPlant.officialId}
                    location={powerPlant.location}
                    classification={powerPlant.classification}
                    totalPowerOutput={powerPlant.totalPowerOutput}
                    ownerName={powerPlant.solarPowerPlantOwner?.nickname}
                    // ownerAddress={powerPlant.solarPowerPlantOwner?.address}
                    ownerAddress={""}
                    linked={powerPlant.linked}
                  >
                    <Button
                      mt={2}
                      bgColor={"gray.100"}
                      variant={"shadow"}
                      onClick={() =>
                        showMarkerHandler({
                          lat: powerPlant.lat!,
                          lng: powerPlant.lng!,
                        })
                      }
                    >
                      場所
                    </Button>
                  </PowerPlantInfoCard>
                ))}
            </DrawerBody>

            <DrawerFooter>
              <Button variant="shadow" mr={3} onClick={onClosePowerPlant}>
                閉じる
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>

      <Drawer
        isOpen={isOpenMaintainer}
        placement="right"
        onClose={onCloseMaintainer}
        size={"sm"}
      >
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>業者</DrawerHeader>

            <DrawerBody>
              {dataMaintainer?.solarPowerPlantMaintainers
                .filter((maintainer) => {
                  const lat = maintainer.lat;
                  const lng = maintainer.lng;
                  const [NWLng, SELat, SELng, NWLat] = bounds;
                  if (lat && lng) {
                    return (
                      lat > SELat && lat < NWLat && lng < SELng && lng > NWLng
                    );
                  } else {
                    return false;
                  }
                })
                .slice(0, 10)
                .map((maintainer) => (
                  <Box
                    key={maintainer.id}
                    shadow={"md"}
                    p={4}
                    rounded={"lg"}
                    mb={2}
                  >
                    <Text>{maintainer.name}</Text>
                    <Text>{maintainer.intro}</Text>
                    <Text>{maintainer.address}</Text>
                    {/* <Text>{maintainer.phoneNumber}</Text> */}
                    {/* <Text>{maintainer.address}</Text> */}
                    <Button
                      variant={"shadow"}
                      onClick={() =>
                        showMarkerHandler({
                          lat: maintainer.lat!,
                          lng: maintainer.lng!,
                        })
                      }
                    >
                     Show
                    </Button>
                    <Button
                      variant={"shadow"}
                      backgroundColor={"blue"}
                      color={"white"}
                      onClick={() => getRatings(maintainer?.user?.id ? maintainer?.user?.id : null,
                          maintainer?.address ? maintainer?.address:null,
                          maintainer.name
                      )}
                      // onClick={() =>
                      //   showMarkerHandler({
                      //     lat: maintainer.lat!,
                      //     lng: maintainer.lng!,
                      //   })
                      // }
                    >
                      評価
                    </Button>
                    <Button
                      variant={"shadow"}
                      backgroundColor={"blue"}
                      color={"white"}
                      onClick={() => router.push("/chat")
                        // showMarkerHandler({
                        //   lat: maintainer.lat!,
                        //   lng: maintainer.lng!,
                        // })
                      }
                    >
                      チャット

                    </Button>
                  </Box>
                ))}
            </DrawerBody>

            <DrawerFooter>
              <Button variant="shadow" mr={3} onClick={onCloseMaintainer}>
                閉じる
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>

      <Drawer isOpen={isOpenJob} placement="right" onClose={onCloseJob}>
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>お仕事</DrawerHeader>

            <DrawerBody>
              {dataJobs?.mapOpenJobs
                .filter((job) => {
                  const lat = job.solarPowerPlant.lat;
                  const lng = job.solarPowerPlant.lng;
                  const [NWLng, SELat, SELng, NWLat] = bounds;
                  if (lat && lng) {
                    return (
                      lat > SELat && lat < NWLat && lng < SELng && lng > NWLng
                    );
                  } else {
                    return false;
                  }
                })
                .slice(0, 10)
                .map((job) => (
                  <Box
                    key={job.id}
                    shadow={"md"}
                    p={4}
                    rounded={"lg"}
                    mb={2}
                    border={queryJobId === job.id ? "3px solid" : "none"}
                    borderColor={"ecoBlue"}
                  >
                    <Text>No: {job.id}</Text>
                    <Text>{job.title}</Text>
                    {/* <Text>{job.status}</Text> */}
                    <Text>{job.category}</Text>
                    <Text>{formatDate(job.applicationDeadline)}</Text>
                    <Text>{job.shortDescription}</Text>
                    {/* <Text>{job.budget}</Text>
                    <Text>{job.location}</Text>
                    <Text>{job.solarPowerPlant.totalPowerOutput}</Text> */}
                    <Button
                      variant={"shadow"}
                      height={"min"}
                      onClick={() =>
                        showMarkerHandler({
                          lat: job.solarPowerPlant.lat!,
                          lng: job.solarPowerPlant.lng!,
                        })
                      }
                    >
                      場所
                    </Button>
                    <Button
                      variant={"shadow"}
                      height={"min"}
                      onClick={() => router.push(`/job?jobId=${job.id}`)}
                    >
                      内容確認
                    </Button>
                  </Box>
                ))}
            </DrawerBody>

            <DrawerFooter>
              <Button variant="shadow" mr={3} onClick={onCloseJob}>
                閉じる
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
      <Drawer isOpen={isOpenPowerPlantOwner} placement="right" onClose={onClosePowerPlantOwner}>
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>発電所のオーナー</DrawerHeader>

            <DrawerBody>
              {commentArr
                  .filter((owner) => {
                    return owner.userID !== 1
                  })
                  .slice(0, 10)
                  .map((owner) => (


                      <Box
                          key={owner.userID}
                          shadow={"md"}
                          p={4}
                          rounded={"lg"}
                          mb={2}
                          border={queryJobId === owner.userID ? "3px solid" : "none"}
                          borderColor={"ecoBlue"}
                      >
                        <Text>ニックネーム: {owner.owner}</Text>
                        <Text>一言コメント:{owner.comment} </Text>
                        {/* eslint-disable-next-line react-hooks/rules-of-hooks */}
                        <Text>{

                          // eslint-disable-next-line react-hooks/rules-of-hooks
                          // useGetExchangeInformationQuery({
                          //   variables: {userId: owner.user.id},
                          //   // pause: userId === -1,
                          // })

                        }</Text>
                    {/*    /!* <Text>{job.status}</Text> *!/*/}
                    {/*    <Text>{job.category}</Text>*/}
                    {/*    <Text>{formatDate(job.applicationDeadline)}</Text>*/}
                    {/*    <Text>{job.shortDescription}</Text>*/}
                    {/*    /!* <Text>{job.budget}</Text>*/}
                    {/*<Text>{job.location}</Text>*/}
                    {/*<Text>{job.solarPowerPlant.totalPowerOutput}</Text> *!/*/}
                        <Button
                            variant={"shadow"}
                            height={"min"}
                            onClick={() =>
                                showMarkerHandler({
                                  lat: owner.lat!,
                                  lng: owner.lng!,
                                })
                            }
                        >
                          Show
                        </Button>
                    {/*    <Button*/}
                    {/*        variant={"shadow"}*/}
                    {/*        height={"min"}*/}
                    {/*        onClick={() => router.push(`/job?jobId=${job.id}`)}*/}
                    {/*    >*/}
                    {/*      内容確認*/}
                    {/*    </Button>*/}
                      </Box>
               ))}
            </DrawerBody>

            <DrawerFooter>
              <Button variant="shadow" mr={3} onClick={onClosePowerPlantOwner}>
                閉じる
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>

      <RatingModal
          isOpen={isOpenDeleteConfirmation}
          onClose={onCloseDeleteConfirmation}
          userId={currentUserId}
          maintainerName={currentMaintainerName}
          maintainerAddress={currentMaintainerAddress}
          userType={UserType.Maintainer}
          // onConfirmHandler={forceDeleteHandler}

      />
    </MainLayout>
  );
};

export default Region;
