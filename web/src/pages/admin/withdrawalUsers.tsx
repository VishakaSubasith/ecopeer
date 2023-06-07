import {
    Button,
    Table,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
    Spinner,
    HStack,
} from "@chakra-ui/react";
import React, {useState} from "react";
import AdminLayout from "../../components/Layout/AdminLayout";
import {
    useDeleteUserMutation,
    useForceDeleteUserMutation,
    UserType,
    useUsersQuery,
} from "../../generated/graphql";
import { useAdminAuth } from "../../utils/useAdminAuth";
import ConfirmationDialog from "../../components/Core/ConfirmationDialog";

interface usersProps {}

const WithdrawalUsers: React.FC<usersProps> = ({}) => {
    useAdminAuth();
    let [{ data, fetching }, getUsers] = useUsersQuery({
        requestPolicy: "network-only",
        variables: { input: { pagination: { limit: 50 } } },
    });

    // @ts-ignore
    let withdrawalUsers = data?.users?.filter((user) => user.withdrawal === "yes")

    withdrawalUsers = withdrawalUsers? withdrawalUsers:[];

    console.log("data====>>>>",data)
    const [, deleteUser] = useDeleteUserMutation();
    const [, forceDelete] = useForceDeleteUserMutation();
    const [currentUserId, setCurrentUserId] = useState<number | null>(null);
    const deleteUserHandler = async (userId: number) => {
        await deleteUser({ userId: userId });
        // getUsers();
    };
    const [isOpenDeleteConfirmation, setIsOpenDeleteConfirmation] =
        useState(false);

    const onOpenDeleteConfirmation = () => {
        setIsOpenDeleteConfirmation(true);
    };
    const onCloseDeleteConfirmation = () => {
        setIsOpenDeleteConfirmation(false);
    };


    const forceDeleteHandler = async () => {
        // onOpenDeleteConfirmation();
        // @ts-ignore
        // await deleteUserHandler(currentUserId);
        // @ts-ignore
        await forceDelete({ input: { userId:currentUserId } });
        setIsOpenDeleteConfirmation(false);
        getUsers();
    };
    const deleteUsrHandler = async (userId: number | null) => {
        onOpenDeleteConfirmation();
        setCurrentUserId(userId);

    };


    return (
        <AdminLayout>
            {fetching ? (
                <Spinner />
            ) : (
                <Table variant="simple" bgColor="gray.200">
                    <Thead>
                        <Tr>
                            <Th>User ID</Th>
                            <Th>Email</Th>
                            <Th>User Type</Th>
                            <Th>Name</Th>
                            <Th>Actions</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {withdrawalUsers.map((user) => (
                            <Tr key={user.id}>
                                <Td>{user.id}</Td>
                                <Td>{user.email}</Td>
                                <Td>{user.userType}</Td>
                                {user.solarPowerPlantMaintainer ? (
                                    <Td>{user.solarPowerPlantMaintainer.name}</Td>
                                ) : (
                                    <Td>{user.solarPowerPlantOwner?.nickname}</Td>
                                )}
                                <Td>
                                    {!(user.userType === UserType.Admin) ? (
                                        <HStack>
                                            {/*<Button onClick={() => deleteUserHandler(user.id)}>*/}
                                            {/*  Delete*/}
                                            {/*</Button>*/}
                                            <Button
                                                colorScheme={"red"}
                                                onClick={() => deleteUsrHandler(user.id)}
                                            >
                                                Force Delete
                                            </Button>
                                        </HStack>
                                    ) : null}
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            )}

            <ConfirmationDialog
                isOpen={isOpenDeleteConfirmation}
                onClose={onCloseDeleteConfirmation}
                onConfirmHandler={forceDeleteHandler}
            />
        </AdminLayout>
    );
};

export default WithdrawalUsers;
