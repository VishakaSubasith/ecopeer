import {
  Button,
  Heading,
  HStack,
  Center,
  Box,
  Flex,
  Tooltip,
  Text,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import JobsTable from "../../../../components/Job/JobsTable";
import MainLayout from "../../../../components/Layout/MainLayout";
import {
  useOwnerJobsQuery,
  useOpenJobMutation,
  JobStatus,
} from "../../../../generated/graphql";
import NextLink from "next/link";
import { useRouter } from "next/router";

interface myJobsProps {}

interface TopBar {
  status: JobStatus;
  title: string;
  description: string;
  helperText?: string;
}

const topBar: TopBar[] = [
  {
    status: JobStatus.Expired,
    title: "期限切れ",
    description:
      "応募期限内に発注まで至らなかった仕事一覧です。期限を更新し再公募できます。",
  },
  {
    status: JobStatus.Draft,
    title: "①下書保存中",
    description: "下書保存中の仕事です。編集して登録してください。",
  },
  {
    status: JobStatus.Registered,
    title: "②登録済",
    description: "登録済の仕事です。公募することができます。",
  },
  {
    status: JobStatus.Open,
    title: "③公募中",
    description:
      "公募中の仕事です。適宜応募者とチャットで商談をし発注して下さい。発注前に応募期限を迎えると期限切れとなります。",
  },
  {
    status: JobStatus.TempPayment,
    title: "④仮払",
    description:
      "仮払ステータスです。代金を支払ってください。エコピアが一時預かりを致します。",
  },
  {
    status: JobStatus.WaitingForCompletion,
    title: "⑤仕事完了連絡待ち",
    description: "業者さんからの仕事完了の連絡を待っています。",
  },
  {
    status: JobStatus.OrdererEvaluation,
    title: "⑥発注者評価",
    description:
      "業者さんの評価をしてください。評価した時点で業者さんに報酬が支払われる手続きが開始されます。",
  },
  {
    status: JobStatus.ContractorEvaluation,
    title: "⑦受注者評価",
    description: "業者さんによるオーナー評価待ちです。",
  },
  {
    status: JobStatus.Completed,
    title: "⑧完了",
    description:
      "仕事の全ステータスが完了しました。後ほど利用規約に沿って、業者様へエコピアより報酬が支払われます。",
  },
];

const MyJobs: React.FC<myJobsProps> = ({}) => {
  const router = useRouter();
  const queryJobId = router.query?.jobId
    ? parseInt(router.query?.jobId as string)
    : null;

  const [show, setShow] = useState(true);

  useEffect(() => {
    let timer = setTimeout(() => setShow(false), 10 * 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!show && queryJobId) {
      router.push("/user/owner/job");
    }
  }, [queryJobId, router, show]);

  const [{ data, fetching }, getOwnerJobs] = useOwnerJobsQuery({
    requestPolicy: "network-only",
  });
  const [, openJob] = useOpenJobMutation();

  const [selectedStatus, setSelectedStatus] = useState<JobStatus>();
  let jobs = data?.ownerJobs.filter((job) =>
    selectedStatus ? job.status === selectedStatus : true
  );

  const openJobOnClickHandler = async (jobId: number) => {
    await openJob({ jobId: jobId });
    getOwnerJobs({ requestPolicy: "network-only" });
  };

  return (
    <MainLayout showSidebar>
      <Center>
        <Heading>My仕事</Heading>
      </Center>
      <HStack justifyContent={"flex-end"}>
        <NextLink passHref href={"/user/owner/job/add"}>
          <Button>新しい仕事を登録する</Button>
        </NextLink>
      </HStack>

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
        <JobsTable
          jobs={jobs}
          fetching={fetching}
          openJobHandler={openJobOnClickHandler}
          getOwnerJobs={getOwnerJobs}
          highlightRowId={queryJobId}
          selectedStatus={selectedStatus}
        />
      </Box>
    </MainLayout>
  );
};

export default MyJobs;
