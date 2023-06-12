import {
    Box,
    Center,
    HStack,
    Button,
    Text,
    Heading,
    useToast,
    Flex,
    Link, Spacer, SimpleGrid, Input, Select,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import InputSection from "../components/Core/Input/InputSection";
import InputField from "../components/Core/InputField";
import MainLayout from "../components/Layout/MainLayout";
import {
    OwnerType,
    useCreateMaintainerProfileMutation,
    useCreateOwnerProfileMutation,
    useRegisterMutation
} from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import React, {useRef, useState} from "react";
import { CheckCircleIcon } from "@chakra-ui/icons";
import CheckboxInputField from "../components/Core/Input/CheckboxInputField";
import NextLink from "next/link";
import {useRouter} from "next/dist/client/router";
import InputCheckBox from "../components/Core/Input/InputCheckBox";
import SelectInputField from "../components/Core/Input/SelectInputField";
import GoogleMapReact from "google-map-react";
import Marker from "../components/Core/Marker";
import InputTextArea from "../components/Core/Input/InputTextArea";

interface registerProps {}

interface errorFormFields {
  email?: string;
  password?: string;
  acceptTerms?: string;
  acceptPolicy?: string;
    name?: string;
    gender?: string;
    DOB?: string;
    phoneNumber?: string;
    address?: string;
    owner?: string;
    maintainer?: string;
    ownerType?:string;
    ownerCompanyName?:string;
    ownerFirstName?:string;
    ownerLastName?:string;
    ownerNickname?:string;
    ownerGender?:string;
    ownerDOB?:string;
    ownerPhoneNumber?:string;
    companyAddress?:string;
    repCompanyName?:string;
    repFirstName?:string;
    repLastName?:string;
    repNickname?:string;
    repGender?:string;
    repDOB?:string;
    repPhoneNumber?:string;
    maintainerCompanyName?:string;
    maintainerCompanyIntro?:string;
    repAddress?:string;
    maintainerCompanyPhoneNumber?:string;
}
const Register: React.FC<registerProps> = ({}) => {
  const genders = [
    { label: "性別", value: "sex" },
    { label: "男性", value: "male" },
    { label: "女性", value: "female" },
  ];
  const router = useRouter();
    const [, createOwnerProfile] = useCreateOwnerProfileMutation();
    const [, createMaintainerProfile] = useCreateMaintainerProfileMutation();
  // Mutaions
  const [{ data }, register] = useRegisterMutation();

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
  const [hasEmpty, setHasEmpty] = useState(true);
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
            required={true}
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



  const toast = useToast();

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
              email: "",
              password: "",
              passwordVerify: "",
              acceptTerms: "",
              acceptPolicy: "",
              ownerType: "",
              ownerCompanyName: "",
              ownerLastName: "",
              ownerFirstName: "",
              ownerNickname: "",
              ownerGender: "",
              ownerDOB: "",
              ownerPhoneNumber: "",
              repCompanyName: "",
              repLastName: "",
              repFirstName: "",
              repNickname: "",
              repGender: "",
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
              const errors: errorFormFields = {};
              if (!values.email) {
                errors.email = "メールアドレスが必要です";
              } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
              ) {
                errors.email = "無効なメールアドレス";
              }

              if (values.password.length < 8) {
                errors.password = "8文字以上入力してください";
              }
              if (values.password !== values.passwordVerify) {
                errors.password = "パスワードが一致していません！";
              }
              if (!values.acceptTerms) errors.acceptTerms = "確認してください";
              if (!values.acceptPolicy)
                errors.acceptPolicy = "確認してください";

            if (!values.owner && !values.maintainer) {
                errors.owner =
                    "太陽光発電所の所有者または太陽光発電所の管理者のいずれかを選択してください";
                errors.maintainer =
                    "太陽光発電所の所有者または太陽光発電所の管理者のいずれかを選択してください";
            }

            if (values.owner){
                if (!values.ownerType) errors.ownerType= "必須";
                if (!values.ownerCompanyName) errors.ownerCompanyName= "必須";
                if (!values.ownerFirstName) errors.ownerFirstName= "必須";
                if (!values.ownerLastName) errors.ownerLastName= "必須";
                if (!values.ownerNickname) errors.ownerNickname= "必須";
                if (!values.ownerGender) errors.ownerGender= "必須";
                if (!values.ownerDOB) errors.ownerDOB= "必須";
                if (!values.ownerPhoneNumber) errors.ownerPhoneNumber= "必須";
                // if (!companyAddress) errors.companyAddress= "必須";
            }

            if (values.maintainer){
                if (!values.repCompanyName) errors.repCompanyName= "必須";
                if (!values.repFirstName) errors.repFirstName= "必須";
                if (!values.repLastName) errors.repLastName= "必須";
                if (!values.repNickname) errors.repNickname= "必須";
                if (!values.repGender) errors.repGender= "必須";
                if (!values.repDOB) errors.repDOB= "必須";
                if (!values.repPhoneNumber) errors.repPhoneNumber= "必須";
                if (!values.repAddress) errors.repAddress= "必須";
                if (!values.maintainerCompanyName) errors.maintainerCompanyName= "必須";
                if (!values.maintainerCompanyIntro) errors.maintainerCompanyIntro= "必須";
                if (!values.maintainerCompanyPhoneNumber) errors.maintainerCompanyPhoneNumber= "必須";
                // if (!companyAddress) errors.companyAddress= "必須";
            }

                console.log("essrorrs",errors)
                console.log("values.ownerGender",values.ownerGender)

                if (Object.keys(errors).length === 0) {
                    console.log("Values====qqqqq")
                    setHasEmpty(false)
                }else setHasEmpty(true)


                console.log("vvvvvv",companyAddress)
              return errors;


            }}
            onSubmit={async (values, { setErrors, resetForm }) => {
              const response = await register({
                input: { email: values.email, password: values.password },
              });
              if (response.data?.register.errors) {
                setErrors(toErrorMap(response.data.register.errors));
              } else if (response.data?.register.user) {
                  values.companyAddress = companyAddress;
                  values.lat = markerCenter.lat;
                  values.lng = markerCenter.lng;

                  if (!values.companyAddress)
                      toast({
                      title: "検証エラー",
                      description: "住所は必須フィールドです",
                      position: "top-right",
                      status: "error",
                      duration: 9000,
                      isClosable: true,
                  });


                  let result;
                  if (values.owner) {
                      result = await createOwnerProfile({
                          input: {
                              userId:response.data?.register.user.id,
                              ownerType: values.ownerType as OwnerType,
                              companyName: values.ownerCompanyName,
                              firstName: values.ownerFirstName,
                              lastName: values.ownerLastName,
                              nickname: values.ownerNickname,
                              gender: values.ownerGender ,
                              DOB: values.ownerDOB,
                              phoneNumber: values.ownerPhoneNumber,
                              address: values.companyAddress,
                              lat: values.lat,
                              lng: values.lng,
                          },
                      });
                  }else if (values.maintainer) {
                      result = await createMaintainerProfile({
                          input: {
                              userId: response.data?.register.user.id,
                              representative: {
                                  companyName: values.repCompanyName,
                                  firstName: values.repFirstName,
                                  lastName: values.repLastName,
                                  nickname: values.repNickname,
                                  gender: values.repGender,
                                  DOB: values.repDOB,
                                  phoneNumber: values.repPhoneNumber,
                                  address: values.repAddress,
                              },
                              maintainer: {
                                  name: values.maintainerCompanyName,
                                  intro: values.maintainerCompanyIntro,
                                  phoneNumber: values.maintainerCompanyPhoneNumber,
                                  address: values.companyAddress,
                                  lat: values.lat,
                                  lng: values.lng,
                              },
                          },
                      });

                  }
                toast({
                  title: "認証メール送信",
                  description: "（ご登録のメールアドレスをご確認ください）",
                  position: "top-right",
                  status: "success",
                  duration: 9000,
                  isClosable: true,
                });
                resetForm();
                  if (result) {
                      router.push("/");
                  }
              }

            }}
          >
            {({ isSubmitting, values,handleChange,errors }) => (
              <Form>
                <Text
                  fontWeight={"bold"}
                  my={6}
                  fontSize={"lg"}
                  textAlign={"center"}
                >
                  発電所オーナー／業者登録フォーム
                </Text>
                <InputSection sectionTitle="ユーザーアカウント情報">
                  <InputField
                    name="email"
                    placeholder="メールアドレス"
                    label="メールアドレス"
                    helperText="※このアドレスに仕事の通知情報などが届きます"
                  />
                  <InputField
                    name="password"
                    placeholder="パスワード"
                    label="パスワード"
                    type="password"
                  />
                  <InputField
                    name="passwordVerify"
                    placeholder="パスワード"
                    label="パスワード"
                    helperText="(確認)"
                    type="password"
                  />
                </InputSection>
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
                          helperText="公開(チャット等で使用します）"
                          notes="・担当者"
                      />
                      <HStack>
                        <Text>性別</Text>
                        <Text>非公開</Text>
                        <Spacer />
                        <Text>・担当者</Text>
                      </HStack>
                      {/*<SelectInputField*/}
                      {/*    name="ownerGender"*/}
                      {/*    label=""*/}
                      {/*    placeholder="性別"*/}
                      {/*    optionValues={genders}*/}
                      {/*/>*/}
                        <Select
                            name="ownerGender"
                            placeholder="性別"
                            id="ownerGender"
                            onChange={handleChange}
                        >
                            <option value="male">男性</option>
                            <option value="female">女性</option>
                        </Select>
                      {/*  <Select*/}
                      {/*      name="ownerGender"*/}
                      {/*      placeholder="性別"*/}
                      {/*      id="ownerGender"*/}
                      {/*      // optionValues={genders}*/}
                      {/*      onChange={handleChange}*/}
                      {/*      // disabled={!editMode}*/}
                      {/*  >*/}
                      {/*      <option value="male">男性</option>*/}
                      {/*      <option value="female">女性</option>*/}
                      {/*  </Select>*/}
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
                        <HStack>
                            <Text>住所（公開・アイコン等で使用します）</Text>
                            <Text textColor={"red"}>地図が正しく表示されない場合 ページを更新してください.</Text>
                        </HStack>
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
                            helperText="公開（チャット等で使用します）"
                            // notes="・個人で屋号の無い方はなしと記入"
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
                            helperText="非公開"
                            notes="・担当者"
                        />
                        <HStack>
                          <Text>性別</Text>
                          <Text>非公開</Text>
                          <Spacer />
                          <Text>・担当者</Text>
                        </HStack>
                        {/*<SelectInputField*/}
                        {/*    name="repGender"*/}
                        {/*    label=""*/}
                        {/*    optionValues={genders}*/}
                        {/*   placeholder={"性別"}*/}
                        {/*/>*/}
                          <Select
                              name="repGender"
                              placeholder="性別"
                              _placeholder={{textColor:"red.50"}}
                              id="repGender"
                              onChange={handleChange}
                          >
                              <option value="male">男性</option>
                              <option value="female">女性</option>
                          </Select>
                          {/*<Select*/}
                          {/*    name="repGender"*/}
                          {/*    placeholder="性別"*/}
                          {/*    id="repGender"*/}
                          {/*    // optionValues={genders}*/}
                          {/*    onChange={handleChange}*/}
                          {/*    // disabled={!editMode}*/}
                          {/*>*/}
                          {/*    <option value="male">男性</option>*/}
                          {/*    <option value="female">女性</option>*/}
                          {/*</Select>*/}
                        <HStack>
                          <Text>生年月日</Text>
                          <Text>非公開</Text>
                          <Spacer />
                          <Text>・担当者</Text>
                        </HStack>
                        <InputField name="repDOB" label="" type="date"/>
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
                            notes="・会社"
                        />
                        <Text>
                          エコピアから発電所オーナー様へ連絡する可能性があります。
                        </Text>
                      </InputSection>

                      <InputSection sectionTitle="会社情報 （ユーザーアカウント詳細と重複する場合も再度ご記入ください）">
                          <Text>
                              代表者情報
                        </Text>
                        <InputField
                            name="maintainerCompanyName"
                            placeholder="会社名／屋号／氏名"
                            label="代表者氏名"
                            // helperText="公開(チャットで使用します。）"
                            // notes="・個人で屋号の無い方は氏名を記入"
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
                          <HStack>
                              {/*<Text>住所（公開・アイコン等で使用します）</Text>*/}
                              <Text textColor={"red"}>地図が正しく表示されない場合 ページを更新してください.</Text>
                          </HStack>
                        {mapSelection("maintainer")}
                      </InputSection>
                    </>
                ) : null}



                <InputSection sectionTitle="">

                  <CheckboxInputField
                    name="acceptTerms"
                    formLabelComponent={
                      <>
                        <Text as={"span"}>
                          <NextLink href={"/about/terms"} passHref>
                            <Link color={"blue.400"}>利用規約 </Link>
                          </NextLink>
                        </Text>
                        <Text as={"span"}>に同意する</Text>
                      </>
                    }
                    label="terms"

                  />
                  <CheckboxInputField
                    name="acceptPolicy"
                    label="反社会的勢力ではない"

                  />
                </InputSection>

                <HStack justifyContent={"right"} px={10} py={10}>
                  <Button
                    disabled={
                      hasEmpty
                      // errors.email ||
                      // errors.password ||
                      // errors.passwordVerify ||
                      // errors.acceptTerms ||
                      // errors.acceptPolicy || (values.owner && (errors.ownerType ||errors.ownerCompanyName ||errors.ownerFirstName ||errors.ownerLastName ||errors.ownerNickname ||errors.ownerGender?.value ||errors.ownerDOB ||errors.ownerPhoneNumber || errors.companyAddress) )
                      //   ? true
                      //   : false
                    }
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
      {data?.register.user?.id && (
        <Box textAlign="center" py={10} px={6}>
          <CheckCircleIcon boxSize={"50px"} color={"green.500"} />
          <Heading as="h2" size="xl" mt={6} mb={2}>
            登録済み
          </Heading>
          <Text color={"gray.500"}>
            登録されたメールアドレスに認証メールが送信されました
          </Text>
        </Box>
      )}
    </MainLayout>
  );
};

export default Register;
