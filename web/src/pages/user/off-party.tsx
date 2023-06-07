import {
  Box,
  Heading,
  HStack,
  Button,
  useToast,
  Input,
  FormLabel,
} from "@chakra-ui/react";
import { Formik, Form } from "formik";
import React, { useRef, useState } from "react";
import { useRouter } from "next/router";
import InputTextArea from "../../components/Core/Input/InputTextArea";
import InputField from "../../components/Core/InputField";
import MainLayout from "../../components/Layout/MainLayout";
import { useCreateOffPartyMutation, useCreateSeminarMutation } from "../../generated/graphql";
import GoogleMapReact from "google-map-react";
import { MarkerLocationSelection } from "../../components/Core/Markers/MarkerLocationSelection";

interface OffPartyProps {}

const OffParty: React.FC<OffPartyProps> = ({}) => {
  const router = useRouter();
  const [, createOffParty] = useCreateOffPartyMutation();
  const toast = useToast();

  // Gmap

  // States
  const [mapCenter, setMapCenter] = useState({
    lat: 37.846877,
    lng: 137.5557178,
  });
  const [markerCenter, setMarkerCenter] = useState({
    lat: 35.6681625,
    lng: 139.6007821,
  });
  const [location, setLocation] = useState("");
  const [zoom, setZoom] = useState(6);

  const searchBox = useRef(null);

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
      setLocation(place.formatted_address);
      setZoom(20);
    }
  };
  const handleApiLoaded = (map: any, maps: any) => {
    searchInput = new maps.places.SearchBox(searchBox.current);
    searchInput.addListener("places_changed", onPlacesChanged);
  };

  // Gmap

  return (
    <MainLayout>
      <Box
        shadow={"lg"}
        px={[10, 30]}
        py={[5, 10]}
        my={[5, 20]}
        rounded={"lg"}
        maxWidth={["xs", "4xl"]}
        mx={"auto"}
      >
        <Heading>セミナーを開催されたい方は、</Heading>
        <Heading mb={"60px"}>下記入力フォームより入力してください。</Heading>
        <Formik
          initialValues={{
            dateAndTime: "",
            address: "",
            lat: 0,
            lng: 0,
            venue: "",
            access: "",
            price: 0,
            form: "",
            belongings: "",
            clothing: "",
            precautions: "",
            cacellationRules: "",
            content: "",
          }}
          validate={(values) => {
            const errors = {};
            return errors;
          }}
          onSubmit={async (values, { setErrors }) => {
            values.address = location;
            values.lat = markerCenter.lat;
            values.lng = markerCenter.lng;
            await createOffParty({ input: values });
            toast({
              title: "成功",
              description: "オフ会を作成しました",
              position: "top-right",
              status: "success",
              duration: 9000,
              isClosable: true,
            });
            router.push("/user/dashboard");
          }}
        >
          {({ isSubmitting, values, setFieldValue, errors }) => (
            <Form>
              <InputField label="開催日時" type="date" name="dateAndTime" />

              {/* Gmap */}
              <FormLabel htmlFor={"address"} mb="0">
                開催住所
              </FormLabel>
              <Input
                type="text"
                id={"address"}
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                name={"address"}
                ref={searchBox}
              />
              <Box
                maxWidth={"full"}
                h={["sm", "md", "xl"]}
                my={2}
                rounded={"xl"}
                overflow={"hidden"}
              >
      {/* @ts-expect-error Server Component */}
                <GoogleMapReact
                  bootstrapURLKeys={{
                    key: process.env.NEXT_PUBLIC_GMAPS_KEY,
                    region: "JP",
                    language: "ja",
                    libraries: "places",
                  }}
                  yesIWantToUseGoogleMapApiInternals
                  onGoogleApiLoaded={({ map, maps }) =>
                    handleApiLoaded(map, maps)
                  }
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
                  <MarkerLocationSelection
                    lat={markerCenter.lat}
                    lng={markerCenter.lng}
                  />
                </GoogleMapReact>
              </Box>

              {/* Gmap */}

              <InputField
                name="venue"
                placeholder="開催場所"
                label="開催場所"
              />

              <InputField
                name="access"
                placeholder="アクセス"
                label="アクセス"
              />

              <InputField
                type="number"
                name="price"
                placeholder="料金"
                label="料金"
              />

              <InputField name="form" placeholder="形式" label="形式" />
              <InputField
                name="belongings"
                placeholder="持ち物"
                label="持ち物"
              />
              <InputField name="clothing" placeholder="服装" label="服装" />
              <InputField
                name="precautions"
                placeholder="注意事項"
                label="注意事項"
              />
              <InputField
                name="cacellationRules"
                placeholder="キャンセル規程"
                label="キャンセル規程"
              />

              <InputTextArea name="content" label="セミナー内容" />
              <HStack justifyContent={"flex-end"}>
                <Button
                  type="submit"
                  isLoading={isSubmitting}
                  disabled
                  //   onClick={() => (values.status = "DRAFT")}
                >
                  下書きとして保存
                </Button>
                <Button
                  type="submit"
                  isLoading={isSubmitting}
                  //   onClick={() => (values.status = "REGISTERED")}
                >
                  この内容で登録する
                </Button>
              </HStack>
            </Form>
          )}
        </Formik>
      </Box>
    </MainLayout>
  );
};

export default OffParty;
