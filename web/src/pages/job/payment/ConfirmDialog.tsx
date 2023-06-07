import {
  Button,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Text,
  Checkbox,
  HStack,
} from "@chakra-ui/react";
import React, { useRef, useState } from "react";

interface ConfirmDialogProps {
  onConfirmHandler: Function;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({ onConfirmHandler }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAccepted, setIsAccepted] = useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef = useRef(null);

  const proceedOnClickHandler = () => {
    onConfirmHandler();
    onClose();
  };
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>支払う</Button>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              最終確認画面
            </AlertDialogHeader>

            <AlertDialogBody>
              <Text color={"red.600"}>支払いを続けますか？</Text>
              <HStack>
                <Checkbox
                  checked={isAccepted}
                  onChange={(e) => setIsAccepted(e.target.checked)}
                />
                <Text color={"red.600"}>支払後のキャンセルはできません。</Text>
              </HStack>
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                キャンセル
              </Button>
              <Button
                colorScheme="green"
                onClick={proceedOnClickHandler}
                ml={3}
                isDisabled={!isAccepted}
              >
                続ける
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default ConfirmDialog;
