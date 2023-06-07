import { Button } from "@chakra-ui/button";
import { Box, Flex, Text } from "@chakra-ui/layout";
import React, { useRef, useState } from "react";
import MainLayout from "../components/Layout/MainLayout";
import {
  JobStatus,
  useJobApplicationsQuery,
  useJobMarkCompletedMutation,
  useUpdateSuggestedPriceMutation,
} from "../generated/graphql";
import NextLink from "next/link";
import InputField from "../components/Core/InputField";
import { Form, Formik } from "formik";
import {
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Spinner,
} from "@chakra-ui/react";

interface approvedJobsProps {}

const ApprovedJobs: React.FC<approvedJobsProps> = ({}) => {
  // State
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef = useRef(null);
  const updatePriceRef = useRef(null);

  // Queries
  const [{ data, fetching }, getJobApplications] = useJobApplicationsQuery({
    requestPolicy: "network-only",
  });

  // Mutations
  const [, jobMarkCompleted] = useJobMarkCompletedMutation();
  const [, updateSuggestedPrice] = useUpdateSuggestedPriceMutation();

  // Handlers
  const completeOnClickHandler = async (jobId: number) => {
    await jobMarkCompleted({ jobId: jobId });
    getJobApplications();
  };

  const updateSuggestedPriceHandler = () => {
    (updatePriceRef.current as any).click();

    setIsOpen(false);
  };

  return (
    <MainLayout showSidebar>
      {fetching && (
        <Flex alignItems={"center"} justifyContent={"center"} h={200}>
          <Spinner size={"xl"} />
        </Flex>
      )}

      {!fetching && !data && (
        <Flex flexDirection={"column"} alignItems={"center"} justifyContent={"center"} h={200}>
          <Text>
            ※発電所オーナーアカウントによるMyビジネス(仕事の受注）機能は利用できません。
          </Text>
          <Text>
            仕事を受注したい場合は、新たなアカウントで業者登録をお願いします。
          </Text>
        </Flex>
      )}
      {data?.jobApplications.jobApplications.map((jobInfo) => (
        <Box
          key={jobInfo.jobApplication.id}
          shadow={"lg"}
          rounded={"lg"}
          m={"4"}
          p={5}
        >
          <Text>{jobInfo.jobApplication.job.title}</Text>
          <Text>{jobInfo.jobApplication.job.startDate}</Text>
          <Text>{jobInfo.jobApplication.job.budget}</Text>
          <Text>{jobInfo.jobApplication.job.category}</Text>
          <Text>{jobInfo.jobApplication.job.location}</Text>
          <Text>{jobInfo.jobApplication.job.longDescription}</Text>
          <Text>{jobInfo.jobApplication.job.endDate}</Text>
          {jobInfo.jobApplication.job.status == JobStatus.Open ? (
            <Formik
              initialValues={{
                suggestedPrice: jobInfo.jobApplication.suggestedPrice,
              }}
              onSubmit={async (values, { setErrors }) => {
                const res = await updateSuggestedPrice({
                  jobId: jobInfo.jobApplication.job.id,
                  suggestedPrice: values.suggestedPrice as any,
                });
                getJobApplications();
              }}
            >
              {({ isSubmitting }) => (
                <Form>
                  <Text>
                  現在の応募価格: {jobInfo.jobApplication.suggestedPrice}
                  </Text>
                  <InputField
                    type="number"
                    name={"suggestedPrice"}
                    label="新しい価格で応募する(単位：円）"
                  />
                  <Button
                    disabled={isSubmitting}
                    onClick={() => setIsOpen(true)}
                  >
                    提示価格を更新する
                  </Button>
                  <Button
                    ref={updatePriceRef}
                    type={"submit"}
                    display={"none"}
                  ></Button>
                  {/* Pop up to confirm */}
                  <AlertDialog
                    isOpen={isOpen}
                    leastDestructiveRef={cancelRef}
                    onClose={onClose}
                  >
                    <AlertDialogOverlay>
                      <AlertDialogContent>
                        <AlertDialogHeader fontSize="lg" fontWeight="bold">
                          提示価格の更新
                        </AlertDialogHeader>

                        <AlertDialogBody>
                          希望提示価格を更新しますか
                        </AlertDialogBody>

                        <AlertDialogFooter>
                          <Button
                            colorScheme="red"
                            ref={cancelRef}
                            onClick={onClose}
                          >
                            キャンセル
                          </Button>
                          <Button
                            colorScheme="green"
                            onClick={updateSuggestedPriceHandler}
                            ml={3}
                          >
                            実行する
                          </Button>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialogOverlay>
                  </AlertDialog>
                </Form>
              )}
            </Formik>
          ) : null}

          {jobInfo.jobApplication.job.status ==
          JobStatus.WaitingForCompletion ? (
            <Button
              onClick={() =>
                completeOnClickHandler(jobInfo.jobApplication.job.id)
              }
            >
              仕事の完了を報告する
            </Button>
          ) : null}
          {jobInfo.jobApplication.job.status === JobStatus.OrdererEvaluation ? (
            <Button disabled colorScheme={"gray"}>
              {"仕事の完了を報告しました"}
            </Button>
          ) : null}
          {jobInfo.jobApplication.job.status ===
          JobStatus.ContractorEvaluation ? (
            <NextLink
              href={`/user/maintainer/job/${jobInfo.jobApplication.job.id}/evaluation`}
            >
              <Button size={"sm"}>発電所を評価する</Button>
            </NextLink>
          ) : null}
          {jobInfo.jobApplication.job.status === JobStatus.Completed ? (
            <Button disabled colorScheme={"gray"}>
              {"作業完了"}
            </Button>
          ) : null}
        </Box>
      ))}
    </MainLayout>
  );
};

export default ApprovedJobs;
