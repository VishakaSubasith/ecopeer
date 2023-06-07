import {
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Spinner,
  Button,
} from "@chakra-ui/react";
import AdminLayout from "../../components/Layout/AdminLayout";
import NextLink from "next/link";
import { usePaymentTransactionsQuery } from "../../generated/graphql";
import { convertTransactionStatus } from "../../utils/enumMapper";

interface transactionsProps {}

const Transactions: React.FC<transactionsProps> = ({}) => {
  const [{ data, fetching }] = usePaymentTransactionsQuery();
  return (
    <AdminLayout>
      {fetching ? (
        <Spinner size={"lg"} />
      ) : (
        <Table variant="simple" colorScheme={"gray"}>
          <Thead bgColor={"gray.100"}>
            <Tr>
              <Th>Transaction ID</Th>
              <Th>Job ID</Th>
              <Th>Owner Email</Th>
              <Th>Maintainer Email</Th>
              <Th>Amount</Th>
              <Th>Status</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data?.paymentTransactions.map((transaction) => (
              <Tr key={transaction.id}>
                <Td>{transaction.transactionId}</Td>
                <Td>{transaction.job.id}</Td>
                <Td>{transaction.user.email}</Td>
                <Td>{transaction.job.approvedApplicant?.user.email}</Td>
                <Td>{transaction.amount}</Td>
                <Td>{convertTransactionStatus(transaction.status)}</Td>
                <Td>
                  <NextLink href={`/admin/job/${transaction.job.id}`}>
                    <Button size={"sm"}>状況詳細</Button>
                  </NextLink>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}
    </AdminLayout>
  );
};

export default Transactions;
