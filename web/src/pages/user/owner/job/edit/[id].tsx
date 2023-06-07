import { Box, Heading, Text } from "@chakra-ui/react";
import router from "next/router";
import React from "react";
import FormJob from "../../../../../components/Forms/FormJob";
import MainLayout from "../../../../../components/Layout/MainLayout";
import {
  useEditJobMutation,
  useJobQuery,
  useOwnerSolarPowerPlantsQuery,
} from "../../../../../generated/graphql";
import { useGetIntId } from "../../../../../utils/useGetIntId";

interface editJobProps {}

const EditJob: React.FC<editJobProps> = ({}) => {
  const jobId = useGetIntId();
  const [{ data: dataJob }] = useJobQuery({
    variables: { jobId: jobId },
    pause: jobId === -1,
  });

  const [{ data: ownerPowerPlants }] = useOwnerSolarPowerPlantsQuery();
  const [, editJob] = useEditJobMutation();

  const powerPlantOptions = ownerPowerPlants?.ownerSolarPowerPlants
    .solarPowerPlants
    ? ownerPowerPlants?.ownerSolarPowerPlants.solarPowerPlants.map(
        (powerPlant) => {
          return {
            label: powerPlant.officialId as string,
            value: powerPlant.id,
          };
        }
      )
    : [];

  const submitHandler = async (values: any, { setErrors }: any) => {
    const response = await editJob({
      ...values,
      jobId: jobId,
      category: values.category.value,
      solarPowerPlantId: parseInt(values.solarPowerPlantId.value),
    });
    router.push("/user/owner/job");
  };

  let editForm;

  if (dataJob?.job) {
    const initialFormValues = {
      ...dataJob.job,
      status: dataJob.job.status as any,
      applicationDeadline: dataJob.job.applicationDeadline.split("T")[0],
      startDate: dataJob.job.startDate.split("T")[0],
      endDate: dataJob.job.endDate.split("T")[0],
      solarPowerPlantId: {
        label: dataJob.job.solarPowerPlant.officialId as string,
        value: dataJob.job.solarPowerPlant.id,
      },
      category: {
        label: dataJob.job.category,
        value: dataJob.job.category,
      },
    };

    editForm = (
      <FormJob
        initialFormValues={initialFormValues}
        submitHandler={submitHandler}
        powerPlantOptions={powerPlantOptions}
      />
    );
  } else {
    editForm = (
      <Box
        shadow={"lg"}
        px={[10, 30]}
        py={[5, 10]}
        my={[5, 20]}
        rounded={"lg"}
        maxWidth={["xs", "4xl"]}
        mx={"auto"}
      >
        <Heading>仕事を編集する</Heading>
        <Text>Job not found</Text>
      </Box>
    );
  }
  return <MainLayout showSidebar>{editForm}</MainLayout>;
};

export default EditJob;
