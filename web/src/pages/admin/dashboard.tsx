import { Button, Heading, Center, Box, Flex } from "@chakra-ui/react";
import React, { useState } from "react";
import { JobStatus, useAllJobsQuery } from "../../generated/graphql";
import { useAdminAuth } from "../../utils/useAdminAuth";
import AdminLayout from "../../components/Layout/AdminLayout";
import AdminJobTable from "../../components/Job/AdminJobTable";

interface dashboardProps {}

const Dashboard: React.FC<dashboardProps> = ({}) => {
  useAdminAuth();
  const [{ data, fetching }, getJobs] = useAllJobsQuery({
    requestPolicy: "network-only",
  });

  const [selectedStatus, setSelectedStatus] = useState<JobStatus>();
  let jobs = data?.allJobs.filter((job) =>
    selectedStatus ? job.status === selectedStatus : true
  );

  return (
    <AdminLayout>
      <Center>
        <Heading>Admin</Heading>
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
          <Button
            variant={"ghost"}
            onClick={() => setSelectedStatus(JobStatus.Draft)}
          >
            ①下書保存中
          </Button>
          <Button
            variant={"ghost"}
            onClick={() => setSelectedStatus(JobStatus.Registered)}
          >
            ②登録済
          </Button>
          <Button
            variant={"ghost"}
            onClick={() => setSelectedStatus(JobStatus.Open)}
          >
            ③公募中
          </Button>
          <Button
            variant={"ghost"}
            onClick={() => setSelectedStatus(undefined)}
          >
            ④発注
          </Button>
          <Button
            variant={"ghost"}
            onClick={() => setSelectedStatus(JobStatus.TempPayment)}
          >
            ⑤仮払
          </Button>
          <Button
            variant={"ghost"}
            onClick={() => setSelectedStatus(JobStatus.WaitingForCompletion)}
          >
            ⑥仕事完了連絡待ち
          </Button>
          <Button
            variant={"ghost"}
            onClick={() => setSelectedStatus(JobStatus.OrdererEvaluation)}
          >
            ⑦発注者評価
          </Button>
          <Button
            variant={"ghost"}
            onClick={() => setSelectedStatus(JobStatus.ContractorEvaluation)}
          >
            ⑧受注者評価
          </Button>
          <Button
            variant={"ghost"}
            onClick={() => setSelectedStatus(JobStatus.Completed)}
          >
            ⑨完了
          </Button>
        </Flex>
        <AdminJobTable
          jobs={jobs}
          fetching={fetching}
          openJobHandler={undefined}
          getOwnerJobs={getJobs}
          isAdmin={true}
        />
      </Box>
    </AdminLayout>
  );
};

export default Dashboard;
