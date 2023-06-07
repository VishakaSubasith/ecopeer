import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  HStack,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  IconButton,
  useToast,
  Tooltip,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import LoadingBars from "../../../../components/Core/LoadingBars";
import {
  JobStatus,
  useAddApplicantMutation,
  useAddJobToFavoriteMutation,
  useChatWithOwnerMutation,
  useFavoriteJobsQuery,
  useJobApplicationsQuery,
  useJobMarkCompletedMutation,
  useRemoveJobFromFavoriteMutation,
  useUpdateSuggestedPriceMutation,
} from "../../../../generated/graphql";
import { convertJobStatus } from "../../../../utils/enumMapper";
import { formatDate, formatCurrency } from "../../../../utils/formaters";
import NextLink from "next/link";
import { StarIcon } from "@chakra-ui/icons";
import UpdateSuggestedPriceModal from "../../../../components/Job/UpdateSuggestedPriceModal";
import router, { useRouter } from "next/router";
import MainLayout from "../../../../components/Layout/MainLayout";

interface TopBar {
  status: JobStatus | "Favorite";
  title: string;
  description: string;
  helperText?: string;
}

const topBar: TopBar[] = [
  {
    status: "Favorite",
    title: "お気に入り",
    description: "お気に入りに登録した仕事一覧です。",
  },
  {
    status: JobStatus.Open,
    title: "①応募中",
    description:
      "現在、応募中の仕事です。必要に応じ「応募価格の変更」やオーナーからチャットが届き次第、商談してください。",
    helperText: "（公募中）",
  },
  {
    status: JobStatus.TempPayment,
    title: "②受注済",
    description:
      "オーナーが、あなたに仕事を依頼したものの未決済の状態です。まだ仕事に着手せず、必要に応じチャットでやり取りしてください。",
    helperText: "（仮払待ち）",
  },
  {
    status: JobStatus.WaitingForCompletion,
    title: "③作業中",
    description:
      "オーナーが決済を完了しました。仕事に着手し完了させ、画像・チャット等で報告し、「仕事完了連絡ボタン」を押してください。",
  },
  {
    status: JobStatus.OrdererEvaluation,
    title: "④発注者評価",
    description: "発注者(オーナー)があなたを評価するステータスです。",
  },
  {
    status: JobStatus.ContractorEvaluation,
    title: "⑤受注者評価",
    description: "「評価する」を押し、オーナーを評価してください。",
  },
  {
    status: JobStatus.Completed,
    title: "⑥完了",
    description:
      "仕事の全ステータスが完了しました。後ほど利用規約に沿って、エコピアより代金が支払われます。",
  },
];
interface jobDashboardProps {}

