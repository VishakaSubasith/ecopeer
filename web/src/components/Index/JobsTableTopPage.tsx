import {
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Button,
  HStack,
  Td,
  Spinner,
} from "@chakra-ui/react";
import React, { useState } from "react";
import {
  Job,
  JobStatus,
  useAddApplicantMutation,
  useMeQuery,
  UserType,
  useStartChatWithApprovedApplicantMutation,
  useUpdateApplicationDeadlineMutation,
} from "../../generated/graphql";
import NextLink from "next/link";

import { formatDate, formatCurrency } from "../../utils/formaters";
import router from "next/router";
import LoadingBars from "../Core/LoadingBars";
import { convertJobStatus } from "../../utils/enumMapper";
import UpdateApplicationDeadlineModal from "../Job/updateApplicationDeadlineModal";

interface JobTableTopPageProps {
  jobs:
    | ({
        __typename?: "Job" | undefined;
      } & Pick<
        Job,
        | "id"
        | "status"
        | "title"
        | "location"
        | "category"
        | "shortDescription"
        | "startDate"
        | "applicationDeadline"
        | "budget"
        | "solarPowerPlant"
      >)[]
    | undefined;
  fetching: boolean;
  openJobHandler?: Function;
  isAdmin?: boolean;
  getOwnerJobs?: () => void;
}

const JobTableTopPage: React.FC<JobTableTopPageProps> = ({
  jobs,
  fetching,
  openJobHandler = undefined,
  isAdmin = false,
  getOwnerJobs,
}) => {
  const jobRows = jobs ? jobs : [];

  const [{ data, fetching: meFetching }] = useMeQuery();

  const [, addApplicant] = useAddApplicantMutation();
  const [, startChat] = useStartChatWithApprovedApplicantMutation();
  const [, updateDeadline] = useUpdateApplicationDeadlineMutation();

  const [isOpen, setIsOpen] = useState(false);
  const [currentJobId, setCurrentJobId] = useState<number | null>(null);
  // Handlers
  const addApplicantHandler = async (jobId: number) => {
    await addApplicant({ jobId });
    router.push(`/user/maintainer/job?appliedJobId=${jobId}`);
  };

  const chatHandler = async (jobId: number) => {
    const res = await startChat({ input: { jobId } });
    const channelId = res.data?.startChatWithApprovedApplicant.id;
    router.push({ pathname: "/chat", query: { channelId } });
  };

  const reOpenJobOnClickHandler = (jobId: number) => {
    setCurrentJobId(jobId);
    setIsOpen(true);
  };

  const submitReOpenJobHandler = async (
    jobId: number,
    applicationDeadline: string,
    startDate: string,
    endDate: string
  ) => {
    await updateDeadline({
      input: { jobId, applicationDeadline, startDate, endDate },
    });
    setIsOpen(false);
    if (getOwnerJobs) {
      getOwnerJobs();
    }
  };

  return fetching ? (
    <LoadingBars />
  ) : (
    <>
      <Table variant="simple" bgColor="gray.200">
        <Thead>
          <Tr>
            <Th>No</Th>
            <Th>タイトル</Th>
            <Th>場所</Th>
            <Th>応募期限</Th>
            <Th>希望予算</Th>
            <Th>内容</Th>
          </Tr>
        </Thead>
        <Tbody>
          {jobRows.map((job) => (
            <Tr key={job.id}>
              <Td>{job.id}</Td>
              <Td>{job.title}</Td>
              <Td>{job.location}</Td>
              <Td>{formatDate(job.applicationDeadline)}</Td>
              <Td>{formatCurrency(job.budget)}</Td>
              <Td>
                <HStack>
                  {meFetching ? (
                    <Spinner />
                  ) : (
                    <>
                      <NextLink passHref href={`/job/${job.id}`}>
                        <Button size={"sm"}>詳細</Button>
                      </NextLink>
                      <NextLink
                        passHref
                        href={`/region/${job.solarPowerPlant.region.id}?jobId=${job.id}`}
                      >
                        <Button size={"sm"}>マップ</Button>
                      </NextLink>
                      {openJobHandler ? (
                        <>
                          {/* <Button size={"sm"}>詳細</Button>
                        <Button size={"sm"}>編集</Button> */}
                          {job.status === JobStatus.Draft && (
                            <>
                              <NextLink
                                passHref
                                href={`/user/owner/job/edit/${job.id}`}
                              >
                                <Button size={"sm"}>編集する</Button>
                              </NextLink>
                              {/* <Button size={"sm"}>Save draft</Button> */}
                            </>
                          )}
                          {job.status === JobStatus.Registered &&
                          openJobHandler ? (
                            <Button
                              size={"sm"}
                              onClick={() => openJobHandler(job.id)}
                            >
                              公開する
                            </Button>
                          ) : (
                            ""
                          )}
                          {job.status === JobStatus.Open && !isAdmin ? (
                            <NextLink
                              passHref
                              href={`/user/owner/job/${job.id}/applicants`}
                            >
                              <Button size={"sm"}>応募者を表示</Button>
                            </NextLink>
                          ) : (
                            ""
                          )}
                          {job.status === JobStatus.TempPayment && !isAdmin ? (
                            <Button
                              onClick={() => chatHandler(job.id)}
                              size={"sm"}
                            >
                              チャット
                            </Button>
                          ) : null}
                          {job.status === JobStatus.WaitingForCompletion &&
                          !isAdmin ? (
                            <Button
                              onClick={() => chatHandler(job.id)}
                              size={"sm"}
                            >
                              チャット
                            </Button>
                          ) : null}
                          {job.status === JobStatus.OrdererEvaluation &&
                          !isAdmin ? (
                            <>
                              <NextLink
                                passHref
                                href={`/user/owner/job/${job.id}/evaluation`}
                              >
                                <Button size={"sm"}>評価する</Button>
                              </NextLink>
                              <Button
                                onClick={() => chatHandler(job.id)}
                                size={"sm"}
                              >
                                チャット
                              </Button>
                            </>
                          ) : null}
                          {job.status === JobStatus.ContractorEvaluation &&
                          !isAdmin ? (
                            <Button
                              onClick={() => chatHandler(job.id)}
                              size={"sm"}
                            >
                              チャット
                            </Button>
                          ) : null}
                          {job.status === JobStatus.Completed && !isAdmin ? (
                            <Button
                              onClick={() => chatHandler(job.id)}
                              size={"sm"}
                            >
                              チャット
                            </Button>
                          ) : null}

                          {job.status === JobStatus.Expired && !isAdmin && (
                            <Button
                              onClick={() => reOpenJobOnClickHandler(job.id)}
                              size={"sm"}
                            >
                              再公募
                            </Button>
                          )}
                        </>
                      ) : data?.me?.id !==
                          job.solarPowerPlant?.solarPowerPlantOwner?.user?.id &&
                        (data?.me?.userType === UserType.Maintainer ||
                          data?.me?.userType === UserType.OwnerMaintainer) ? (
                        <Button
                          size={"sm"}
                          onClick={() => addApplicantHandler(job.id)}
                        >
                          仕事に応募する
                        </Button>
                      ) : (
                        ""
                      )}
                    </>
                  )}
                </HStack>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      <UpdateApplicationDeadlineModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        jobId={currentJobId}
        submitReOpenJobHandler={submitReOpenJobHandler}
      />
    </>
  );
};

export default JobTableTopPage;
