// import React from 'react'

import InputTextArea from "../../../components/Core/Input/InputTextArea";

interface indexProps {

}
//
// const index: React.FC<indexProps> = ({}) => {
//     return (<p>hello</p>);
// }
//
// export default index;

import { Divider, Heading, HStack } from "@chakra-ui/layout";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Select, SimpleGrid,
  Skeleton,
  Spacer,
  Stack,
  Text, useToast, VStack,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import React, {useEffect, useRef, useState} from "react";
import NextLink from "next/link";
import InputField from "../../../components/Core/InputField";
import MainLayout from "../../../components/Layout/MainLayout";
import {
  Maybe,
  useChangePasswordMutation,
  useContactUsMutation,
  useGetBankDetailsQuery,
  useGetExchangeInformationQuery,
  useMeQuery,
  UserType,
  useSaveBankDetailsMutation,
  useUpdateBankDetailsMutation,
  useUpdateMaintainerInfoMutation,
  useUpdateOwnerInfoMutation,
  useUserDetailsQuery,
  useSaveExchangeInformationMutation,
  useUpdateExchangeInformationMutation,
  useDeleteUserMutation,
  useCheckUserDeleteMutation, OwnerType
} from "../../../generated/graphql";
import {
  BankDetailsInfo,
  MaintainerInfo,
  OwnerInfo,
  RepresentativeInfo,
    ExchangeInformation
} from "../../../utils/types";
import {useAuth} from "../../../utils/useAuth";
import InputSection from "../../../components/Core/Input/InputSection";
import GoogleMapReact from "google-map-react";
import Marker from "../../../components/Core/Marker";
import Delayed from "./delayed";
import InputCheckBox from "../../../components/Core/Input/InputCheckBox";

interface profileProps {
}

interface errorFormFields {
  password?: string;
  rePassword?: string;
}

interface errorFormFieldsForBankDetails {
  bankName?: string;
  branchName?: string;
  depositItem?: string;
  accountNameKanji?: string;
  accountNameHiragana?: string;
  bankType?: string;
  accountNumber?: string;
}

