import router from "next/router";
import React from "react";
import FormJob from "../../../../components/Forms/FormJob";
import MainLayout from "../../../../components/Layout/MainLayout";
import {
  useOwnerJobsQuery,
  useOwnerSolarPowerPlantsQuery,
  useCreateJobMutation,
} from "../../../../generated/graphql";

interface addProps {}

const AddJob: React.FC<addProps> = ({}) => {
  const [, getOnwerJobs] = useOwnerJobsQuery();
  const [{ data: ownerPowerPlants }] = useOwnerSolarPowerPlantsQuery();
  const [, createJob] = useCreateJobMutation();

  const initialFormValues = {
    title: "",
    category: { label: "", value: "" },
    shortDescription: "",
    longDescription: "",
    location: "",
    solarPowerPlantId: { label: "", value: "" },
    budget: 0,
    applicationDeadline: "",
    startDate: "",
    endDate: "",
    status: "DRAFT",
    jobImage1: null,
    jobImage2: null,
    jobImage3: null,
    jobImage4: null,
  };

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
    console.log(values);
    const response = await createJob({
      input: {
        ...values,
        category: values.category.value,
        solarPowerPlantId: parseInt(values.solarPowerPlantId.value),
      },
    });
    getOnwerJobs({ requestPolicy: "network-only" });
    router.push("/user/owner/job");
  };

  return (
    <MainLayout showSidebar>
      <FormJob
        initialFormValues={initialFormValues}
        submitHandler={submitHandler}
        powerPlantOptions={powerPlantOptions}
      />
    </MainLayout>
  );
};

export default AddJob;
