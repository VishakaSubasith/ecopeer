import { Box, Heading, HStack, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import JobTable from "../../components/Job/JobsTable";
import MainLayout from "../../components/Layout/MainLayout";
import {
  useMeQuery,
  useOpenJobsQuery,
  UserType,
} from "../../generated/graphql";

interface indexProps {}

const Index: React.FC<indexProps> = ({}) => {
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
      router.push("/job");
    }
  }, [queryJobId, router, show]);

  const [{ data: dataUser }] = useMeQuery();
  const [{ data, fetching }] = useOpenJobsQuery({
    requestPolicy: "network-only",
  });
  return (
    <MainLayout>
      <Box mt={10} mb={10} overflow={["scroll", "auto"]}>
        <HStack>
          <Heading>公募中の仕事一覧</Heading>
          {dataUser?.me?.userType === UserType.Maintainer ? (
            <Text color={"red.600"}>
              「仕事に応募する」ボタンを押した後、必要に応じ応募価格をすぐに変更してください。
            </Text>
          ) : null}
        </HStack>
        <JobTable
          jobs={data?.openJobs as any}
          fetching={fetching}
          highlightRowId={queryJobId}
        />
      </Box>
    </MainLayout>
  );
};

export default Index;
