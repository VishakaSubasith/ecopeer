import { Box, Heading, Text } from "@chakra-ui/react";
import React from "react";
import AdminLayout from "../../../components/Layout/AdminLayout";
import { useJobQuery } from "../../../generated/graphql";
import { useGetIntId } from "../../../utils/useGetIntId";

interface adminJobProps {}

const AdminJob: React.FC<adminJobProps> = ({}) => {
  const jobId = useGetIntId();
  const [{ data }] = useJobQuery({ variables: { jobId } });
  return (
    <AdminLayout>
      <Box>
        <Heading>Job details</Heading>
        <Text>{data?.job.title}</Text>
        <Text>{data?.job.shortDescription}</Text>
        <Text>{data?.job.longDescription}</Text>
        <Text>{data?.job.budget}</Text>
        <Text>{data?.job.applicationDeadline}</Text>
        <Text>{data?.job.status}</Text>
      </Box>
      {/* <Box>
        <Heading>Chosen Applicant</Heading>
        <Text>Todo</Text>
        <Heading>List of all Applicants</Heading>
        <Text>Todo</Text>
      </Box> */}
    </AdminLayout>
  );
};

export default AdminJob;
