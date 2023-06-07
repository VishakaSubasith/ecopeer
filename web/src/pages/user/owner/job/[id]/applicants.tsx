import { Box, Button, Link, Text, useDisclosure } from "@chakra-ui/react";
import React, { useState } from "react";
import MainLayout from "../../../../../components/Layout/MainLayout";
import {
  JobStatus,
  useApproveApplicantMutation,
  useCreateChannelMutation,
  useInitializeTransactionMutationMutation,
  UserType,
  useShowApplicantsQuery,
} from "../../../../../generated/graphql";
import { useGetIntId } from "../../../../../utils/useGetIntId";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { convertJobStatus } from "../../../../../utils/enumMapper";
import RatingModal from "../../../../../components/User/ratingModal";
import AcceptApplicantModal from "../../../../../components/User/AcceptApplicantModal";
import { formatCurrency } from "../../../../../utils/formaters";

interface applicantsProps {}

const Applicants: React.FC<applicantsProps> = ({}) => {
  const jobId = useGetIntId();

  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [currentMaintainerId, setCurrentMaintainerId] = useState<number>(-1);
  const [currentMaintainerName, setCurrentMaintainerName] =
    useState<string>("");
  const [currentMaintainerAddress, setCurrentMaintainerAddress] = useState<
    string | null | undefined
  >("");

  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [currentSuggestedPrice, setCurrentSuggestedPrice] = useState(0);
  const [currentMaintainerProfileId, setCurrentMaintainerProfileId] =
    useState(-1);

  const onConfirmationOpen = (
    maintainerId: number,
    maintainerName: string,
    suggestedPrice: number
  ) => {
    setCurrentMaintainerProfileId(maintainerId);
    setCurrentMaintainerName(maintainerName);
    setCurrentSuggestedPrice(suggestedPrice);
    setIsConfirmationOpen(true);
  };
  const onConfirmationClose = () => {
    setCurrentMaintainerProfileId(-1);
    setCurrentMaintainerName("");
    setCurrentSuggestedPrice(0);
    setIsConfirmationOpen(false);
  };

  const onOpen = (
    maintainerId: number,
    maintainerName: string,
    maintainerAddress: string | undefined | null
  ) => {
    setCurrentMaintainerId(maintainerId);
    setCurrentMaintainerName(maintainerName);
    setCurrentMaintainerAddress(maintainerAddress);
    setIsOpen(true);
  };
  const onClose = () => {
    setCurrentMaintainerId(-1);
    setCurrentMaintainerName("");
    setCurrentMaintainerAddress("");
    setIsOpen(false);
  };

  // queries
  const [{ data }, showApplicants] = useShowApplicantsQuery({
    variables: { jobId: jobId },
    requestPolicy: "network-only",
  });
  // mutations
  const [, createChannel] = useCreateChannelMutation();

  const [, approveApplicant] = useApproveApplicantMutation();
  const [{ data: transactionData }, initializeTransaction] =
    useInitializeTransactionMutationMutation();

  //  Handlers
  const approveHandler = async (maintainerId: number) => {
    await createChannel({ otherUserId: maintainerId, jobId });
    await approveApplicant({
      maintainerId: maintainerId,
      jobId: data?.showApplicants.id!,
    });
    router.push(`/user/owner/job?jobId=${data?.showApplicants.id}`);
  };

  const chatHandler = async (maintainerId: number) => {
    const res = await createChannel({ otherUserId: maintainerId, jobId });
    const channelId = res.data?.createChannel.id;
    router.push({ pathname: "/chat", query: { channelId } });
  };

  return (
    <MainLayout showSidebar>
      <Box>
        <Text>No: {data?.showApplicants.id}</Text>
        <Text>タイトル：{data?.showApplicants.title}</Text>
        <Text>カテゴリ：{data?.showApplicants.category}</Text>
        <Text>
          {data?.showApplicants.status
            ? convertJobStatus(data?.showApplicants.status)
            : "unknown"}
        </Text>
        {data?.showApplicants.jobApplications?.map((applications) => (
          <Box shadow={"lg"} p={6} rounded={"lg"} key={applications.id}>
            <Text>
              会社名：
              <Link
                color={"blue"}
                onClick={() =>
                  onOpen(
                    applications.solarPowerPlantMaintainer.user.id,
                    applications.solarPowerPlantMaintainer.name,
                    applications.solarPowerPlantMaintainer.address
                  )
                }
              >
                {applications.solarPowerPlantMaintainer.name}
              </Link>
            </Text>
            <Text>{applications.solarPowerPlantMaintainer.intro}</Text>
            {/* <Text>{applications.solarPowerPlantMaintainer.phoneNumber}</Text> */}
            <Text>
              会社住所：{applications.solarPowerPlantMaintainer.address}
            </Text>
            <Text>希望予算: {formatCurrency(data.showApplicants.budget)}</Text>
            <Text>応募価格: {formatCurrency(applications.suggestedPrice)}</Text>
            {data.showApplicants.status === JobStatus.Open ? (
              <>
                {/* <NextLink href="/job/payment" passHref> */}
                <Button
                  onClick={() =>
                    onConfirmationOpen(
                      applications.solarPowerPlantMaintainer.id,
                      applications.solarPowerPlantMaintainer.name,
                      applications.suggestedPrice
                    )
                  }
                >
                  上記の金額でこの業者さんに発注する
                  {formatCurrency(applications.suggestedPrice)}
                </Button>
                {/* </NextLink> */}
                <Text mt={2}>
                  ※詳細のお取り決めは、チャットを使用することをおすすめします。
                </Text>
              </>
            ) : (
              ""
            )}
            <Button
              onClick={() =>
                chatHandler(applications.solarPowerPlantMaintainer.user.id)
              }
              m={4}
            >
              チャットする
            </Button>
          </Box>
        ))}
      </Box>
      <AcceptApplicantModal
        isOpen={isConfirmationOpen}
        onClose={onConfirmationClose}
        approveHandler={approveHandler}
        budget={data?.showApplicants.budget}
        suggestedPrice={currentSuggestedPrice}
        jobId={data?.showApplicants.id}
        maintainerId={currentMaintainerProfileId}
        maintainerName={currentMaintainerName}
      />
      <RatingModal
        isOpen={isOpen}
        onClose={onClose}
        userId={currentMaintainerId}
        maintainerName={currentMaintainerName}
        maintainerAddress={currentMaintainerAddress}
        userType={UserType.Maintainer}
      />
    </MainLayout>
  );
};

export default Applicants;
