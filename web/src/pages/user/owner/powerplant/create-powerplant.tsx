import { Form, Formik } from "formik";
import React, {useEffect, useRef, useState} from "react";
import InputField from "../../../../components/Core/InputField";
import MainLayout from "../../../../components/Layout/MainLayout";
import {
    Box,
    SimpleGrid,
    GridItem,
    Stack,
    Button,
    Text,
    Heading, Input, HStack,
} from "@chakra-ui/react";
import SelectInputField from "../../../../components/Core/Input/SelectInputField";
import {
  useCreateSolarPowerPlantMutation,
  useFormRegionsQuery,
} from "../../../../generated/graphql";
import GMapAutoComplet from "../../../../components/Core/Input/GMapAutoComplet";
import { useRouter } from "next/router";
import GoogleMapReact from "google-map-react";
import Marker from "../../../../components/Core/Marker";
import {Link} from "@chakra-ui/layout";

interface createPowerplantProps {}

interface errorFormFields {
  name?: string;
  location?: string;
  regionId?: string;
  cityId?: string;
  lat?: string;
  lng?: string;
  classification?: string;
  totalPowerOutput?: string;
}
// @ts-ignore
const CreatePowerplant: React.FC<createPowerplantProps> = ({}) => {
  const [{ data: dataRegions }] = useFormRegionsQuery();
  const [, createPowerPlant] = useCreateSolarPowerPlantMutation();
  const router = useRouter();
    const count = useRef(0);
    // States
    const [mapCenter, setMapCenter] = useState({
        lat: 37.846877,
        lng: 137.5557178,
    });
    const [markerCenter, setMarkerCenter] = useState({
        lat: 35.6681625,
        lng: 139.6007821,
    });
    const [companyAddress, setCompanyAddress] = useState("");
    const [zoom, setZoom] = useState(6);    const searchBox = useRef(null);
  const regionOptions =
    dataRegions?.regions.map((region) => ({
      value: region.id,
      label: region.name,
    })) || [];

  // if (regionOptions.length <= 0){
  //     setTimeout(()=>window.location.reload(),3000)
  // }





    // Google maps handlers

    let searchInput: any;
    const onPlacesChanged = () => {
        const places = searchInput.getPlaces();
        if (places.length > 0) {
            const place = places[0];
            const location = place.geometry.location;
            const cordinates = { lat: location.lat(), lng: location.lng() };
            setMarkerCenter(cordinates);
            setMapCenter(cordinates);
            setCompanyAddress(place.formatted_address);
            setZoom(20);
        }
    };
    const handleApiLoaded = (map: any, maps: any) => {
        searchInput = new maps.places.SearchBox(searchBox.current);
        searchInput.addListener("places_changed", onPlacesChanged);
    };


    const getCityOptions = (currentRegionId: number) => {
    const region = dataRegions?.regions.filter(
      (region) => region.id === currentRegionId
    );
    if (region && region?.length > 0) {
      return (
        region[0].cities.map((city) => ({
          value: city.id,
          label: city.name,
        })) || []
      );
    }

    return [];
  };

    const mapSelection = (
        variant:
            | "owner"
            | "maintainer"
            | "powerplant"
            | "highVoltagePowerplant"
            | "lowVoltagePowerplant"
            | "cluster"
            | "job"
            | "seminar"
            | "offParty"
    ) => (
        <>

            <Input
                type="text"
                id="companyAddress"
                value={companyAddress}
                onChange={(e) => setCompanyAddress(e.target.value)}
                name="companyAddress"
                ref={searchBox}

            />
            <Box
                maxWidth={"full"}
                h={["sm", "md", "xl"]}
                my={2}
                rounded={"xl"}
                overflow={"hidden"}
            >
                <GoogleMapReact
                    bootstrapURLKeys={{
                        key: process.env.NEXT_PUBLIC_GMAPS_KEY,
                        region: "JP",
                        language: "ja",
                        libraries: "places",
                    }}
                    yesIWantToUseGoogleMapApiInternals
                    onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
                    defaultCenter={{
                        lat: 37.846877,
                        lng: 137.5557178,
                    }}
                    defaultZoom={6}
                    zoom={zoom}
                    center={mapCenter}
                    options={{ mapTypeControl: true }}
                    draggable={true}
                >
                    <Marker
                        lat={markerCenter.lat}
                        lng={markerCenter.lng}
                        variant={variant}
                    />
                </GoogleMapReact>
            </Box>
        </>
    );



    return (
    <MainLayout showSidebar>
      <Box
        border="1px"
        borderColor={"gray.100"}
        shadow={"xl"}
        mt={[8, 20]}
        mb={[8, 20]}
        rounded={"2xl"}
        minWidth={["xs", "2xl"]}
        // maxWidth={{base: "xs", md: "unset"}}
      >
        <Formik
          initialValues={{
            name: "",
            location: "",
            regionId: { label: "", value: "" },
            cityId: { label: "", value: "" },
            lat: 37.846877,
            lng: 137.5557178,
            classification: "",
            totalPowerOutput: 0,
          }}
          validate={(values) => {
            const errors: errorFormFields = {};
            if (!values.name) {
              errors.name = "発電所の名前を入力してください";
            }
            if (!values.regionId.value) {
              errors.regionId = "地域を選択してください";
            }
            if (!values.cityId.value) {
              errors.cityId = "都市を選択してください";
            }
            // if (!values.location || !values.lat || !values.lng) {
            //   errors.name = "無効なアドレス"
            // }
            return errors;
          }}
          onSubmit={async (values, { setErrors }) => {
            const cityId = parseInt(values.cityId.value);
            const regionId = parseInt(values.regionId.value);
            // const totalPowerOutput = parseFloat(values.totalPowerOutput)
            // await createPowerPlant({ input: { ...values, cityId, regionId } });
              // @ts-ignore
              await createPowerPlant({input:{cityId,regionId,classification:values?.classification, lat:markerCenter.lat,lng:markerCenter.lng,location:companyAddress,name:values.name,totalPowerOutput:values.totalPowerOutput}})
            router.push("/user/owner/powerplant");
          }}
        >
          {({ values, isSubmitting }) => (
            <Form>
              <Box p={10} mt={[10, 0]}>
                <Stack
                  px={4}
                  py={5}
                  p={[null, 6]}
                  bg={"white"}
                  spacing={6}
                  rounded={"lg"}
                >
                  <Heading>新しい発電所を作成する</Heading>
                  <SimpleGrid columns={6} spacing={6}>
                    <Box as={GridItem} colSpan={6}>
                      <InputField name="name" label="名前" />
                    </Box>

                    <Box as={GridItem} colSpan={[6, 3]}>
                      <SelectInputField
                        name="regionId"
                        label="領域"
                        optionValues={regionOptions}
                      />
                    </Box>
                    <Box as={GridItem} colSpan={[6, 3]}>
                      <SelectInputField
                        name="cityId"
                        label="市"
                        optionValues={getCityOptions(parseInt(values.regionId.value))}
                      />
                    </Box>

                    <Box as={GridItem} colSpan={6}>
                      {/*<GMapAutoComplet*/}
                      {/*  name="location"*/}
                      {/*  label="住所"*/}
                      {/*  helperText="* 必須"*/}
                      {/*/>*/}
                        <HStack>
                            <Text>住所</Text>
                            <HStack>
                                <Link color={"#3366CC"}  href='#' onClick={()=> window.location.reload()} >地図が見にくい方はこちらのボタンをクリックしてください</Link>
                            </HStack>

                        </HStack>
                        {mapSelection("highVoltagePowerplant")}
                    </Box>

                    <Box as={GridItem} colSpan={[6, 4]}>
                      <InputField name="classification" label="分類" />
                    </Box>

                    <Box as={GridItem} colSpan={[6, 6, null, 3]}>
                      <InputField
                        name="totalPowerOutput"
                        label="総出力"
                        type={"number"}
                      />
                    </Box>
                  </SimpleGrid>
                </Stack>
                <Box
                  px={{ base: 4, sm: 6 }}
                  py={3}
                  bg={"gray.50"}
                  textAlign="right"
                >
                  <Button
                    isLoading={isSubmitting}
                    type="submit"
                    colorScheme="orange"
                    _focus={{ shadow: "" }}
                    fontWeight="md"
                  >
                    保存
                  </Button>
                </Box>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    </MainLayout>
  );
};

export default CreatePowerplant;
