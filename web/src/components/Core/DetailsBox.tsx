import {
    AlertDialog,
    AlertDialogOverlay,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogBody,
    AlertDialogFooter,
    Button,
    Checkbox
} from "@chakra-ui/react";
import React, {useRef, useState} from "react";
import {useUserRatingsQuery} from "../../generated/graphql";

interface DetailsBoxProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirmHandler: () => void;
    userId: number | null;
}

const DetailsBox: React.FC<DetailsBoxProps> = ({
                                                                   isOpen,
                                                                   onClose,
                                                                   onConfirmHandler,
                                                                    userId
                                                               }) => {
    const cancelRef = useRef(null);
    const [deleteCheckBox, setDeleteCheckBox] = useState(false);

    // @ts-ignore
    const [{ data, fetching }] = useUserRatingsQuery({variables: { input: { userId } }, pause: userId < 0,});

    console.log("datadata===>>",data)

    return (
        <AlertDialog
            isOpen={isOpen}
            leastDestructiveRef={cancelRef}
            onClose={onClose}
        >
            <AlertDialogOverlay>
                <AlertDialogContent>
                    <AlertDialogHeader fontSize="lg" fontWeight="bold">
                        Delete Job
                    </AlertDialogHeader>

                    <AlertDialogBody>
                        Are you sure? You can&apos;t undo this action afterwards.

                        <Checkbox id="deleteJob" onChange={()=>setDeleteCheckBox(!deleteCheckBox)}>Do you want to delete this Item ?</Checkbox>
                    </AlertDialogBody>

                    <AlertDialogFooter>
                        <Button ref={cancelRef} onClick={onClose}>
                            Cancel
                        </Button>
                        {/*<Button disabled={!deleteCheckBox} colorScheme="red" onClick={onConfirmHandler} ml={3}>*/}
                        {/*    Delete*/}
                        {/*</Button>*/}
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialogOverlay>
        </AlertDialog>
    );
};

export default DetailsBox;
