import {
  Box,
  Center,
  HStack,
  Button,
  Input,
  FormLabel,
  Text,
  Flex,
  Spacer,
  VStack,
  SimpleGrid,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useRouter } from "next/dist/client/router";

import GoogleMapReact from "google-map-react";
import React, { useRef, useState } from "react";
import CheckboxInputField from "../../../../components/Core/Input/CheckboxInputField";
import InputSection from "../../../../components/Core/Input/InputSection";
import SelectInputField from "../../../../components/Core/Input/SelectInputField";
import InputField from "../../../../components/Core/InputField";
import MainLayout from "../../../../components/Layout/MainLayout";
import {
  OwnerType,
  useCreateMaintainerProfileMutation,
  useCreateOwnerProfileMutation,
  useCreateProfileMutation,
} from "../../../../generated/graphql";
import { toErrorMap } from "../../../../utils/toErrorMap";
import InputCheckBox from "../../../../components/Core/Input/InputCheckBox";
import InputTextArea from "../../../../components/Core/Input/InputTextArea";
import Marker from "../../../../components/Core/Marker";

interface CreateProfileProps {}
interface errorFormFields {
  name?: string;
  gender?: string;
  DOB?: string;
  phoneNumber?: string;
  address?: string;
  owner?: string;
  maintainer?: string;
}
const CreateProfile: React.FC<CreateProfileProps> = ({}) => {
  const genders = [
    { label: "男性", value: "male" },
    { label: "女性", value: "female" },
  ];

  const router = useRouter();
  // Queries and mutaions
  const [, createOwnerProfile] = useCreateOwnerProfileMutation();
  const [, createMaintainerProfile] = useCreateMaintainerProfileMutation();

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
      setCompanyAddress(place.formatted_address);
      setZoom(20);
    }
  };
  const handleApiLoaded = (map: any, maps: any) => {
    searchInput = new maps.places.SearchBox(searchBox.current);
    searchInput.addListener("places_changed", onPlacesChanged);
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
    <MainLayout>
      <Center>
        <Box
          border="1px"
          borderColor={"gray.100"}
          shadow={"xl"}
          mt={[8, 20]}
          mb={[8, 20]}
          pt={[5, 5]}
          rounded={"2xl"}
          minWidth={["xs", "2xl"]}
        >
          <Formik
            initialValues={{
              ownerType: "",
              ownerCompanyName: "",
              ownerLastName: "",
              ownerFirstName: "",
              ownerNickname: "",
              ownerGender: { label: "", value: "" },
              ownerDOB: "",
              ownerPhoneNumber: "",
              repCompanyName: "",
              repLastName: "",
              repFirstName: "",
              repNickname: "",
              repGender: { label: "", value: "" },
              repDOB: "",
              repPhoneNumber: "",
              repAddress: "",
              maintainerCompanyName: "",
              maintainerCompanyIntro: "",
              maintainerCompanyPhoneNumber: "",
              owner: false,
              maintainer: false,
              companyAddress: "",
              lat: 0,
              lng: 0,
            }}
            validate={(values) => {
              console.log({ values });
              const errors: errorFormFields = {};

              if (!values.owner && !values.maintainer) {
                errors.owner =
                  "太陽光発電所の所有者または太陽光発電所の管理者のいずれかを選択してください";
                errors.maintainer =
                  "太陽光発電所の所有者または太陽光発電所の管理者のいずれかを選択してください";
              }
              return errors;
            }}
            onSubmit={async (values, { setErrors }) => {
              values.companyAddress = companyAddress;
              values.lat = markerCenter.lat;
              values.lng = markerCenter.lng;

              if (values.owner) {
                // const response = await createOwnerProfile({
                //   input: {
                //     ownerType: values.ownerType as OwnerType,
                //     companyName: values.ownerCompanyName,
                //     firstName: values.ownerFirstName,
                //     lastName: values.ownerLastName,
                //     nickname: values.ownerNickname,
                //     gender: values.ownerGender.value,
                //     DOB: values.ownerDOB,
                //     phoneNumber: values.ownerPhoneNumber,
                //     address: values.companyAddress,
                //     lat: values.lat,
                //     lng: values.lng,
                //   },
                // });
                // if (response) {
                //   router.push("/");
                // }
              } else if (values.maintainer) {
                // const response = await createMaintainerProfile({
                //   input: {
                //     representative: {
                //       companyName: values.repCompanyName,
                //       firstName: values.repFirstName,
                //       lastName: values.repLastName,
                //       nickname: values.repNickname,
                //       gender: values.repGender.value,
                //       DOB: values.repDOB,
                //       phoneNumber: values.repPhoneNumber,
                //       address: values.repAddress,
                //     },
                //     maintainer: {
                //       name: values.maintainerCompanyName,
                //       intro: values.maintainerCompanyIntro,
                //       phoneNumber: values.maintainerCompanyPhoneNumber,
                //       address: values.companyAddress,
                //       lat: values.lat,
                //       lng: values.lng,
                //     },
                //   },
                // });
                // if (response) {
                //   router.push("/");
                // }
              }
            }}
          >
            {({ isSubmitting, values }) => (
              <Form>
                <InputSection sectionTitle="ユーザー種別の選択">
                  <Text my={6}>
                    ※両方に登録したい場合は、別々にユーザーアカウントをお取りください。
                  </Text>
                  <Text>
                    　発電所オーナーまたは業者のいずれかを選択してください。
                  </Text>
                  <CheckboxInputField
                    name="owner"
                    label="発電所オーナー"
                    isCheckboxDisabled={values.maintainer}
                  />
                  <CheckboxInputField
                    name="maintainer"
                    label="業者"
                    isCheckboxDisabled={values.owner}
                  />
                </InputSection>
                {values.owner && (
                  <InputSection sectionTitle="ユーザーアカウント情報">
                    <InputCheckBox
                      name="ownerType"
                      options={[
                        { label: "個人オーナー", value: OwnerType.Individual },
                        { label: "法人オーナー", value: OwnerType.Corporate },
                        {
                          label: "管理受託会社",
                          value: OwnerType.ManagementCompany,
                        },
                      ]}
                      helperText="1つを選択してください"
                    />

                    <InputField
                      name="ownerCompanyName"
                      placeholder="会社名／屋号"
                      label="会社名／屋号"
                      helperText="非公開"
                      notes="・個人で屋号の無い方はなしと記入"
                    />
                    <HStack>
                      <Text>氏名</Text>
                      <Text>非公開</Text>
                      <Spacer />
                      <Text>・担当者</Text>
                    </HStack>
                    <SimpleGrid columns={2}>
                      <InputField
                        name="ownerLastName"
                        placeholder="姓"
                        label=""
                      />
                      <InputField
                        name="ownerFirstName"
                        placeholder="名"
                        label=""
                      />
                    </SimpleGrid>
                    <InputField
                      name="ownerNickname"
                      label="ニックネーム"
                      placeholder="ニックネーム"
                      helperText="公開(チャット・Q&Aで使用します)"
                      notes="・担当者"
                    />
                    <HStack>
                      <Text>性別</Text>
                      <Text>非公開</Text>
                      <Spacer />
                      <Text>・担当者</Text>
                    </HStack>
                    <SelectInputField
                      name="ownerGender"
                      label=""
                      optionValues={genders}
                    />
                    <HStack>
                      <Text>生年月日</Text>
                      <Text>非公開</Text>
                      <Spacer />
                      <Text>・担当者</Text>
                    </HStack>
                    <InputField name="ownerDOB" label="" type="date" />
                    <InputField
                      name="ownerPhoneNumber"
                      placeholder="電話番号"
                      label="電話番号"
                      helperText="非公開"
                      notes="・会社または担当者"
                    />
                    {mapSelection("owner")}
                  </InputSection>
                )}
                {values.maintainer ? (
                  <>
                    <InputSection sectionTitle="ユーザーアカウント詳細">
                      <InputField
                        name="repCompanyName"
                        placeholder="会社名／屋号"
                        label="会社名／屋号"
                        helperText="非公開"
                        notes="・個人で屋号の無い方はなしと記入"
                      />
                      <HStack>
                        <Text>氏名</Text>
                        <Text>非公開</Text>
                        <Spacer />
                        <Text>・担当者</Text>
                      </HStack>
                      <SimpleGrid columns={2}>
                        <InputField
                          name="repLastName"
                          placeholder="姓"
                          label=""
                        />
                        <InputField
                          name="repFirstName"
                          placeholder="名"
                          label=""
                        />
                      </SimpleGrid>
                      <InputField
                        name="repNickname"
                        label="ニックネーム"
                        placeholder="ニックネーム"
                        helperText="公開(Q&Aで使用します）"
                        notes="・担当者"
                      />
                      <HStack>
                        <Text>性別</Text>
                        <Text>非公開</Text>
                        <Spacer />
                        <Text>・担当者</Text>
                      </HStack>
                      <SelectInputField
                        name="repGender"
                        label=""
                        optionValues={genders}
                      />
                      <HStack>
                        <Text>生年月日</Text>
                        <Text>非公開</Text>
                        <Spacer />
                        <Text>・担当者</Text>
                      </HStack>
                      <InputField name="repDOB" label="" type="date" />
                      <InputField
                        name="repPhoneNumber"
                        placeholder="電話番号"
                        label="電話番号"
                        helperText="非公開"
                        notes="・会社または担当者"
                      />
                      <InputField
                        name="repAddress"
                        placeholder="住所"
                        label="住所"
                      />
                      <Text>
                        エコピアから発電所オーナー様へ連絡する可能性があります。
                      </Text>
                    </InputSection>

                    <InputSection sectionTitle="会社情報">
                      <Text>
                        （ユーザーアカウント詳細と重複する場合も再度ご記入ください）
                      </Text>
                      <InputField
                        name="maintainerCompanyName"
                        placeholder="会社名／屋号／氏名"
                        label="会社名／屋号／氏名"
                        helperText="公開(チャットで使用します。）"
                        notes="・個人で屋号の無い方は氏名を記入"
                      />
                      <InputTextArea
                        name="maintainerCompanyIntro"
                        label="会社紹介"
                        helperText="公開"
                        placeholder="例）
              　（仕事）草刈・パネル洗浄
              　（場所）〇〇県全域　　　
              　　丁寧な仕事を心がけます。"
                        required
                      />
                      <InputField
                        helperText="非公開"
                        name="maintainerCompanyPhoneNumber"
                        label="会社／屋号の電話番号"
                      />
                      <HStack>
                        <Text>会社／屋号の住所</Text>
                        <Text>公開　　※会社名又は住所等で検索可</Text>
                      </HStack>
                      {mapSelection("maintainer")}
                    </InputSection>
                  </>
                ) : null}
                <HStack justifyContent={"right"} px={10} py={10}>
                  <Button
                    type="submit"
                    isLoading={isSubmitting}
                    onClick={(e: any) => {
                      if (
                        e.nativeEvent.detail === 0 &&
                        e.nativeEvent.pointerType !== "mouse"
                      )
                        e.preventDefault();
                    }}
                  >
                    登録
                  </Button>
                </HStack>
              </Form>
            )}
          </Formik>
        </Box>
      </Center>
    </MainLayout>
  );
};

export default CreateProfile;
