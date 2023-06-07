import { Box, Button, Flex, Text } from "@chakra-ui/react";
import React from "react";
import {
  useMeQuery,
  useOpenJobsQuery,
  UserType,
} from "../../generated/graphql";
import NextLink from "next/link";
import Image from "next/image";
import JobTableTopPage from "./JobsTableTopPage";

interface JobsTableWrapperProps {}

const JobsTableWrapper: React.FC<JobsTableWrapperProps> = ({}) => {
  const [{ data: dataUser }] = useMeQuery();

  const [{ data, fetching }] = useOpenJobsQuery({
    requestPolicy: "network-only",
  });
  return (
    <Box mt={10} mb={10} overflow={["scroll", "auto"]}>
      <Image
        src={"/images/sections/find_job1.png"}
        height={100}
        width={1500}
        alt={"section 2"}
      />
      {dataUser?.me?.userType === UserType.Maintainer ? (
        <Text color={"red.600"}>
          「仕事に応募する」ボタンを押した後、必要に応じ応募価格をすぐに変更してください。
        </Text>
      ) : null}
      <JobTableTopPage jobs={data?.openJobs as any} fetching={fetching} />
      <Flex justifyContent={"flex-end"}>
        <NextLink href={"/job"}>
          <Button mt={10}>さらに見る</Button>
        </NextLink>
      </Flex>
    </Box>
  );
};

export default JobsTableWrapper;