const index: React.FC<indexProps> = ({}) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useAuth();
  // State
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [editMode, setEditMode] = useState(false);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [mapCenter, setMapCenter] = useState({
    lat: 37.846877,
    lng: 137.5557178,
  });
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [markerCenter, setMarkerCenter] = useState({
    lat: 35.6681625,
    lng: 139.6007821,
  });

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [zoom, setZoom] = useState(6);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  let searchBox = useRef(null);


  // Queries
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [{data: dataMe, fetching: fetchingMe}] = useMeQuery();

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [, changePassword] = useChangePasswordMutation();

  console.log("fetchingMe===", fetchingMe)
  console.log("dataMe===", dataMe)

  let userId = -1;
  if (!fetchingMe) {
    if (dataMe?.me?.id) {
      userId = dataMe.me.id;
    }
  }

  // @ts-ignore
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [{data: bankDetails, fetching: bankDetailsFetching}] = useGetBankDetailsQuery({
    variables: {userId: userId},
    pause: userId === -1,
  })
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [{data: exchangeInformations, fetching: exchangeInformationFetching}] = useGetExchangeInformationQuery({
    variables: {userId: userId},
    pause: userId === -1,
  })




  // @ts-ignore
  console.log("result====>>", bankDetails?.getBankDetailsByUserId)


  // Mutations
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [, updateOwnerInfo] = useUpdateOwnerInfoMutation();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [, saveBankDetails] = useSaveBankDetailsMutation();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [, updateBankDetails] = useUpdateBankDetailsMutation();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [, updateMaintainerInfo] = useUpdateMaintainerInfoMutation();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [, saveExchangeInformation] = useSaveExchangeInformationMutation();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [, updateExchangeInformation] = useUpdateExchangeInformationMutation();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [, checkDeleteUser] = useCheckUserDeleteMutation();



  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [{data, fetching}] = useUserDetailsQuery({
    variables: {userId: userId},
    pause: userId === -1,
  });

  const checkDeleteUserHandler = async () => {
  const result =   await checkDeleteUser({ input: { userId : userId } });

    console.log("resulktttt====>>",result)

    if (result?.data?.checkUserCanDelete){
      toast({
        title: "アカウントの削除",
        description: "アカウント削除リクエストが成功しました",
        position: "top-right",
        status: "success",
        duration: 9000,
        isClosable: true,
      });

    }else{
      toast({
        title: "アカウントの削除",
        description: "アカウントを削除できません",
        position: "top-right",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }

    // getUsers();
  };


  console.log("data====>>", data)

  let ownerInfo: OwnerInfo | undefined = undefined;
  if (!fetching && data?.userDetails?.solarPowerPlantOwner) {
    ownerInfo = data.userDetails.solarPowerPlantOwner;
    // @ts-ignore
    ownerInfo.DOB = new Date(ownerInfo.DOB).toISOString().substring(0, 10);
  }

  let maintainerInfo: MaintainerInfo | undefined = undefined;
  if (!fetching && data?.userDetails?.solarPowerPlantMaintainer) {
    maintainerInfo = data.userDetails.solarPowerPlantMaintainer;
  }

  let representativeInfo: RepresentativeInfo | undefined = undefined;
  if (
      !fetching &&
      data?.userDetails?.solarPowerPlantMaintainer?.representative
  ) {
    // @ts-ignore
    representativeInfo =
        data?.userDetails?.solarPowerPlantMaintainer?.representative;
    // @ts-ignore
    representativeInfo.DOB = new Date(representativeInfo.DOB)
        .toISOString()
        .substring(0, 10);
  }

  let bankDetailsInfo: BankDetailsInfo | undefined = undefined;
  // @ts-ignore
  if (!bankDetailsFetching && bankDetails?.getBankDetailsByUserId) {
    // @ts-ignore
    bankDetailsInfo = bankDetails?.getBankDetailsByUserId[0];
  }

    let exchangeInformation: ExchangeInformation | undefined = undefined;
  // @ts-ignore
  if (!exchangeInformationFetching && exchangeInformations?.getExchangeInformationByUserId) {
    // @ts-ignore
    exchangeInformation = exchangeInformations?.getExchangeInformationByUserId[0];
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [address, setAddress] = useState("")

  let initialValues: any = {};
  if (bankDetailsInfo) {
    // @ts-ignore
    initialValues["accountNameHiragana"] = bankDetailsInfo.accountHolderHiragana;
    // @ts-ignore
    initialValues["accountNameKanji"] = bankDetailsInfo.accountHolderKanji;
    // @ts-ignore
    initialValues["accountNumber"] = bankDetailsInfo.accountNumber;
    // @ts-ignore
    initialValues["bankName"] = bankDetailsInfo.bankName;
    // @ts-ignore
    initialValues["branchName"] = bankDetailsInfo.branchName;
    // @ts-ignore
    initialValues["depositItem"] = bankDetailsInfo.depositItem;
    // @ts-ignore
    initialValues["bankType"] = bankDetailsInfo.bankType;
  }

  if (ownerInfo) {
    // @ts-ignore
    initialValues["OwnerCompanyName"] = ownerInfo.companyName;
    // @ts-ignore
    initialValues["ownerGender"] = ownerInfo.gender;
    // @ts-ignore
    initialValues["ownerAddress"] = ownerInfo.address;
    // @ts-ignore
    initialValues["ownerPhoneNumber"] = ownerInfo.phoneNumber;
    // @ts-ignore
    initialValues["ownerDOB"] = ownerInfo.DOB;
    // @ts-ignore
    initialValues["ownerNickname"] = ownerInfo.nickname;
    // @ts-ignore
    initialValues["ownerFirstName"] = ownerInfo.firstName;
    // @ts-ignore
    initialValues["ownerLastName"] = ownerInfo.lastName;
    // @ts-ignore
    initialValues["ownerType"] = ownerInfo.ownerType;
    // @ts-ignore
    initialValues["ownerLng"] = ownerInfo.lng;
    // @ts-ignore
    initialValues["ownerLat"] = ownerInfo.lat;

    // searchBox.current = initialValues.ownerAddress
    // setAddress(initialValues.ownerAddress);
  }

  // let companyAddr: number | readonly string[] | Maybe<string> | undefined;

  if (maintainerInfo) {
    initialValues["maintainerName"] = maintainerInfo.name;
    initialValues["maintainerAddress"] = maintainerInfo.address;
    initialValues["maintainerPhoneNumber"] = maintainerInfo.phoneNumber;
    initialValues["intro"] = maintainerInfo.intro;
    initialValues["companyAddLat"] = maintainerInfo.lat;
    initialValues["companyAddLng"] = maintainerInfo.lng;
    // @ts-ignore

  }
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [companyAddress, setCompanyAddress] = useState(representativeInfo?.address || "");
  if (representativeInfo) {
    // @ts-ignore
    initialValues["repFirstName"] = representativeInfo.firstName;
    // @ts-ignore
    initialValues["repLastName"] = representativeInfo.lastName;
    // @ts-ignore
    initialValues["repNickName"] = representativeInfo.nickname;
    // @ts-ignore
    initialValues["repCompanyName"] = representativeInfo.companyName;
    // @ts-ignore
    initialValues["repGender"] = representativeInfo.gender;
    // @ts-ignore
    initialValues["repDOB"] = representativeInfo.DOB;
    // @ts-ignore
    initialValues["repAddress"] = representativeInfo.address;

    // @ts-ignore
    initialValues["companyAddress"] = representativeInfo.address;

    // setAddress(initialValues.companyAddress);

    // searchBox.current=initialValues.companyAddress


    // @ts-ignore
    initialValues["repPhoneNumber"] = representativeInfo.phoneNumber;

  }

  // // eslint-disable-next-line react-hooks/rules-of-hooks
  // const [mapCenter, setMapCenter] = useState({
  //   lat: initialValues.ownerAddress,
  //   lng: initialValues.ownerLng
  // });
  // // eslint-disable-next-line react-hooks/rules-of-hooks
  // const [markerCenter, setMarkerCenter] = useState({
  //   lat: initialValues.ownerAddress,
  //   lng: initialValues.ownerLng
  // });

//
// // eslint-disable-next-line react-hooks/rules-of-hooks
// const [ownerLat,setOwnerLat] = useState("")
// // eslint-disable-next-line react-hooks/rules-of-hooks
// const [ownerlng,setOwnerLng] = useState("")

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [editAddress, setEditAddress] = useState(false)

  // Google maps handlers
  let searchInput: any;
  const onPlacesChanged = () => {
    const places = searchInput.getPlaces();
    if (places.length > 0) {
      const place = places[0];
      const location = place.geometry.location;
      const cordinates = {lat: location.lat(), lng: location.lng()};
      setMarkerCenter(cordinates);
      setMapCenter(cordinates);
      setEditAddress(true)
      setCompanyAddress(place.formatted_address);
      setZoom(20);
    }
  };

  console.log("Initial values===",initialValues.companyAddress)
  console.log("searchBox address===",searchBox.current)


  if (bankDetailsInfo) {
    // @ts-ignore
    initialValues["accountNameHiragana"] = bankDetailsInfo.accountHolderHiragana;
    // @ts-ignore
    initialValues["accountNameKanji"] = bankDetailsInfo.accountHolderKanji;
    // @ts-ignore
    initialValues["accountNumber"] = bankDetailsInfo.accountNumber;
    // @ts-ignore
    initialValues["bankName"] = bankDetailsInfo.bankName;
    // @ts-ignore
    initialValues["branchName"] = bankDetailsInfo.branchName;
    // @ts-ignore
    initialValues["depositItem"] = bankDetailsInfo.depositItem;
    // @ts-ignore
    initialValues["bankType"] = bankDetailsInfo.bankType;
  }

  if (exchangeInformation){
    // @ts-ignore
    initialValues["blogUrl"] = exchangeInformation.blogUrl;
    // @ts-ignore
    initialValues["twitter"] = exchangeInformation.twitter;
    // @ts-ignore
    initialValues["ownerComment"] = exchangeInformation.comment;
    // @ts-ignore
    initialValues["ownerInterested"] = exchangeInformation.interested;
    // @ts-ignore
    initialValues["ownerTrouble"] = exchangeInformation.trouble;
  }

  // const onclickAddress = (value)=>{
  //   setCompanyAddress(value)
  // }

  const submitClickHandler = async (
    submitForm: (() => Promise<void>) & (() => Promise<any>)
  ) => {
    setEditMode(false);
    await submitForm();
  };
  const handleApiLoaded = (map: any, maps: any) => {
    searchInput = new maps.places.SearchBox(searchBox.current);
    searchInput.addListener("places_changed", onPlacesChanged);
  };
  // @ts-ignore
  // @ts-ignore
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
        {/*<Input*/}
        {/*    type="text"*/}
        {/*    id="companyAddress"*/}
        {/*    value={representativeInfo?.address || companyAddress}*/}
        {/*    onChange={(e) => setCompanyAddress(e.target.value)}*/}
        {/*    name="companyAddress"*/}
        {/*    ref={searchBox}*/}
        {/*/>*/}
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
                lat={initialValues.ownerLat || initialValues.companyAddLat || markerCenter.lat}
                lng={initialValues.ownerLng || initialValues.companyAddLng || markerCenter.lng}
                variant={variant}
            />
          </GoogleMapReact>
        </Box>
      </>
  );


  // eslint-disable-next-line react-hooks/rules-of-hooks
  const toast = useToast();

  // @ts-ignore
  return (


    <MainLayout>
      {/* @ts-expect-error Server Component */}
      <Delayed>
        <Box>
      <Heading>マイページ</Heading>
      <Box maxWidth={["xs", "4xl"]} mx={"auto"}>
        {fetching || fetchingMe ? (
          <Stack>
            <Skeleton height="20px" />
            <Skeleton height="20px" />
            <Skeleton height="20px" />
          </Stack>
        ) : (
          <Box>
            {/*<Flex>*/}
            {/*  {data?.userDetails?.userType !== UserType.Owner && (*/}
            {/*    <NextLink passHref href="/user/profile/subscription">*/}
            {/*      <Button>サイト利用料のお支払いはこちら(現在無料)</Button>*/}
            {/*    </NextLink>*/}
            {/*  )}*/}
            {/*  <Spacer />*/}
            {/*</Flex>*/}
            <Flex
                direction={"row"}
                shadow={"md"}
                p={5}
                rounded={"xl"}
                mb={5}
                fontWeight={"bold"}
                px={[10, 30]}
                py={[5, 10]}
                my={[5, 10]}
            >
              <Flex
                  direction={"row"}
                  // shadow={"md"}
                  p={5}
                  // rounded={"xl"}
                  mb={5}
                  fontWeight={"bold"}
                  px={[10, 30]}
                  py={[5, 10]}
                  my={[5, 10]}
              >
              <Box mr={3}>
                <Text>ユーザータイプ</Text>
                {data?.userDetails?.userType !== UserType.Owner && (
                    <Text>アカウントタイプ</Text>
                )}
                <Text> メールアドレス</Text>
              </Box>
              <Box>
                <Text> : {data?.userDetails?.userType === "Maintainer" ? "業者" : "発電所オーナー" }</Text>
                {data?.userDetails?.userType !== UserType.Owner && (
                    <Text> : {data?.userDetails?.accountType}</Text>
                )}
                <Text> : {data?.userDetails?.email}</Text>
              </Box>
              </Flex>
              <Flex
                  direction={"row"}
                  // shadow={"md"}
                  p={5}
                  // rounded={"xl"}
                  mb={5}
                  fontWeight={"bold"}
                  px={[10, 30]}
                  py={[5, 10]}
                  my={[5, 10]}
              >
            <Formik initialValues={initialValues}  validate={(values) => {
              const errors: errorFormFields = {};
              if (values.password.length < 8) {
                errors.password = "8文字以上入力してください";
              }
              if (values.password !== values.rePassword) {
                errors.rePassword = "パスワードが一致していません！";
              }
              return errors;
            }} onSubmit={async (values,{setErrors,resetForm})=>{

              // @ts-ignore
              const result = await changePassword({input:{userId:data?.userDetails?.id,newPassword:values.password}})
              resetForm();
              console.log("result====>>>",result)
              if (result) {

                toast({
                  title: "パスワードのリセット",
                  description: "パスワードが正常にリセットされました",
                  position: "top-right",
                  status: "success",
                  duration: 9000,
                  isClosable: true,
                });

              }
              else
                toast({
                title: "パスワードのリセット",
                description: "パスワードのリセットに失敗しました",
                position: "top-right",
                status: "error",
                duration: 9000,
                isClosable: true,
              });
            }}>
              {({ isSubmitting, errors }) => (
            <Form
              // direction={"row"}
              // shadow={"md"}
              // p={5}
              // rounded={"xl"}
              // mb={5}
              // fontWeight={"bold"}
              // px={[10, 30]}
              // py={[5, 10]}
              // my={[5, 10]}
            >
              <Box mr={3}>
                <InputField
                    label="パスワードを変更したい場合は入力してください"
                    name="password"
                    type={"password"}
                    // disabled={!editMode}
                />
              </Box>
              <Box mr={3}>
                <InputField
                    label="確認のためパスワードを再入力してください"
                    type={"password"}
                    name="rePassword"
                    // disabled={!editMode}
                />


              </Box>
              <Button
                  disabled={
                    errors.password ||
                    errors.rePassword
                        ? true
                        : false
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
                  // disabled={editMode}
                  // onClick={() => setEditMode(true)}
              >
                変更を保存する
              </Button>

            </Form>
                  )}
          </Formik>
              </Flex>
            </Flex>
            <Divider />
            <Formik
                validate={(values)=>{

                  const errors: errorFormFieldsForBankDetails = {};

                  // @ts-ignore
                  // if (!bankDetails?.getBankDetailsByUserId[0]){

                    if (!values.bankName) errors.bankName= "必須";
                    if (!values.branchName) errors.branchName= "必須";
                    // if (!values.depositItem) errors.depositItem= "必須";
                    if (!values.accountNumber) errors.accountNumber= "必須";
                    if (!values.accountNameKanji) errors.accountNameKanji= "必須";
                    if (!values.accountNameHiragana) errors.accountNameHiragana= "必須";
                    // if (!values.bankType) {
                    //   errors.bankType = "必須";
                    //   // toast({
                    //   //   title: "必須",
                    //   //   description: "銀行タイプが必要です",
                    //   //   position: "top-right",
                    //   //   status: "error",
                    //   //   duration: 9000,
                    //   //   isClosable: true,
                    //   // });
                    // }
                    // if (!values.ownerPhoneNumber) errors.ownerPhoneNumber= "必須";
                    // if (!companyAddress) errors.companyAddress= "必須";



                  // }
                  console.log("errors===>>>errors",errors)
                  return errors
                }}
                onSubmit={async (values, { setErrors }) => {
                  let exchangeResult, userResult, bankResult



                  if (!values.ownerGender && !values?.repGender) {
                    toast({
                      title: "必須",
                      description: "性別は必須です",
                      position: "top-right",
                      status: "error",
                      duration: 9000,
                      isClosable: true,
                    });
                  }else {
                    if ((values.bankType === "Bank" ||
                            values.bankType === "Shinkin Bank" ||
                            values.bankType === "Credit Union" ||
                            values.bankType === "Agricultural Cooperative" ||
                            values.bankType === "Others") &&
                        (values.depositItem === "Ordinary" ||
                            values.depositItem === "Checking" ||
                            values.depositItem === "Savings" ||
                            values.depositItem === "Others"
                        )) {

                      // @ts-ignore
                      if (!bankDetails?.getBankDetailsByUserId[0]) {
                        if (!values.bankName || !values.branchName || !values.depositItem || !values.accountNumber || !values.accountNameKanji || !values.accountNameHiragana || !values.bankType) {
                          toast({
                            title: "銀行の詳細",
                            description: "銀行口座情報が必要です",
                            position: "top-right",
                            status: "error",
                            duration: 9000,
                            isClosable: true,
                          });
                        } else {
                          // @ts-ignore
                          bankResult = await saveBankDetails({input: {bankName: values.bankName || "",branchName: values.branchName || "", depositItem: values.depositItem || "", accountNumber: values.accountNumber.toString() || "", accountHolderKanji: values.accountNameKanji || "",accountHolderHiragana: values.accountNameHiragana || "", userId: data?.userDetails.id, bankType: values.bankType || ""
                          }
                          })
                          console.log("111111111111")
                        }

                      } else {
                        if (!values.bankName || !values.branchName || !values.depositItem || !values.accountNumber || !values.accountNameKanji || !values.accountNameHiragana || !values.bankType) {
                          toast({
                            title: "銀行の詳細",
                            description: "銀行口座情報が必要です",
                            position: "top-right",
                            status: "error",
                            duration: 9000,
                            isClosable: true,
                          });
                        } else {
                          // @ts-ignore
                          bankResult = await updateBankDetails({input: {bankName: values.bankName || "", branchName: values.branchName || "", depositItem: values.depositItem || "", accountNumber: values.accountNumber.toString() || "", accountHolderKanji: values.accountNameKanji || "", accountHolderHiragana: values.accountNameHiragana || "", userId: data?.userDetails?.id, bankType: values.bankType || ""
                            }
                          })
                          // console.log("updateResult====>>>", updateResult)
                        }
                      }

                      if (dataMe?.me?.userType === UserType.Owner) {

                        // @ts-ignore
                        if (!exchangeInformations?.getExchangeInformationByUserId[0]) {
                          // @ts-ignore
                          exchangeResult = await saveExchangeInformation({input: {blogUrl: values.blogUrl || "", twitter: values.twitter || "", comment: values.ownerComment || "", interested: values.ownerInterested || "", trouble: values.ownerTrouble || "", userId: data?.userDetails?.id
                            }
                          })
                          console.log("2222222222")
                        } else { // @ts-ignore
                          exchangeResult = await updateExchangeInformation({input: {blogUrl: values.blogUrl || "", twitter: values.twitter || "", comment: values.ownerComment || "", interested: values.ownerInterested || "", trouble: values.ownerTrouble || "", userId: data?.userDetails?.id
                            }
                          })
                        }

                        // @ts-ignore
                        // @ts-ignore
                        userResult = await updateOwnerInfo({
                          input: {
                            companyName: values?.OwnerCompanyName,
                            firstName: values?.ownerFirstName,
                            lastName: values?.ownerLastName,
                            nickname: values?.ownerNickname,
                            gender: values?.ownerGender,
                            address: editAddress ? companyAddress : initialValues.ownerAddress,
                            phoneNumber: values?.ownerPhoneNumber,
                            DOB: values?.ownerDOB,
                            ownerType: values?.ownerType,
                            lat: editAddress ? markerCenter.lat : initialValues.ownerLat,
                            lng: editAddress ? markerCenter.lng : initialValues.ownerLng
                          },
                        });

                        console.log("33333333")
                        // // @ts-ignore
                        // if ((exchangeResult?.data?.updateExchangeInformation?.errors === null || exchangeResult?.data?.saveExchangeInformation?.errors === null) && (userResult.data.updateOwnerInfo === true || userResult.data.updateMaintainerInfo === true) &&( bankResult.data.updateBankDetails.errors=== null || bankResult.data.saveBankDetails.errors=== null) )
                        //   toast({
                        //     title: "ユーザーの詳細",
                        //     description: "ユーザー詳細の更新成功",
                        //     position: "top-right",
                        //     status: "success",
                        //     duration: 9000,
                        //     isClosable: true,
                        //   });
                        // else
                        //   toast({
                        //     title: "エラー",
                        //     description: "詳細の保存中にエラーが発生しました",
                        //     position: "top-right",
                        //     status: "error",
                        //     duration: 9000,
                        //     isClosable: true,
                        //   });


                      } else {

                        // @ts-ignore
                        // @ts-ignore
                        userResult = await updateMaintainerInfo({
                          input: {
                            // name: values?.repCompanyName,
                            address: values?.maintainerAddress,
                            phoneNumber: values?.maintainerPhoneNumber,
                            firstName: values?.repFirstName,
                            lastName: values?.repLastName,
                            nickname: values?.maintainerName,
                            intro: values?.intro,
                            lat: editAddress ? markerCenter.lat : initialValues.companyAddLat,
                            lng: editAddress ? markerCenter.lng : initialValues.companyAddLng,
                            representative: {
                              nickname: values?.repNickName,
                              companyName: values?.repCompanyName,
                              firstName: values?.repFirstName,
                              lastName: values?.repLastName,
                              gender: values?.repGender,
                              DOB: values?.repDOB,
                              address: editAddress ? companyAddress : initialValues.companyAddress,
                              phoneNumber: values?.repPhoneNumber,
                            },
                          },
                        });

                      }


                    } else {
                      toast({
                        title: "必須",
                        description: "銀行タイプが必要です",
                        position: "top-right",
                        status: "error",
                        duration: 9000,
                        isClosable: true,
                      });
                    }


                    // @ts-ignore
                    if (((exchangeResult?.data?.updateExchangeInformation && exchangeResult?.data?.updateExchangeInformation?.errors === null) || (exchangeResult?.data?.saveExchangeInformation && exchangeResult?.data?.saveExchangeInformation?.errors === null)) && (userResult?.data?.updateOwnerInfo === true || userResult?.data?.updateMaintainerInfo === true) && ((bankResult?.data?.updateBankDetails && bankResult?.data?.updateBankDetails?.errors === null) || (bankResult?.data?.saveBankDetails && bankResult?.data?.saveBankDetails?.errors === null))){
                      console.log("555555555")
                      toast({
                        title: "ユーザーの詳細",
                        description: "ユーザー詳細の更新成功",
                        position: "top-right",
                        status: "success",
                        duration: 9000,
                        isClosable: true,
                      });
                  }

                  }





















                  //
                  // if (dataMe?.me?.userType === UserType.Owner) {
                  //
                  //   // @ts-ignore
                  //   if (!exchangeInformations?.getExchangeInformationByUserId[0])
                  //   { // @ts-ignore
                  //      exchangeResult = await saveExchangeInformation({input:{blogUrl:values.blogUrl|| "",twitter:values.twitter|| "",comment:values.ownerComment|| "",interested:values.ownerInterested|| "",trouble:values.ownerTrouble|| "",userId:data?.userDetails?.id}})
                  //   }
                  //   else { // @ts-ignore
                  //     exchangeResult= await updateExchangeInformation({input:{blogUrl:values.blogUrl|| "",twitter:values.twitter|| "",comment:values.ownerComment|| "",interested:values.ownerInterested|| "",trouble:values.ownerTrouble|| "",userId:data?.userDetails?.id}})
                  //   }
                  //
                  //   if (!values.ownerGender) {
                  //     toast({
                  //       title: "必須",
                  //       description: "性別は必須です",
                  //       position: "top-right",
                  //       status: "error",
                  //       duration: 9000,
                  //       isClosable: true,
                  //     });
                  //   }else {
                  //
                  //     // @ts-ignore
                  //     // @ts-ignore
                  //     userResult = await updateOwnerInfo({ input: {
                  //         companyName: values?.OwnerCompanyName,
                  //         firstName: values?.ownerFirstName,
                  //         lastName: values?.ownerLastName,
                  //         nickname: values?.ownerNickname,
                  //         gender: values?.ownerGender,
                  //         address: editAddress ? companyAddress : initialValues.ownerAddress,
                  //         phoneNumber: values?.ownerPhoneNumber,
                  //         DOB: values?.ownerDOB,
                  //         ownerType: values?.ownerType,
                  //         lat:editAddress ? markerCenter.lat : initialValues.ownerLat,
                  //         lng:editAddress ? markerCenter.lng : initialValues.ownerLng
                  //       },
                  //     });
                  //
                  //   }
                  //
                  //
                  // } else {
                  //
                  //   if (!values.repGender) {
                  //     toast({
                  //       title: "必須",
                  //       description: "性別は必須です",
                  //       position: "top-right",
                  //       status: "error",
                  //       duration: 9000,
                  //       isClosable: true,
                  //     });
                  //   }else{
                  //
                  //     // @ts-ignore
                  //     // @ts-ignore
                  //     userResult =  await updateMaintainerInfo({
                  //       input: {
                  //         // name: values?.repCompanyName,
                  //         address: values?.maintainerAddress,
                  //         phoneNumber: values?.maintainerPhoneNumber,
                  //         firstName:values?.repFirstName,
                  //         lastName:values?.repLastName,
                  //         nickname:values?.maintainerName,
                  //         intro:values?.intro,
                  //         lat:editAddress ? markerCenter.lat : initialValues.companyAddLat,
                  //         lng:editAddress ? markerCenter.lng : initialValues.companyAddLng,
                  //         representative: {
                  //           nickname:values?.repNickName,
                  //           companyName: values?.repCompanyName,
                  //           firstName:values?.repFirstName,
                  //           lastName:values?.repLastName,
                  //           gender: values?.repGender,
                  //           DOB: values?.repDOB,
                  //           address: editAddress ? companyAddress : initialValues.companyAddress,
                  //           phoneNumber: values?.repPhoneNumber,
                  //         },
                  //       },
                  //     });
                  //   }
                  //
                  //
                  // }
                  // console.log("values.bankType==",values.bankType)
                  //
                  // if ((values.bankType === "Bank" ||
                  //     values.bankType === "Shinkin Bank" ||
                  //     values.bankType === "Credit Union" ||
                  //     values.bankType === "Agricultural Cooperative" ||
                  //     values.bankType === "Others") &&
                  //     (values.depositItem === "Ordinary" ||
                  //         values.depositItem === "Checking" ||
                  //         values.depositItem === "Savings" ||
                  //         values.depositItem === "Others"
                  //     )) {
                  //
                  //   // @ts-ignore
                  //   if (!bankDetails?.getBankDetailsByUserId[0]) {
                  //
                  //     // if (!values.bankName) errors.bankName= "必要";
                  //     // if (!values.branchName) errors.branchName= "必要";
                  //     // if (!values.depositItem) errors.depositItem= "必要";
                  //     // if (!values.accountNumber) errors.accountNumber= "必要";
                  //     // if (!values.accountHolderKanji) errors.accountHolderKanji= "必要";
                  //     // if (!values.accountHolderHiragana) errors.accountHolderHiragana= "必要";
                  //     // if (!values.bankType.value) errors.bankType= "必要";
                  //     // // if (!values.ownerPhoneNumber) errors.ownerPhoneNumber= "必要";
                  //     // // if (!companyAddress) errors.companyAddress= "必要";
                  //     //
                  //     if (!values.bankType || !values.depositItem) {
                  //       toast({
                  //         title: "必須",
                  //         description: "銀行タイプが必要です",
                  //         position: "top-right",
                  //         status: "error",
                  //         duration: 9000,
                  //         isClosable: true,
                  //       });
                  //     } else {
                  //
                  //     if (!values.bankName || !values.branchName || !values.depositItem || !values.accountNumber || !values.accountNameKanji || !values.accountNameHiragana || !values.bankType) {
                  //       toast({
                  //         title: "銀行の詳細",
                  //         description: "銀行口座情報が必要です",
                  //         position: "top-right",
                  //         status: "error",
                  //         duration: 9000,
                  //         isClosable: true,
                  //       });
                  //     } else {
                  //       // @ts-ignore
                  //       bankResult = await saveBankDetails({input: {bankName: values.bankName || "", branchName: values.branchName || "", depositItem: values.depositItem || "", accountNumber: values.accountNumber.toString() || "", accountHolderKanji: values.accountNameKanji || "", accountHolderHiragana: values.accountNameHiragana || "", userId: data?.userDetails.id, bankType: values.bankType || ""
                  //         }
                  //       })
                  //     }
                  //   }
                  //     // if (!values.branchName) errors.branchName= "必要";
                  //     // if (!values.depositItem) errors.depositItem= "必要";
                  //     // if (!values.accountNumber) errors.accountNumber= "必要";
                  //     // if (!values.accountNameKanji) errors.accountHolderKanji= "必要";
                  //     // if (!values.accountNameHiragana) errors.accountHolderHiragana= "必要";
                  //     // if (!values.bankType) errors.bankType= "必要";
                  //
                  //   } else {
                  //
                  //     if (!values.bankType || !values.depositItem) {
                  //       toast({
                  //         title: "必須",
                  //         description: "銀行タイプが必要です",
                  //         position: "top-right",
                  //         status: "error",
                  //         duration: 9000,
                  //         isClosable: true,
                  //       });
                  //     }else{
                  //       if (!values.bankName || !values.branchName || !values.depositItem || !values.accountNumber || !values.accountNameKanji || !values.accountNameHiragana || !values.bankType) {
                  //         toast({
                  //           title: "銀行の詳細",
                  //           description: "銀行口座情報が必要です",
                  //           position: "top-right",
                  //           status: "error",
                  //           duration: 9000,
                  //           isClosable: true,
                  //         });
                  //       } else {
                  //         // @ts-ignore
                  //         bankResult = await updateBankDetails({input: {bankName: values.bankName || "", branchName: values.branchName || "", depositItem: values.depositItem || "", accountNumber: values.accountNumber.toString() || "", accountHolderKanji: values.accountNameKanji || "", accountHolderHiragana: values.accountNameHiragana || "", userId: data?.userDetails?.id, bankType: values.bankType || ""
                  //           }
                  //         })
                  //         // console.log("updateResult====>>>", updateResult)
                  //       }
                  //     }
                  //
                  //   }
                  //
                  //   // if (!values.ownerGender && !values.repGender){
                  //   //
                  //   // }else{
                  //   //   toast({
                  //   //     title: "ユーザーの詳細",
                  //   //     description: "ユーザー詳細の更新成功",
                  //   //     position: "top-right",
                  //   //     status: "success",
                  //   //     duration: 9000,
                  //   //     isClosable: true,
                  //   //   });
                  //   // }
                  //
                  //
                  //
                  // }
                  // // else{
                  // //   toast({
                  // //     title: "必須",
                  // //     description: "銀行タイプと預金項目が必要です",
                  // //     position: "top-right",
                  // //     status: "error",
                  // //     duration: 9000,
                  // //     isClosable: true,
                  // //   });
                  // // }
                  //
                  // // @ts-ignore
                  // console.log("exchangeResult====...",exchangeResult)
                  // console.log("userResult====...",userResult)
                  // console.log("bankResult====...",bankResult)
                  //
                  // @ts-ignore
                  // if ((exchangeResult?.data?.updateExchangeInformation?.errors === null || exchangeResult?.data?.saveExchangeInformation?.errors === null) && (userResult.data.updateOwnerInfo === true || userResult.data.updateMaintainerInfo === true) &&( bankResult.data.updateBankDetails.errors=== null || bankResult.data.saveBankDetails.errors=== null) )
                  //       toast({
                  //         title: "ユーザーの詳細",
                  //         description: "ユーザー詳細の更新成功",
                  //         position: "top-right",
                  //         status: "success",
                  //         duration: 9000,
                  //         isClosable: true,
                  //       });
                  // else
                  //       toast({
                  //         title: "エラー",
                  //         description: "詳細の保存中にエラーが発生しました",
                  //         position: "top-right",
                  //         status: "error",
                  //         duration: 9000,
                  //         isClosable: true,
                  //       });




                  console.log(values);

                  initialValues=values
                }

            }

             initialValues={initialValues}>

              {({ isSubmitting, values, handleChange, submitForm }) => (
                <Form>

                  {/*<Text fontSize={"larger"} fontWeight={"bold"}></Text>*/}
                  {ownerInfo ? (
                          <InputSection sectionTitle="ユーザーアカウント情報">
                    <Box
                      shadow={"lg"}
                      rounded={"lg"}
                      px={[10, 30]}
                      py={[5, 10]}
                      my={[5, 10]}
                    >
                      <InputCheckBox
                          disabled={!editMode}
                          name="ownerType"
                          // value={values.ownerType}
                          options={[
                            { label: "個人オーナー", value: OwnerType.Individual },
                            { label: "法人オーナー", value: OwnerType.Corporate },
                            {
                              label: "管理受託会社",
                              value: OwnerType.ManagementCompany,
                            },
                          ]}
                          helperText="1つを選択してください"
                          defaultValue={values.ownerType}
                      />

                      <InputField
                        placeholder="会社名／屋号"
                        label="会社名／屋号"
                        helperText="非公開"
                        // notes="・個人で屋号の無い方はなしと記入"
                        name="OwnerCompanyName"
                        disabled={!editMode}
                        value={values.OwnerCompanyName}
                      />
                      <HStack>
                        <Text>氏名</Text>
                        <Text>非公開</Text>
                        {/*<Text>非公開</Text>*/}
                        <Spacer />
                        <Text>・担当者</Text>
                      </HStack>
                      <SimpleGrid columns={2}>
                        <InputField
                            label=""
                            placeholder="姓"
                            name="ownerLastName"
                            disabled={!editMode}
                            value={values.ownerLastName}
                        />
                        <InputField
                            label=""
                            placeholder="名"
                            name="ownerFirstName"
                            disabled={!editMode}
                            value={values.ownerFirstName}
                        />
                      </SimpleGrid>
                      {/*<InputField*/}
                      {/*  label="氏名"*/}
                      {/*  name="ownerFirstName"*/}
                      {/*  disabled={!editMode}*/}
                      {/*  value={values.ownerFirstName}*/}
                      {/*/>*/}
                      {/*<InputField*/}
                      {/*  label="苗字"*/}
                      {/*  name="ownerLastName"*/}
                      {/*  disabled={!editMode}*/}
                      {/*  value={values.ownerLastName}*/}
                      {/*/>*/}
                      <InputField
                        label="ニックネーム"
                        placeholder="ニックネーム"
                        helperText="公開（チャット等で使用します）"
                        notes="・担当者"
                        name="ownerNickname"
                        disabled={!editMode}
                        value={values.ownerNickname}
                      />
                      <HStack>
                        <Text>性別</Text>
                        <Text>非公開</Text>
                        <Spacer />
                        <Text>・担当者</Text>
                      </HStack>
                      <Select
                          name="ownerGender"
                          placeholder="性別"
                          id="ownerGender"
                          value={values.ownerGender}
                          onChange={handleChange}
                          disabled={!editMode}
                      >
                        <option value="male">男性</option>
                        <option value="female">女性</option>
                      </Select>
                      <HStack>
                        <Text>生年月日</Text>
                        <Text>非公開</Text>
                        <Spacer />
                        <Text>・担当者</Text>
                      </HStack>

                      <Input
                        type="date"
                        name="ownerDOB"
                        id="ownerDOB"
                        value={values.ownerDOB}
                        onChange={handleChange}
                        disabled={!editMode}
                      />

                      <InputField
                          name="ownerPhoneNumber"
                          placeholder="電話番号"
                          label="電話番号"
                          helperText="非公開"
                          notes="・担当者"
                          disabled={!editMode}
                      />
                      {/*<InputField*/}
                      {/*  label="住所"*/}
                      {/*  helperText="公開（アイコン等で表示されます）"*/}
                      {/*  name="ownerAddress"*/}
                      {/*  disabled={!editMode}*/}
                      {/*/>*/}
                      <HStack>
                        {/*<Text>住所</Text>*/}
                        <Text>住所（公開・アイコン等で表示されます {initialValues.ownerAddress}
                          {/*.変更した場合は、下のテキストボックスで検索してください。*/}
                        </Text>
                        {/*<Text>変更した場合は、下のテキストボックスで検索してください。</Text>*/}
                      </HStack>
                      {/*<HStack>*/}
                      {/*  <Text>住所</Text>*/}
                      {/*  <Text>公開（アイコン等で表示されます）</Text>*/}
                      {/*</HStack>*/}
                      <Input
                          // type="text"
                          id="ownerAddress"
                          // label="住所"
                          // helperText="公開（アイコン等で表示されます）"
                          // value={searchBox.current || ""}
                          onChange={(e) => setCompanyAddress(e.target.value)}
                          name="ownerAddress"
                          disabled={!editMode}
                          ref={searchBox}
                      />
                      {mapSelection("owner")}

                    </Box>
                          </InputSection>
                  ) : (
                    ""
                  )}

                  {maintainerInfo ? (
                          <InputSection sectionTitle="ユーザーアカウント情報">
                    <Box
                      shadow={"lg"}
                      rounded={"lg"}
                      px={[10, 30]}
                      py={[5, 10]}
                      my={[5, 10]}
                    >
                      {/*<Text fontSize={"larger"} fontWeight={"bold"}>業者</Text>*/}
                      <Divider />
                      <InputField
                          placeholder="会社名／屋号"
                          label="会社名／屋号"
                          helperText="公開（チャット等で使用します）"
                          // notes="・個人で屋号の無い方はなしと記入"
                        name="maintainerName"
                        disabled={!editMode}
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
                            disabled={!editMode}
                        />
                        <InputField
                            name="repFirstName"
                            placeholder="名"
                            label=""
                            disabled={!editMode}
                        />
                      </SimpleGrid>
                      <InputField
                          name="repNickName"
                          label="ニックネーム"
                          placeholder="ニックネーム"
                          helperText="非公開"
                          notes="・担当者"
                          disabled={!editMode}
                      />
                      {/*<FormControl display="flex" alignItems="center">*/}
                      {/*  <FormLabel htmlFor="gender" mb="0">*/}
                      {/*    性別*/}
                      {/*  </FormLabel>*/}
                      {/*</FormControl>*/}
                      <HStack>
                        <Text>性別</Text>
                        <Text>非公開</Text>
                        <Spacer />
                        <Text>・担当者</Text>
                      </HStack>
                      <Select
                          name="repGender"
                          placeholder="Gender"
                          id="repGender"
                          value={values.repGender}
                          onChange={handleChange}
                          disabled={!editMode}
                      >
                        <option value="male">男性</option>
                        <option value="female">女性</option>
                      </Select>
                      <HStack>
                        <Text>生年月日</Text>
                        <Text>非公開</Text>
                        <Spacer />
                        <Text>・担当者</Text>
                      </HStack>

                      <Input
                          type="date"
                          name="repDOB"
                          id="repDOB"
                          value={values.repDOB}
                          onChange={handleChange}
                          disabled={!editMode}
                      />
                      <InputField
                          name="maintainerPhoneNumber"
                          placeholder="Phone number"
                          label="電話番号"
                          disabled={!editMode}
                          helperText="非公開"
                          notes="・担当者"
                      />
                      <InputField
                        label=" 住所"
                        name="maintainerAddress"
                        disabled={!editMode}
                        helperText="非公開"
                        notes="・担当者"
                      />

                    </Box>
                          </InputSection>
                  ) : (
                    ""
                  )}




                  <Divider/>
                  {maintainerInfo || ownerInfo ? (
                      <InputSection sectionTitle="エコピアからお客様へ振り込む際の口座情報">
                  <Box
                      shadow={"lg"}
                      rounded={"lg"}
                      px={[10, 30]}
                      py={[5, 10]}
                      my={[5, 10]}
                  >
                    <Divider />

                    {/*<HStack>*/}
                      {/*<Text>生年月日</Text>*/}
                      {/*<Text>非公開</Text>*/}
                      {/*<Spacer />*/}
                      {/*<Text>・担当者</Text>*/}
                    {/*<SimpleGrid columns={2}>*/}
                    {/*  <VStack>*/}
                      <InputField
                          label="銀行名"
                          name="bankName"
                          disabled={!editMode}
                          placeholder="金融機関名"
                          // required={true}
                      />
                      {/*</VStack>*/}
                      {/*<VStack>*/}
                      <FormControl display="flex" alignItems="center">
                        <FormLabel htmlFor="bankType" mb="1">
                          金融機関種別
                        </FormLabel>
                      </FormControl>
                      <Select
                          name="bankType"
                          placeholder="金融機関種別"
                          id="bankType"
                          value={values.bankType}
                          onChange={handleChange}
                          disabled={!editMode}
                          required={true}
                      >
                        <option value="Bank">銀行</option>
                        <option value="Shinkin Bank">信金</option>
                        <option value="Credit Union">信組</option>
                        <option value="Agricultural Cooperative">農協</option>
                        <option value="Others">その他</option>
                      </Select>
                    {/*  </VStack>*/}
                    {/*</SimpleGrid>*/}

                    {/*</HStack>*/}
                    {/*<FormControl display="flex" alignItems="center">*/}
                    {/*  <FormLabel htmlFor="bankName" mb="0">*/}
                    {/*    銀行名*/}
                    {/*  </FormLabel>*/}
                    {/*</FormControl>*/}
                    {/*<Select*/}
                    {/*    name="bankName"*/}
                    {/*    placeholder="銀行名"*/}
                    {/*    id="bankName"*/}
                    {/*    value={values.bankName}*/}
                    {/*    onChange={handleChange}*/}
                    {/*    disabled={!editMode}*/}
                    {/*>*/}
                    {/*  <option value="Bank">銀行</option>*/}
                    {/*  <option value="Shinkin Bank">信金</option>*/}
                    {/*  <option value="Credit Union">信組</option>*/}
                    {/*  <option value="Agricultural Cooperative">農協</option>*/}
                    {/*  <option value="Others">その他</option>*/}
                    {/*</Select>*/}
                    <InputField
                        label="支店名"
                        name="branchName"
                        disabled={!editMode}
                        required={true}
                    />
                    <FormControl display="flex" alignItems="center">
                      <FormLabel htmlFor="depositItem" mb="0">
                        預金種目
                      </FormLabel>
                    </FormControl>
                    <Select
                        name="depositItem"
                        placeholder="預金種目"
                        id="depositItem"
                        value={values.depositItem}
                        onChange={handleChange}
                        disabled={!editMode}
                        required={true}
                    >
                      <option value="Ordinary">普通</option>
                      <option value="Checking">当座</option>
                      <option value="Savings">貯蓄</option>
                      <option value="Others">その他</option>
                    </Select>
                    <InputField
                        label="口座番号"
                        name="accountNumber"
                        disabled={!editMode}
                        type={"number"}
                        required={true}
                    />
                    <InputField
                        label="口座名義人(漢字)"
                        name="accountNameKanji"
                        disabled={!editMode}
                        required={true}
                    />
                    <InputField
                        name="accountNameHiragana"
                        placeholder="口座名義人(フリガナ)"
                        label="口座名義人(フリガナ)"
                        disabled={!editMode}
                        required={true}
                    />
                  </Box>
                      </InputSection>
                      ):""}

                <Divider/>

                  {representativeInfo ? (
                      <InputSection sectionTitle="会社情報　（ユーザーアカウント詳細と重複する場合も再度ご記入ください）">

                        <Box
                            shadow={"lg"}
                            rounded={"lg"}
                            px={[10, 30]}
                            py={[5, 10]}
                            my={[5, 10]}
                        >
                          <Text fontSize={"larger"} fontWeight={"bold"}>代表者情報</Text>
                          <Divider />
                          <InputField
                              label="代表者氏名"
                              // helperText="公開(チャットで使用します）"
                              // notes="・個人で屋号の無い方は氏名を記入"
                              placeholder="会社紹介"
                              name="repCompanyName"
                              disabled={!editMode}
                          />
                          <InputTextArea
                              name="intro"
                              label="会社紹介"
                              helperText="公開"
                              placeholder="例）
              　           （仕事）草刈・パネル洗浄
              　             （場所）〇〇県全域　　　
              　　            丁寧な仕事を心がけます。"
                              required
                              disabled={!editMode}
                          />

                          <InputField
                              name="repPhoneNumber"
                              placeholder="Phone number"
                              label="会社の電話番号"
                              disabled={!editMode}
                              helperText="非公開"
                          />
                          {/*<InputField*/}
                          {/*  label="住所"*/}
                          {/*  name="repAddress"*/}
                          {/*  disabled={!editMode}*/}
                          {/*/>*/}
                          <HStack>
                            {/*<Text>住所</Text>*/}
                            <Text>住所　（公開・アイコン等で表示されます） {initialValues.companyAddress} .
                              {/*変更した場合は、下のテキストボックスで検索してください。*/}
                            </Text>
                            {/*<Text>変更した場合は、下のテキストボックスで検索してください。</Text>*/}
                          </HStack>
                          {/*<HStack>*/}
                          {/*  <Text>会社の住所</Text>*/}
                          {/*  <Text>住所　　（公開･アイコン等で表示されます）</Text>*/}
                          {/*</HStack>*/}
                          <Input
                              type="text"
                              id="companyAddress"
                              // label="会社／屋号の住所"
                              // value={searchBox.current || ""}
                              onChange={(e) => setCompanyAddress(e.target.value)}
                              name="companyAddress"
                              disabled={!editMode}
                              // helperText="住所　　（公開･アイコン等で表示されます）"
                              ref={searchBox}
                          />
                          {/*<Input*/}
                          {/*    type="text"*/}
                          {/*    id="companyAddress"*/}
                          {/*    value={representativeInfo?.address || companyAddress}*/}
                          {/*    onChange={(e) => setCompanyAddress(e.target.value)}*/}
                          {/*    name="companyAddress"*/}
                          {/*    ref={searchBox}*/}
                          {/*/>*/}
                          {mapSelection("maintainer")}


                        </Box>
                      </InputSection>
                  ) : (
                      ""
                  )}

                  {ownerInfo ? (
                      <InputSection sectionTitle="オーナー同士交流情報">
                        <Box
                            shadow={"lg"}
                            rounded={"lg"}
                            px={[10, 30]}
                            py={[5, 10]}
                            my={[5, 10]}
                        >
                          <Divider />
                          <InputField
                              label="ブログURL"
                              name="blogUrl"
                              disabled={!editMode}
                          />
                          <InputField
                              label="Twitter/インスタ等"
                              name="twitter"
                              disabled={!editMode}
                          />
                          <InputTextArea
                              name="ownerComment"
                              label="一言コメント"
                              placeholder="#釣り　＃音楽鑑賞"
                              disabled={!editMode}
                          />
                          <InputTextArea
                              name="ownerInterested"
                              label="興味のあること"
                              placeholder="#釣り　＃音楽鑑賞"
                              disabled={!editMode}
                          />
                          <InputTextArea
                              name="ownerTrouble"
                              label="困っていること"
                              placeholder="#ソーラーシェアリング　#パワコン停止 #パネルの汚れ"
                              disabled={!editMode}
                          />

                        </Box>


                      </InputSection>


                  ):("")}




                  <HStack mb={5}>
                    <Button
                      disabled={editMode}
                      onClick={() => setEditMode(true)}
                    >
                      {" "}
                      編集する
                    </Button>
                    <Button
                      disabled={!editMode}
                      onClick={() => submitClickHandler(submitForm)}
                    >
                      保存する
                    </Button>
                    <Button
                      // disabled={!editMode}
                      onClick={() => checkDeleteUserHandler()}
                        colorScheme={"blue"}
                    >
                      退会する
                    </Button>
                  </HStack>
                </Form>
              )}
            </Formik>
          </Box>
        )}
      </Box>
        </Box>
      </Delayed>

    </MainLayout>

  );
};

export default index;
