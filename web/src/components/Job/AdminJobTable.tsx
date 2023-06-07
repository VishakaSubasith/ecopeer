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
  AllJobsQuery,
  JobStatus,
  useAddApplicantMutation,
  useInitializeTransactionMutationMutation,
  useJobDeleteAdminMutation,
  useMeQuery,
  UserType,
  useStartChatWithApprovedApplicantMutation,
  useUpdateApplicationDeadlineMutation,
} from "../../generated/graphql";
import NextLink from "next/link";

import { formatDate, formatCurrency } from "../../utils/formaters";
import LoadingBars from "../Core/LoadingBars";
import { convertJobStatus } from "../../utils/enumMapper";
import UpdateApplicationDeadlineModal from "./updateApplicationDeadlineModal";
import { useRouter } from "next/router";
import ConfirmationDialog from "../Core/ConfirmationDialog";

interface AdminJobTableProps {
  jobs: AllJobsQuery["allJobs"] | undefined;
  fetching: boolean;
  openJobHandler?: Function;
  isAdmin?: boolean;
  getOwnerJobs?: () => void;
}

const AdminJobTable: React.FC<AdminJobTableProps> = ({
  jobs,
  fetching,
  openJobHandler = undefined,
  isAdmin = false,
  getOwnerJobs,
}) => {
  const router = useRouter();
  const jobRows = jobs ? jobs : [];

  const [{ data, fetching: meFetching }] = useMeQuery();

  const [, addApplicant] = useAddApplicantMutation();
  const [, startChat] = useStartChatWithApprovedApplicantMutation();
  const [, updateDeadline] = useUpdateApplicationDeadlineMutation();
  const [, deleteJob] = useJobDeleteAdminMutation();

  const [isOpenDeleteConfirmation, setIsOpenDeleteConfirmation] =
    useState(false);

  const [isOpen, setIsOpen] = useState(false);
  const [currentJobId, setCurrentJobId] = useState<number | null>(null);
  const [{ data: transactionData }, initializeTransaction] =
    useInitializeTransactionMutationMutation();

  // Handlers
  const addApplicantHandler = async (jobId: number) => {
    await addApplicant({ jobId });
    router.push("/user/maintainer/job");
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

  const paymentHandler = async (jobId: number) => {
    const { data: transactionRes } = await initializeTransaction({
      input: { jobId },
    });

    router.push(
      `/job/payment/${transactionRes?.initializeTransaction.transaction.transactionId}`
    );
  };

  const onCloseDeleteConfirmation = () => {
    setIsOpenDeleteConfirmation(false);
  };
  const onOpenDeleteConfirmation = () => {
    setIsOpenDeleteConfirmation(true);
  };
  const onConfirmDeleteHandler = async () => {
    await deleteJob({ input: { jobId: currentJobId! } });
    setIsOpenDeleteConfirmation(false);
    if (getOwnerJobs) {
      getOwnerJobs();
    }
  };

  const deleteJobHandler = (jobId: number) => {
    onOpenDeleteConfirmation();
    setCurrentJobId(jobId);
  };

  return fetching ? (
    <LoadingBars />
  ) : (
    <>
      <Table variant="simple" bgColor="gray.200">
        <Thead>
          <Tr>
            <Th>No</Th>
            <Th>ステータス</Th>
            <Th>タイトル</Th>
            <Th>Owner Email</Th>
            <Th>Maintainer Email</Th>
            <Th>場所</Th>
            <Th>カテゴリ</Th>
            {/* <Th>メモ</Th> */}
            <Th>応募期限</Th>
            <Th>希望予算</Th>
            <Th>関連My発電所</Th>
            <Th>内容</Th>
          </Tr>
        </Thead>
        <Tbody>
          {jobRows.map((job) => (
            <Tr key={job.id}>
              <Td>{job.id}</Td>
              <Td>{convertJobStatus(job.status)}</Td>
              <Td>{job.title}</Td>
              <Td>{job.solarPowerPlant.solarPowerPlantOwner?.user?.email}</Td>
              <Td>{job.approvedApplicant?.user.email}</Td>
              <Td>{job.location}</Td>
              <Td>{job.category}</Td>
              {/* <Td>{job.shortDescription}</Td> */}
              <Td>{formatDate(job.applicationDeadline)}</Td>
              <Td>{formatCurrency(job.budget)}</Td>
              <Td>
                {job.solarPowerPlant.officialId
                  ? job.solarPowerPlant.officialId
                  : "非公式"}
              </Td>
              <Td>
                <HStack>
                  {meFetching ? (
                    <Spinner />
                  ) : (
                    <>
                      {job.deletedAt ? (
                        <Button size={"sm"}>Deleted</Button>
                      ) : (
                        <>
                          <NextLink passHref href={`/job/${job.id}`}>
                            <Button size={"sm"}>詳細</Button>
                          </NextLink>
                          <Button
                            onClick={() => deleteJobHandler(job.id)}
                            size={"sm"}
                          >
                            削除
                          </Button>
                        </>
                      )}

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
                              公募する
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
                            <>
                              <Button
                                onClick={() => chatHandler(job.id)}
                                size={"sm"}
                              >
                                チャット
                              </Button>
                              <Button
                                onClick={() => paymentHandler(job.id)}
                                size={"sm"}
                              >
                                支払う
                              </Button>
                            </>
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

      <ConfirmationDialog
        isOpen={isOpenDeleteConfirmation}
        onClose={onCloseDeleteConfirmation}
        onConfirmHandler={onConfirmDeleteHandler}
      />
      <UpdateApplicationDeadlineModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        jobId={currentJobId}
        submitReOpenJobHandler={submitReOpenJobHandler}
      />
    </>
  );
};

export default AdminJobTable;
