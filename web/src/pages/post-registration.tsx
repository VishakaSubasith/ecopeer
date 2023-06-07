import { Box, Heading } from "@chakra-ui/layout";
import {
  Select,
  Input,
  Button,
  FormControl,
  FormLabel,
  Checkbox,
  Center,
} from "@chakra-ui/react";
import { Formik, Form } from "formik";
import router from "next/dist/client/router";
import { useRef, useState } from "react";
import InputField from "../components/Core/InputField";
import GoogleMapReact from "google-map-react";
import {
  useCreateSolarPowerPlantMaintainerMutation,
  // useCreateSolarPowerPlantOwnerMutation,
  useUpdateUserTypeMutation,
} from "../generated/graphql";
import NextImage from "next/image";

interface postRegistrationProps {}

const PostRegistration: React.FC<postRegistrationProps> = ({}) => {
  const [ownerCheckbox, setOwnerCheckbox] = useState(false);
  const [maintainerCheckbox, setMaintainerCheckbox] = useState(false);
  const [DOB, setDOB] = useState("");
  const [companyAddress, setCompanyAddress] = useState("");

  // const [, creatOwner] = useCreateSolarPowerPlantOwnerMutation();
  const [, createMaintainer] = useCreateSolarPowerPlantMaintainerMutation();
  const [, updateUserType] = useUpdateUserTypeMutation();

  const Marker = (props: any) => (
    <NextImage
      src={`/images/icons/job.png`}
      width={"30px"}
      height={"30px"}
      alt="marker"
    />
  );

  const [mapCenter, setMapCenter] = useState({
    lat: 37.846877,
    lng: 137.5557178,
  });
  const [markerCenter, setMarkerCenter] = useState({
    lat: 35.6681625,
    lng: 139.6007821,
  });

  const searchBox = useRef(null);
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
    }
  };
  const handleApiLoaded = (map: any, maps: any) => {
    searchInput = new maps.places.SearchBox(searchBox.current);
    searchInput.addListener("places_changed", onPlacesChanged);
  };

  // @ts-ignore
  return (
    <Center>
      <Box
        shadow={"lg"}
        px={[10, 30]}
        py={[5, 10]}
        m={[5, 20]}
        rounded={"lg"}
        minWidth={["xs", "lg"]}
        maxWidth={["xs", "2xl"]}
      >
        <Heading>Select user type</Heading>
        <Box mx={"auto"} my={"16"}>
          <Formik
            initialValues={{
              name: "",
              gender: "",
              DOB: "",
              phoneNumber: "",
              address: "",
              companyName: "",
              companyIntro: "",
              companyPhoneNumber: "",
              companyAddress: "",
            }}
            onSubmit={async (values, { setErrors }) => {
              values.DOB = DOB;
              values.companyAddress = companyAddress;

              if (ownerCheckbox && maintainerCheckbox) {
                // const owner = await creatOwner(values);
                // const maintainer = await createMaintainer({
                //   representativeName: values.name,
                //   representativeGender: values.gender,
                //   representativeDOB: values.DOB,
                //   representativePhoneNumber: values.phoneNumber,
                //   representativeAddress: values.address,
                //   maintainerName: values.companyName,
                //   maintainerAddress: values.companyAddress,
                //   maintainerIntro: values.companyIntro,
                //   maintainerPhoneNumber: values.companyPhoneNumber,
                //   lat: markerCenter.lat,
                //   lng: markerCenter.lng,
                // });
                await updateUserType({ userType: "OWNER_MAINTAINER" });
              } else if (ownerCheckbox) {
                // const owner = await creatOwner(values);
                await updateUserType({ userType: "OWNER" });
              } else if (maintainerCheckbox) {
                // const maintainer = await createMaintainer({
                //   representativeName: values.name,
                //   representativeGender: values.gender,
                //   representativeDOB: values.DOB,
                //   representativePhoneNumber: values.phoneNumber,
                //   representativeAddress: values.address,
                //   maintainerName: values.companyName,
                //   maintainerAddress: values.companyAddress,
                //   maintainerIntro: values.companyIntro,
                //   maintainerPhoneNumber: values.companyPhoneNumber,
                //   lat: markerCenter.lat,
                //   lng: markerCenter.lng,
                // });
                await updateUserType({ userType: "MAINTAINER" });
              }

              router.push("/");
            }}
          >
            {({ isSubmitting, handleChange, values }) => (
              <Form>
                <InputField
                  name="name"
                  placeholder="name"
                  label="Name"
                  switchOption={false}
                />
                <FormControl display="flex" alignItems="center">
                  <FormLabel htmlFor="gender" mb="0">
                    Gender
                  </FormLabel>
                  {/* <Switch id="asdsd" colorScheme={"facebook"} /> */}
                </FormControl>
                <Select
                  name="gender"
                  placeholder="Gender"
                  id="gender"
                  value={values.gender}
                  onChange={handleChange}
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </Select>
                <FormControl display="flex" alignItems="center" mt={5}>
                  <FormLabel htmlFor="DOB" mb="0">
                    Date of birth
                  </FormLabel>
                  {/* <Switch id="4" colorScheme={"facebook"} /> */}
                </FormControl>

                <Input
                  id="DOB"
                  type="date"
                  name="DOB"
                  onChange={(event) => setDOB(event.target.value)}
                />
                <InputField
                  name="phoneNumber"
                  placeholder="Phone number"
                  label="phoneNumber"
                  switchOption={false}
                />
                <InputField
                  name="address"
                  placeholder="address"
                  label="address"
                  switchOption={false}
                />
                <FormControl display="flex" alignItems="center" my={5}>
                  <FormLabel htmlFor="isOwner" mb="0">
                    Powerplant Owner
                  </FormLabel>
                  <Checkbox
                    id="isOwner"
                    isChecked={ownerCheckbox}
                    onChange={() => setOwnerCheckbox(!ownerCheckbox)}
                    mr={10}
                  />
                  <FormLabel htmlFor="isMaintainer" mb="0">
                    Powerplant Maintainer
                  </FormLabel>
                  <Checkbox
                    id="isMaintainer"
                    isChecked={maintainerCheckbox}
                    onChange={() => setMaintainerCheckbox(!maintainerCheckbox)}
                  />
                </FormControl>
                {maintainerCheckbox && (
                  <Box>
                    <Heading>Company Info</Heading>
                    <InputField
                      name="companyName"
                      placeholder="Name"
                      label="Name"
                    />
                    <InputField
                      name="companyIntro"
                      placeholder="Intro"
                      label="Intro"
                    />
                    <InputField
                      name="companyPhoneNumber"
                      placeholder="Phone number"
                      label="PhoneNumber"
                    />
                    {/* <InputField
                      name="companyAddress"
                      placeholder="Address"
                      label="Address"
                    /> */}
                    <Input
                      type="text"
                      value={companyAddress}
                      onChange={(e) => setCompanyAddress(e.target.value)}
                      name="companyAddress"
                      ref={searchBox}
                    />
                    <FormLabel mb="0">Location</FormLabel>
                    <Box maxWidth={"full"} h={["sm", "md", "xl"]}>
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
                        center={mapCenter}
                        options={{ mapTypeControl: true }}
                        draggable={true}
                      >
                        <Marker lat={markerCenter.lat} lng={markerCenter.lng} />
                      </GoogleMapReact>
                    </Box>
                  </Box>
                )}
                <Button
                  type="submit"
                  onClick={(e: any) => {
                    if (e.nativeEvent.pointerType !== "mouse")
                      e.preventDefault();
                  }}
                  isLoading={isSubmitting}
                >
                  Confirm Profile
                </Button>
              </Form>
            )}
          </Formik>
        </Box>
      </Box>
    </Center>
  );
};

export default PostRegistration;