const JobDashboard: React.FC<jobDashboardProps> = ({}) => {
  const router = useRouter();
  const queryAppliedJobId = router.query?.appliedJobId
    ? parseInt(router.query?.appliedJobId as string)
    : null;

  const [show, setShow] = useState(true);

  useEffect(() => {
    let timer = setTimeout(() => setShow(false), 10 * 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!show && queryAppliedJobId) {
      router.push("/user/maintainer/job");
    }
  }, [queryAppliedJobId, router, show]);

  // State
  const [selectedStatus, setSelectedStatus] = useState<
    JobStatus | "Favorite"
  >();
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  const [initialSuggestedPrice, setInitialSuggestedPrice] = useState<
    number | null
  >(null);
  const [currentJobId, setCurrentJobId] = useState<number | null>(null);

  // Queries
  const [{ data, fetching }, getJobApplications] = useJobApplicationsQuery({
    requestPolicy: "cache-and-network",
  });
  const [{ data: dataFavoriteJobs }] = useFavoriteJobsQuery({
    requestPolicy: "cache-and-network",
  });

  // Effects
  useEffect(() => {
    setSelectedStatus(JobStatus.Open);
  }, []);

  const tableBgColor = useColorModeValue("gray.200", "gray.700");

  // Mutations
  const [, jobMarkCompleted] = useJobMarkCompletedMutation();
  const [, updateSuggestedPrice] = useUpdateSuggestedPriceMutation();
  const [, addToFavorite] = useAddJobToFavoriteMutation();
  const [, removeFromFavorite] = useRemoveJobFromFavoriteMutation();
  const [, chatWithOwner] = useChatWithOwnerMutation();
  const [, addApplicant] = useAddApplicantMutation();

  const toast = useToast();

  // Handlers
  const completeOnClickHandler = async (jobId: number) => {
    await jobMarkCompleted({ jobId: jobId });
    getJobApplications();
  };

  const addApplicantHandler = async (jobId: number) => {
    await addApplicant({ jobId });
    router.push("/user/maintainer/job");
  };

  const submitSuggestedPriceHandler = async (
    jobId: number,
    suggestedPrice: number
  ) => {
    const res = await updateSuggestedPrice({
      jobId,
      suggestedPrice,
    });
    if (!res.error) {
      setInitialSuggestedPrice(suggestedPrice);
      onClose();
      toast({
        title: "成功しました",
        description: "応募価格を変更しました",
        position: "top-right",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    } else {
      toast({
        title: "失敗しました",
        description: "希望小売価格の更新に失敗しました",
        position: "top-right",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
    getJobApplications();
  };

  const updateSuggestedPriceHandler = (
    jobId: number,
    initialSuggestedPrice: number
  ) => {
    setIsOpen(true);
    setInitialSuggestedPrice(initialSuggestedPrice);
    setCurrentJobId(jobId);
  };

  const toggleFavoriteHandler = async (isFavorite: boolean, jobId: number) => {
    if (isFavorite) {
      await removeFromFavorite({ jobId });
      getJobApplications();
    } else {
      await addToFavorite({ jobId });
      getJobApplications();
    }
  };

  const chatHandler = async (jobId: number) => {
    const res = await chatWithOwner({ input: { jobId } });
    const channelId = res.data?.chatWithOwner.id;
    router.push({ pathname: "/chat", query: { channelId } });
  };

  return (
    <MainLayout showSidebar>
      <Center my={8}>
        <Heading>Myビジネス</Heading>
      </Center>

      <Box maxWidth={"8xl"} mx={"auto"}>
        <Flex
          justifyContent={"space-between"}
          shadow={"md"}
          rounded={"md"}
          px={4}
          py={2}
          mb={5}
        >
          {topBar.map((item, index) => (
            <Tooltip
              hasArrow
              label={item.description}
              size={"lg"}
              rounded={"md"}
              p={2}
              key={index}
            >
              <Button
                variant={selectedStatus === item.status ? "outline" : "ghost"}
                onClick={() => setSelectedStatus(item.status)}
              >
                {item.title}
                <Text fontSize={"xs"}>{item.helperText}</Text>
              </Button>
            </Tooltip>
          ))}
        </Flex>

        {fetching ? (
          <LoadingBars />
        ) : (
          <Table variant="simple" bgColor={tableBgColor}>
            <Thead>
              <Tr>
                <Th>No</Th>
                <Th>ステータス</Th>
                <Th>タイトル</Th>
                <Th>場所</Th>
                <Th>カテゴリー</Th>
                <Th>応募期限</Th>
                <Th>希望予算</Th>
                <Th>提示額</Th>
                <Th>内容</Th>
              </Tr>
            </Thead>
            <Tbody>
              {selectedStatus === "Favorite" &&
                dataFavoriteJobs?.favoriteJobs.map((job) => (
                  <Tr key={job.id}>
                    <Td>{job.id}</Td>
                    <Td>{convertJobStatus(job.job.status)}</Td>
                    <Td>{job.job.title}</Td>
                    <Td>{job.job.location}</Td>
                    <Td>{job.job.category}</Td>
                    <Td>{formatDate(job.job.applicationDeadline)}</Td>
                    <Td>{formatCurrency(job.job.budget)}</Td>
                    <Td>なし</Td>
                    <Td>
                      <HStack>
                        <>
                          <NextLink passHref href={`/job/${job.job.id}`}>
                            <Button size={"sm"}>詳細</Button>
                          </NextLink>
                          {job.job.status === JobStatus.Open && (
                            <Button
                              size={"sm"}
                              onClick={() => addApplicantHandler(job.job.id)}
                            >
                              仕事に応募する
                            </Button>
                          )}
                        </>
                        <IconButton
                          variant={"outline"}
                          color={"orange.400"}
                          icon={<StarIcon />}
                          aria-label="Favorite"
                          onClick={() =>
                            toggleFavoriteHandler(true, job.job.id)
                          }
                        />
                      </HStack>
                    </Td>
                  </Tr>
                ))}
              {data?.jobApplications.jobApplications
                .filter((jobApplicatin) =>
                  selectedStatus === "Favorite"
                    ? jobApplicatin.isFavorite
                    : jobApplicatin.jobApplication.job.status === selectedStatus
                )
                .map((jobInfo) => (
                  <Tr
                    key={jobInfo.jobApplication.id}
                    border={
                      queryAppliedJobId === jobInfo.jobApplication.job.id
                        ? "3px solid"
                        : "none"
                    }
                    borderColor={"ecoBlue"}
                  >
                    <Td>{jobInfo.jobApplication.job.id}</Td>
                    <Td>
                      {convertJobStatus(jobInfo.jobApplication.job.status)}
                    </Td>
                    <Td>{jobInfo.jobApplication.job.title}</Td>
                    <Td>{jobInfo.jobApplication.job.location}</Td>
                    <Td>{jobInfo.jobApplication.job.category}</Td>
                    <Td>
                      {formatDate(
                        jobInfo.jobApplication.job.applicationDeadline
                      )}
                    </Td>
                    <Td>{formatCurrency(jobInfo.jobApplication.job.budget)}</Td>
                    <Td>
                      {formatCurrency(jobInfo.jobApplication.suggestedPrice)}
                    </Td>
                    <Td>
                      <HStack>
                        <>
                          <NextLink
                            passHref
                            href={`/job/${jobInfo.jobApplication.job.id}`}
                          >
                            <Button size={"sm"}>詳細</Button>
                          </NextLink>
                          {jobInfo.jobApplication.job.status ===
                            JobStatus.Open && (
                            <Button
                              size={"sm"}
                              onClick={() =>
                                updateSuggestedPriceHandler(
                                  jobInfo.jobApplication.job.id,
                                  jobInfo.jobApplication.suggestedPrice
                                )
                              }
                            >
                              応募価格を変更
                            </Button>
                          )}
                          {jobInfo.jobApplication.job.status ===
                            JobStatus.WaitingForCompletion && (
                            <Button
                              size={"sm"}
                              onClick={() =>
                                completeOnClickHandler(
                                  jobInfo.jobApplication.job.id
                                )
                              }
                            >
                              仕事完了連絡ボタン
                            </Button>
                          )}
                          {jobInfo.jobApplication.job.status ===
                            JobStatus.ContractorEvaluation && (
                            <NextLink
                              passHref
                              href={`/user/maintainer/job/${jobInfo.jobApplication.job.id}/evaluation`}
                            >
                              <Button size={"sm"}>評価する</Button>
                            </NextLink>
                          )}
                        </>
                        {jobInfo.jobApplication.job.status ===
                          JobStatus.TempPayment ||
                        jobInfo.jobApplication.job.status ===
                          JobStatus.WaitingForCompletion ||
                        jobInfo.jobApplication.job.status ===
                          JobStatus.OrdererEvaluation ||
                        jobInfo.jobApplication.job.status ===
                          JobStatus.ContractorEvaluation ||
                        jobInfo.jobApplication.job.status ===
                          JobStatus.Completed ? (
                          <Button
                            onClick={() =>
                              chatHandler(jobInfo.jobApplication.job.id)
                            }
                            size={"sm"}
                            rounded={"lg"}
                          >
                            チャット
                          </Button>
                        ) : null}
                        <IconButton
                          variant={"outline"}
                          color={jobInfo.isFavorite ? "orange.400" : "gray"}
                          icon={<StarIcon />}
                          aria-label="Favorite"
                          onClick={() =>
                            toggleFavoriteHandler(
                              jobInfo.isFavorite,
                              jobInfo.jobApplication.job.id
                            )
                          }
                        />
                      </HStack>
                    </Td>
                  </Tr>
                ))}
            </Tbody>
          </Table>
        )}

        <UpdateSuggestedPriceModal
          initialSuggesterPrice={initialSuggestedPrice}
          jobId={currentJobId}
          submitSuggestedPriceHandler={submitSuggestedPriceHandler}
          isOpen={isOpen}
          onClose={onClose}
        />
      </Box>
    </MainLayout>
  );
};

export default JobDashboard;
